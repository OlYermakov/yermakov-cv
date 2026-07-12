(function initHero3D() {
  'use strict';

  const THREE = window.THREE;
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || !THREE) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0b1220, 0.018);

  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
  camera.position.set(0, 14, 22);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !isMobile,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
  renderer.setClearColor(0x000000, 0);

  const ambient = new THREE.AmbientLight(0x1e293b, 0.6);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xcbd5e1, 1.2);
  keyLight.position.set(10, 20, 10);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xf97316, 0.35);
  fillLight.position.set(-8, 6, -6);
  scene.add(fillLight);

  function getTerrainHeight(x, z) {
    const d = Math.sqrt(x * x + z * z);
    return (
      Math.sin(x * 0.22) * 1.4 +
      Math.cos(z * 0.18) * 1.1 +
      Math.sin((x + z) * 0.12) * 0.8 +
      Math.exp(-d * 0.06) * 2.5 -
      d * 0.04
    );
  }

  const terrainSize = 48;
  const segments = isMobile ? 48 : 80;
  const terrainGeo = new THREE.PlaneGeometry(terrainSize, terrainSize, segments, segments);
  terrainGeo.rotateX(-Math.PI / 2);

  const positions = terrainGeo.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const z = positions.getZ(i);
    positions.setY(i, getTerrainHeight(x, z));
  }
  terrainGeo.computeVertexNormals();

  const terrain = new THREE.Mesh(
    terrainGeo,
    new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
      emissive: 0x162236,
      emissiveIntensity: 0.4
    })
  );
  scene.add(terrain);

  const contour = new THREE.Mesh(
    terrainGeo.clone(),
    new THREE.MeshBasicMaterial({
      color: 0x475569,
      wireframe: true,
      transparent: true,
      opacity: 0.14
    })
  );
  contour.position.y = 0.05;
  contour.scale.set(1.002, 1, 1.002);
  scene.add(contour);

  const grid = new THREE.GridHelper(terrainSize, 24, 0x475569, 0x1e293b);
  grid.material.opacity = 0.25;
  grid.material.transparent = true;
  grid.position.y = -0.3;
  scene.add(grid);

  const axesGroup = new THREE.Group();
  const axisLen = 8;
  const makeAxis = (dir, color) => {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      dir.clone().multiplyScalar(axisLen)
    ]);
    return new THREE.Line(geo, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.7 }));
  };
  axesGroup.add(makeAxis(new THREE.Vector3(axisLen, 0, 0), 0xf97316));
  axesGroup.add(makeAxis(new THREE.Vector3(0, axisLen * 0.6, 0), 0x94a3b8));
  axesGroup.add(makeAxis(new THREE.Vector3(0, 0, -axisLen), 0x64748b));
  axesGroup.position.set(-14, 0.5, -10);
  scene.add(axesGroup);

  const surveyPoints = [
    [-8, -6], [4, -8], [10, 2], [-3, 8],
    [6, 5], [-12, 4], [14, -4]
  ];

  const pointsGroup = new THREE.Group();
  surveyPoints.forEach(([x, z], i) => {
    const h = getTerrainHeight(x, z);
    const stakeGroup = new THREE.Group();
    stakeGroup.position.set(x, h, z);

    const stake = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 2.5, 6),
      new THREE.MeshStandardMaterial({
        color: 0xeab308,
        emissive: 0xeab308,
        emissiveIntensity: 0.3,
        metalness: 0.6,
        roughness: 0.4
      })
    );
    stake.position.y = 1.25;
    stakeGroup.add(stake);

    const prism = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.25, 0),
      new THREE.MeshStandardMaterial({
        color: 0xf97316,
        emissive: 0xf97316,
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2
      })
    );
    prism.position.y = 2.6;
    stakeGroup.add(prism);

    const glow = new THREE.Mesh(
      new THREE.RingGeometry(0.3, 0.55, 32),
      new THREE.MeshBasicMaterial({
        color: 0xf97316,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide
      })
    );
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = 0.05;
    stakeGroup.add(glow);

    stakeGroup.userData.phase = i * 1.2;
    pointsGroup.add(stakeGroup);
  });
  scene.add(pointsGroup);

  const orbitGroup = new THREE.Group();
  const orbit = new THREE.Mesh(
    new THREE.TorusGeometry(16, 0.03, 8, 120),
    new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.35 })
  );
  orbit.rotation.x = Math.PI / 2.8;
  orbitGroup.add(orbit);

  const orbit2 = orbit.clone();
  orbit2.scale.set(0.75, 0.75, 0.75);
  orbit2.rotation.x = Math.PI / 3.5;
  orbit2.rotation.z = Math.PI / 4;
  orbitGroup.add(orbit2);

  for (let i = 0; i < 5; i++) {
    const sat = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.15, 0.3),
      new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        emissive: 0xf97316,
        emissiveIntensity: 0.4,
        metalness: 0.9,
        roughness: 0.2
      })
    );
    const angle = (i / 5) * Math.PI * 2;
    sat.position.set(Math.cos(angle) * 16, 3 + Math.sin(angle) * 2, Math.sin(angle) * 16);
    sat.userData.orbitAngle = angle;
    sat.userData.orbitRadius = 16;
    orbitGroup.add(sat);
  }
  orbitGroup.position.y = 4;
  scene.add(orbitGroup);

  const stationGroup = new THREE.Group();
  stationGroup.position.set(8, getTerrainHeight(8, -2), -2);

  const legMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7, roughness: 0.3 });
  [0, 120, 240].forEach(deg => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 3, 6), legMat);
    const rad = (deg * Math.PI) / 180;
    leg.position.set(Math.sin(rad) * 0.8, 1.5, Math.cos(rad) * 0.8);
    leg.rotation.x = Math.sin(rad) * 0.15;
    leg.rotation.z = -Math.cos(rad) * 0.15;
    stationGroup.add(leg);
  });

  const headMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    emissive: 0xf97316,
    emissiveIntensity: 0.15,
    metalness: 0.8,
    roughness: 0.25
  });
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.35, 0.4), headMat);
  head.position.y = 3.1;
  stationGroup.add(head);

  const scope = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.6, 8), headMat);
  scope.rotation.z = Math.PI / 2;
  scope.position.set(0.35, 3.25, 0);
  stationGroup.add(scope);
  scene.add(stationGroup);

  const triPairs = [[0, 1], [1, 2], [2, 3], [3, 4], [0, 4], [1, 4]];
  triPairs.forEach(([a, b]) => {
    const pa = surveyPoints[a];
    const pb = surveyPoints[b];
    const ha = getTerrainHeight(pa[0], pa[1]) + 2.6;
    const hb = getTerrainHeight(pb[0], pb[1]) + 2.6;
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(pa[0], ha, pa[1]),
      new THREE.Vector3(pb[0], hb, pb[1])
    ]);
    const line = new THREE.Line(
      geo,
      new THREE.LineDashedMaterial({
        color: 0xf97316,
        transparent: true,
        opacity: 0.25,
        dashSize: 0.5,
        gapSize: 0.3
      })
    );
    line.computeLineDistances();
    scene.add(line);
  });

  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  function resize() {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const w = hero.clientWidth;
    const h = hero.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  const clock = new THREE.Clock();
  let animId;
  let running = true;

  function animate() {
    if (!running) return;
    animId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    const speed = prefersReducedMotion ? 0 : 1;

    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    camera.position.x = Math.sin(t * 0.08 * speed) * 3 + mouseX * 2;
    camera.position.z = 22 + Math.cos(t * 0.06 * speed) * 2;
    camera.position.y = 14 + mouseY * 1.5;
    camera.lookAt(0, 1, 0);

    const rotY = t * 0.015 * speed;
    terrain.rotation.y = rotY;
    contour.rotation.y = rotY;
    grid.rotation.y = rotY;
    pointsGroup.rotation.y = rotY;
    stationGroup.rotation.y = rotY;
    orbitGroup.rotation.y = t * 0.12 * speed;

    pointsGroup.children.forEach((stake) => {
      const phase = stake.userData.phase;
      stake.children[2].material.opacity = 0.2 + Math.sin(t * 2 + phase) * 0.15;
      stake.children[1].position.y = 2.6 + Math.sin(t * 1.5 + phase) * 0.08 * speed;
    });

    orbitGroup.children.forEach((child) => {
      if (child.userData.orbitAngle !== undefined) {
        const angle = child.userData.orbitAngle + t * 0.3 * speed;
        const r = child.userData.orbitRadius;
        child.position.set(Math.cos(angle) * r, 3 + Math.sin(angle * 2) * 1.5, Math.sin(angle) * r);
      }
    });

    if (!prefersReducedMotion) {
      scope.rotation.y = Math.sin(t * 0.5) * 0.4;
    }

    renderer.render(scene, camera);
  }

  animate();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      running = false;
      cancelAnimationFrame(animId);
    } else {
      running = true;
      clock.getElapsedTime();
      animate();
    }
  });
})();
