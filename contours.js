(function generateContours() {
  'use strict';

  const svg = document.querySelector('.contour-svg');
  const layer = document.getElementById('contourLines');
  if (!svg || !layer) return;

  const WIDTH = 1440;
  const HEIGHT = 900;
  const COLS = 140;
  const ROWS = 88;
  const INDEX_EVERY = 5;
  const LEVEL_COUNT = 38;
  const MIN_PATH_LEN = 28;

  // Composite terrain: hills, ridge, valley, layered noise
  function height(nx, ny) {
    let h = 0;

    const hills = [
      { x: 0.74, y: 0.26, a: 1.05, sx: 0.095, sy: 0.072, r: -0.4 },
      { x: 0.24, y: 0.71, a: 0.88, sx: 0.12, sy: 0.085, r: 0.25 },
      { x: 0.50, y: 0.48, a: 0.62, sx: 0.2, sy: 0.15, r: 0.1 },
      { x: 0.88, y: 0.68, a: 0.38, sx: 0.075, sy: 0.06, r: -0.2 },
      { x: 0.14, y: 0.38, a: 0.42, sx: 0.085, sy: 0.1, r: 0.35 }
    ];

    hills.forEach(({ x, y, a, sx, sy, r }) => {
      const dx = nx - x;
      const dy = ny - y;
      const cos = Math.cos(r);
      const sin = Math.sin(r);
      const rx = (dx * cos - dy * sin) / sx;
      const ry = (dx * sin + dy * cos) / sy;
      h += a * Math.exp(-(rx * rx + ry * ry));
    });

    // Ridge between hills
    h += 0.22 * Math.exp(-Math.pow((nx - ny * 0.85 - 0.08) * 5.2, 2));

    // Valley / saddle
    h -= 0.18 * Math.exp(-((nx - 0.42) ** 2 + (ny - 0.44) ** 2) / 0.028);
    h -= 0.1 * Math.exp(-((nx - 0.62) ** 2 + (ny - 0.58) ** 2) / 0.018);

    // Irregular micro-relief
    h += 0.055 * Math.sin(nx * 31.7 + ny * 17.3) * Math.cos(ny * 26.1 - nx * 14.8);
    h += 0.038 * Math.sin(nx * 58 + 1.2) * Math.sin(ny * 51 + 0.7);
    h += 0.025 * Math.cos(nx * 89 - ny * 73);

    return h;
  }

  // Build height grid
  const grid = [];
  let minH = Infinity;
  let maxH = -Infinity;

  for (let j = 0; j <= ROWS; j++) {
    grid[j] = [];
    for (let i = 0; i <= COLS; i++) {
      const nx = i / COLS;
      const ny = j / ROWS;
      const v = height(nx, ny);
      grid[j][i] = v;
      if (v < minH) minH = v;
      if (v > maxH) maxH = v;
    }
  }

  const pad = (maxH - minH) * 0.02;
  minH += pad;
  maxH -= pad;
  const levels = [];
  for (let i = 0; i <= LEVEL_COUNT; i++) {
    levels.push(minH + ((maxH - minH) * i) / LEVEL_COUNT);
  }

  function toSvgX(i) { return (i / COLS) * WIDTH; }
  function toSvgY(j) { return (j / ROWS) * HEIGHT; }

  function lerp(a, b, t) { return a + (b - a) * t; }

  function edgePoint(v0, v1, threshold, x0, y0, x1, y1) {
    if (Math.abs(v1 - v0) < 1e-10) return [x0, y0];
    const t = (threshold - v0) / (v1 - v0);
    return [lerp(x0, x1, t), lerp(y0, y1, t)];
  }

  // Marching squares segment extraction
  const MS = [
    [], [[3, 0]], [[0, 1]], [[3, 1]], [[1, 2]], [[3, 0], [1, 2]], [[0, 2]], [[3, 2]],
    [[2, 3]], [[0, 3]], [[0, 1], [2, 3]], [[1, 3]], [[1, 0], [2, 3]], [[2, 0]], [[2, 1]], []
  ];

  // edges: 0=bottom, 1=right, 2=top, 3=left
  function cellEdges(i, j, threshold) {
    const v00 = grid[j][i];
    const v10 = grid[j][i + 1];
    const v11 = grid[j + 1][i + 1];
    const v01 = grid[j + 1][i];

    let idx = 0;
    if (v00 >= threshold) idx |= 1;
    if (v10 >= threshold) idx |= 2;
    if (v11 >= threshold) idx |= 4;
    if (v01 >= threshold) idx |= 8;

    // Resolve saddle ambiguity (cases 5 and 10)
    if (idx === 5 || idx === 10) {
      const center = (v00 + v10 + v11 + v01) / 4;
      if (idx === 5 && center < threshold) idx = 10;
      if (idx === 10 && center < threshold) idx = 5;
    }

    const x0 = toSvgX(i);
    const x1 = toSvgX(i + 1);
    const y0 = toSvgY(j);
    const y1 = toSvgY(j + 1);

    const pts = [
      edgePoint(v00, v10, threshold, x0, y0, x1, y0), // 0 bottom
      edgePoint(v10, v11, threshold, x1, y0, x1, y1), // 1 right
      edgePoint(v01, v11, threshold, x0, y1, x1, y1), // 2 top
      edgePoint(v00, v01, threshold, x0, y0, x0, y1)  // 3 left
    ];

    const segs = MS[idx];
    const result = [];
    for (const [a, b] of segs) {
      result.push([pts[a], pts[b]]);
    }
    return result;
  }

  function keyPoint(p) {
    return `${p[0].toFixed(2)},${p[1].toFixed(2)}`;
  }

  function stitchSegments(segments) {
    const adj = new Map();

    segments.forEach(([a, b]) => {
      const ka = keyPoint(a);
      const kb = keyPoint(b);
      if (!adj.has(ka)) adj.set(ka, { pt: a, next: [] });
      if (!adj.has(kb)) adj.set(kb, { pt: b, next: [] });
      adj.get(ka).next.push(kb);
      adj.get(kb).next.push(ka);
    });

    const used = new Set();
    const paths = [];

    adj.forEach((node, startKey) => {
      if (node.next.length === 0) return;

      for (const nb of node.next) {
        const edgeKey = [startKey, nb].sort().join('|');
        if (used.has(edgeKey)) continue;

        const path = [node.pt];
        let prev = startKey;
        let curr = nb;

        while (true) {
          used.add([prev, curr].sort().join('|'));
          path.push(adj.get(curr).pt);

          const neighbors = adj.get(curr).next.filter(k => k !== prev);
          if (neighbors.length === 0) break;

          let next = neighbors[0];
          for (const n of neighbors) {
            const ek = [curr, n].sort().join('|');
            if (!used.has(ek)) { next = n; break; }
          }

          const ek2 = [curr, next].sort().join('|');
          if (used.has(ek2)) break;

          prev = curr;
          curr = next;

          if (curr === startKey && path.length > 2) break;
          if (path.length > 800) break;
        }

        if (path.length >= 3) paths.push(path);
      }
    });

    return paths;
  }

  // Chaikin smoothing for natural curves
  function chaikin(points, iterations) {
    let pts = points;
    for (let n = 0; n < iterations; n++) {
      const next = [pts[0]];
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i];
        const p1 = pts[i + 1];
        next.push(
          [0.75 * p0[0] + 0.25 * p1[0], 0.75 * p0[1] + 0.25 * p1[1]],
          [0.25 * p0[0] + 0.75 * p1[0], 0.25 * p0[1] + 0.75 * p1[1]]
        );
      }
      next.push(pts[pts.length - 1]);
      pts = next;
    }
    return pts;
  }

  function pathLength(points) {
    let len = 0;
    for (let i = 1; i < points.length; i++) {
      const dx = points[i][0] - points[i - 1][0];
      const dy = points[i][1] - points[i - 1][1];
      len += Math.hypot(dx, dy);
    }
    return len;
  }

  function pathToD(points) {
    if (points.length < 3) return '';
    if (pathLength(points) < MIN_PATH_LEN) return '';

    const s = chaikin(points, 2);
    let d = `M ${s[0][0].toFixed(1)} ${s[0][1].toFixed(1)}`;

    for (let i = 1; i < s.length - 1; i++) {
      const mx = (s[i][0] + s[i + 1][0]) / 2;
      const my = (s[i][1] + s[i + 1][1]) / 2;
      d += ` Q ${s[i][0].toFixed(1)} ${s[i][1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
    }

    const last = s[s.length - 1];
    d += ` L ${last[0].toFixed(1)} ${last[1].toFixed(1)}`;
    return d;
  }

  function render() {
    layer.replaceChildren();

    levels.forEach((level, levelIndex) => {
      const segments = [];
      for (let j = 0; j < ROWS; j++) {
        for (let i = 0; i < COLS; i++) {
          segments.push(...cellEdges(i, j, level));
        }
      }

      const paths = stitchSegments(segments);
      const isIndex = levelIndex % INDEX_EVERY === 0;

      paths.forEach((pts) => {
        const d = pathToD(pts);
        if (d.length < 10) return;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        path.setAttribute('class', `contour ${isIndex ? 'contour-index' : 'contour-minor'}`);
        path.setAttribute('fill', 'none');
        layer.appendChild(path);
      });
    });
  }

  render();
})();
