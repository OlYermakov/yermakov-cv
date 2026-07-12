(function initI18n() {
  'use strict';

  // Nur en/uk/es werden hier gepflegt. Deutsch (de) ist der Ausgangstext im HTML
  // und wird beim Laden aus dem DOM erfasst. UI-Schlüssel, die nicht im DOM stehen,
  // enthalten zusätzlich einen de-Wert.
  const I18N = {
    // ===== Navigation =====
    'logo.sub': { de: `Vermessung`, en: `Surveying`, uk: `Геодезія`, es: `Topografía` },
    'nav.home': { en: `Home`, uk: `Головна`, es: `Inicio` },
    'nav.portfolio': { en: `Portfolio`, uk: `Портфоліо`, es: `Portafolio` },
    'nav.cv': { en: `CV`, uk: `Резюме`, es: `Currículum` },
    'nav.contacts': { en: `Contact`, uk: `Контакти`, es: `Contacto` },

    // ===== Hero =====
    'hero.name': { en: `Oleksii Yermakov`, uk: `Олексій Єрмаков`, es: `Oleksii Yermakov` },
    'hero.badge': {
      en: `Surveying Engineer · Cartographer · Land Manager`,
      uk: `Інженер-геодезист · Картограф · Землевпорядник`,
      es: `Ingeniero topógrafo · Cartógrafo · Gestor de tierras`
    },
    'hero.subtitle': {
      en: `20 years of experience in surveying, construction and cadastre.`,
      uk: `20 років досвіду у сферах геодезії, будівництва та кадастру.`,
      es: `20 años de experiencia en topografía, construcción y catastro.`
    },
    'hero.desc': {
      en: `More than 2,000 successfully completed planning and technical documentations with land management, and more than 300 approved topographic and geodetic materials.`,
      uk: `Понад 2 000 успішно виконаних проєктних і технічних документацій із землевпорядкування та понад 300 погоджених топографо-геодезичних матеріалів.`,
      es: `Más de 2.000 documentaciones técnicas y de planificación realizadas con éxito en gestión de tierras, y más de 300 materiales topográficos y geodésicos aprobados.`
    },
    'hero.stat1': { en: `Years of experience`, uk: `Років досвіду`, es: `Años de experiencia` },
    'hero.stat2': { en: `Documentations`, uk: `Документацій`, es: `Documentaciones` },
    'hero.stat3': { en: `Geodetic materials`, uk: `Геодезичних матеріалів`, es: `Materiales geodésicos` },
    'hero.cta1': { en: `View CV`, uk: `Переглянути резюме`, es: `Ver currículum` },
    'hero.cta2': { en: `Get in touch`, uk: `Зв'язатися`, es: `Contactar` },
    'hero.portraitRole': {
      en: `Eng. · Surveying Engineer`,
      uk: `Інж. · Інженер-геодезист`,
      es: `Ing. · Ingeniero topógrafo`
    },

    // ===== Portfolio =====
    'portfolio.tag': { en: `§ 01 · Portfolio`, uk: `§ 01 · Портфоліо`, es: `§ 01 · Portafolio` },
    'portfolio.title': { en: `Areas of expertise`, uk: `Напрями діяльності`, es: `Áreas de especialización` },
    'pcat.field': { de: `Fachgebiet`, en: `Field`, uk: `Напрям`, es: `Área` },
    'pcat.image': { de: `Bild`, en: `image`, uk: `зображення`, es: `imagen` },
    'pcat.images': { de: `Bilder`, en: `images`, uk: `зображень`, es: `imágenes` },
    'pcat.pdf': { de: `PDF`, en: `PDF`, uk: `PDF`, es: `PDF` },
    'pcat.pdfs': { de: `PDF-Dokumente`, en: `PDF documents`, uk: `PDF-документів`, es: `documentos PDF` },
    'pcat.topo.title': {
      en: `Topography and Cartography`,
      uk: `Топографія та картографія`,
      es: `Topografía y cartografía`
    },
    'pcat.topo.desc': {
      en: `Creation, design and editing of digital maps as well as topographic and geodetic surveys.`,
      uk: `Створення, оформлення та редагування цифрових карт, а також топографо-геодезичні знімання.`,
      es: `Creación, diseño y edición de mapas digitales, así como levantamientos topográficos y geodésicos.`
    },
    'pcat.kataster.title': {
      en: `Land Surveying and Cadastre`,
      uk: `Землевпорядкування та кадастр`,
      es: `Agrimensura y catastro`
    },
    'pcat.kataster.desc': {
      en: `Cadastral surveying, land management, boundary determination and technical documentation for land parcels.`,
      uk: `Кадастрові знімання, землеустрій, встановлення меж та технічна документація на земельні ділянки.`,
      es: `Levantamientos catastrales, gestión de tierras, delimitación de linderos y documentación técnica de parcelas.`
    },
    'pcat.certs.title': {
      en: `Proof of Qualification`,
      uk: `Підтвердження кваліфікації`,
      es: `Acreditación de la cualificación`
    },
    'pcat.certs.desc': {
      en: `Certified surveying expertise with recognized qualification certificates, diplomas and engineering accreditation.`,
      uk: `Сертифікована геодезична компетентність з визнаними посвідченнями, дипломами та інженерним допуском.`,
      es: `Competencia topográfica certificada con títulos de aptitud reconocidos, diplomas y habilitación de ingeniería.`
    },

    // ===== Portfolio-Dokumentnamen (Lightbox-Untertitel) =====
    'pitem.certs.0': { en: `Recognition of qualification`, uk: `Визнання кваліфікації`, es: `Reconocimiento de la cualificación` },
    'pitem.certs.1': { en: `Diploma`, uk: `Диплом`, es: `Diploma` },
    'pitem.certs.2': { en: `Assessment of foreign higher-education qualifications`, uk: `Оцінювання іноземних дипломів про вищу освіту`, es: `Evaluación de títulos universitarios extranjeros` },
    'pitem.certs.3': { en: `Employment record book of Ukraine`, uk: `Трудова книжка України`, es: `Cartilla laboral de Ucrania` },
    'pitem.certs.4': { en: `Certificate of competence of a design engineer (Ukraine)`, uk: `Кваліфікаційний сертифікат інженера-проєктувальника (Україна)`, es: `Certificado de aptitud de ingeniero proyectista (Ucrania)` },
    'pitem.certs.5': { en: `Advanced training of a geodetic engineer (Ukraine)`, uk: `Підвищення кваліфікації інженера-геодезиста (Україна)`, es: `Perfeccionamiento profesional de ingeniero geodesta (Ucrania)` },
    'pitem.certs.6': { en: `Advanced training of a geodetic engineer (Ukraine)`, uk: `Підвищення кваліфікації інженера-геодезиста (Україна)`, es: `Perfeccionamiento profesional de ingeniero geodesta (Ucrania)` },
    'pitem.certs.7': { en: `Certificate of competence of a surveying engineer (Ukraine)`, uk: `Кваліфікаційний сертифікат інженера-геодезиста (Україна)`, es: `Certificado de aptitud de ingeniero topógrafo (Ucrania)` },
    'pitem.certs.8': { en: `Character reference`, uk: `Характеристика`, es: `Carta de recomendación` },
    'pitem.certs.10': { en: `Reference letter (WALL STEEL)`, uk: `Рекомендаційний лист (WALL STEEL)`, es: `Carta de referencia (WALL STEEL)` },
    'pitem.certs.16': { en: `„Life in Germany" test`, uk: `Тест „Життя в Німеччині"`, es: `Examen «Vivir en Alemania»` },

    // ===== CV headings =====
    'cv.tag': { en: `§ 02 · CV`, uk: `§ 02 · Резюме`, es: `§ 02 · Currículum` },
    'cv.title': {
      en: `Work Experience & Qualifications`,
      uk: `Досвід роботи та кваліфікація`,
      es: `Experiencia laboral y cualificaciones`
    },
    'cv.experience': { en: `Work Experience`, uk: `Досвід роботи`, es: `Experiencia laboral` },
    'cv.education': { en: `Academic Education`, uk: `Освіта`, es: `Formación académica` },
    'cv.certificates': { en: `Certificates`, uk: `Сертифікати`, es: `Certificados` },

    // ===== Job 1 =====
    'job1.date': { en: `09.2025 – Present`, uk: `09.2025 – дотепер`, es: `09.2025 – Actualidad` },
    'job1.role': { en: `Surveying Engineer`, uk: `Інженер-геодезист`, es: `Ingeniero topógrafo` },
    'job1.company': { en: `„A.I.T." LTD (Rimpar, Germany)`, uk: `„A.I.T." ТОВ (Рімпар, Німеччина)`, es: `„A.I.T." LTD (Rimpar, Alemania)` },
    'job1.desc': {
      en: `Engineering services for infrastructure projects: surveying, noise protection planning and construction supervision.`,
      uk: `Інженерні послуги для інфраструктурних проєктів: геодезія, проєктування шумозахисту та будівельний нагляд.`,
      es: `Servicios de ingeniería para proyectos de infraestructura: topografía, planificación de protección acústica y supervisión de obra.`
    },
    'job1.li1': {
      en: `Carrying out total-station and GNSS measurements on railway construction sites: tracks, switches, platforms, overhead line systems (OLA) and engineering structures.`,
      uk: `Виконання тахеометричних та GNSS-знімань на залізничних будівельних майданчиках: колії, стрілочні переводи, платформи, контактна мережа (OLA) та інженерні споруди.`,
      es: `Realización de mediciones con estación total y GNSS en obras ferroviarias: vías, desvíos, andenes, catenaria (OLA) y estructuras de ingeniería.`
    },
    'job1.li2': {
      en: `Establishing and maintaining the construction survey network; setting up and checking control points as well as performing accuracy/quality controls.`,
      uk: `Створення та підтримання будівельної геодезичної мережі; закладання та перевірка опорних пунктів, а також виконання контролю точності/якості.`,
      es: `Establecimiento y mantenimiento de la red topográfica de obra; implantación y comprobación de puntos fijos, así como controles de precisión/calidad.`
    },
    'job1.li3': {
      en: `Carrying out levelling; recording and documenting elevation points on structures and infrastructure elements.`,
      uk: `Виконання нівелювання; фіксація та документування висотних відміток на спорудах та елементах інфраструктури.`,
      es: `Ejecución de nivelaciones; registro y documentación de cotas de altura en estructuras y elementos de infraestructura.`
    },
    'job1.li4': {
      en: `On-site setting out/marking: foundations of OLA masts, switch setting out (switch trapezoid), axes and control points; creation of stationing and point numbering.`,
      uk: `Винесення в натуру та закріплення на місцевості: фундаменти щогл контактної мережі, розмічення стрілочних переводів (стрілочна трапеція), осі та контрольні точки; ведення пікетажу та нумерації точок.`,
      es: `Replanteo/marcado in situ: cimentaciones de mástiles de catenaria, replanteo de desvíos (trapecio de desvío), ejes y puntos de control; creación de estacionamiento y numeración de puntos.`
    },
    'job1.li5': {
      en: `Performing as-built, control and acceptance measurements, including cross-sections as well as recording of characteristic points and obstacles.`,
      uk: `Виконання виконавчих, контрольних та приймальних знімань, у т.ч. поперечних профілів, а також знімання характерних точок і перешкод.`,
      es: `Realización de mediciones de estado real, control y recepción, incluidos perfiles transversales, así como el registro de puntos característicos y obstáculos.`
    },
    'job1.li6': {
      en: `Processing and handover of results to the client: DWG/PDF, coordinate lists (CSV), measurement files (GSI/GEO), KML; ensuring daily data transfer and photo documentation.`,
      uk: `Обробка та передавання результатів замовнику: DWG/PDF, списки координат (CSV), файли вимірювань (GSI/GEO), KML; забезпечення щоденного передавання даних та фотодокументації.`,
      es: `Procesamiento y entrega de resultados al cliente: DWG/PDF, listas de coordenadas (CSV), archivos de medición (GSI/GEO), KML; garantía de entrega diaria de datos y documentación fotográfica.`
    },
    'job1.li7': {
      en: `Field and office evaluation: plausibility checks of measurements, calculation/adjustment of points as well as keeping measurement journals and protocols.`,
      uk: `Польова та камеральна обробка: перевірка достовірності вимірювань, обчислення/узгодження точок, а також ведення журналів вимірювань та протоколів.`,
      es: `Evaluación de campo y de gabinete: comprobación de plausibilidad de las mediciones, cálculo/ajuste de puntos, así como llevanza de diarios de medición y protocolos.`
    },
    'job1.li8': {
      en: `Coordination with the construction site as well as compliance with occupational safety, access and instruction requirements.`,
      uk: `Координація з будівельним майданчиком та дотримання вимог охорони праці, доступу й інструктажів.`,
      es: `Coordinación con la obra, así como cumplimiento de los requisitos de seguridad laboral, acceso e instrucción.`
    },

    // ===== Job 2 =====
    'job2.date': { en: `09.2024 – 09.2025 (1 year)`, uk: `09.2024 – 09.2025 (1 рік)`, es: `09.2024 – 09.2025 (1 año)` },
    'job2.role': { en: `Setting Out Engineer`, uk: `Інженер-геодезист будівництва`, es: `Ingeniero topógrafo de obra` },
    'job2.company': {
      en: `„PETER CORRIGAN CONSULTING ENGINEERS" LTD (Kelsterbach, Germany)`,
      uk: `„КОНСУЛЬТАЦІЙНА ІНЖЕНЕРНА КОМПАНІЯ ПІТЕРА КОРРІГАНА" ТОВ (Кельстербах, Німеччина)`,
      es: `„PETER CORRIGAN INGENIEROS CONSULTORES" LTD (Kelsterbach, Alemania)`
    },
    'job2.desc': {
      en: `Providing first-class geospatial engineering solutions for the entire construction industry`,
      uk: `Надання першокласних геопросторових інженерних рішень для всієї будівельної галузі`,
      es: `Prestación de soluciones de ingeniería geoespacial de primera clase para todo el sector de la construcción`
    },
    'job2.li1': { en: `Setting out, levelling and surveying of a construction site`, uk: `Винесення в натуру, нівелювання та знімання будівельного майданчика`, es: `Replanteo, nivelación y levantamiento de una obra` },
    'job2.li2': { en: `Working with site plans, drawings and building data models`, uk: `Робота з генпланами, кресленнями та інформаційними моделями будівель`, es: `Trabajo con planos de emplazamiento, planos y modelos de datos de edificios` },
    'job2.li3': { en: `Marking out construction boundaries on the ground using stakes and markers`, uk: `Розмічення меж будівництва на місцевості за допомогою кілків та маркувань`, es: `Replanteo de los límites de construcción sobre el terreno mediante estacas y marcas` },
    'job2.li4': { en: `Collaboration with designers and engineers to ensure that plans and drawings are correct`, uk: `Співпраця з конструкторами та інженерами для забезпечення правильності планів і креслень`, es: `Colaboración con proyectistas e ingenieros para garantizar que los planos y dibujos sean correctos` },
    'job2.li5': { en: `Monitoring quality control`, uk: `Контроль якості`, es: `Supervisión del control de calidad` },
    'job2.li6': { en: `Monitoring health and safety`, uk: `Нагляд за охороною праці та безпекою`, es: `Supervisión de la salud y la seguridad` },
    'job2.li7': { en: `Keeping a construction diary`, uk: `Ведення будівельного журналу`, es: `Llevanza de un diario de obra` },
    'job2.li8': { en: `Solving technical problems`, uk: `Вирішення технічних проблем`, es: `Resolución de problemas técnicos` },
    'job2.li9': { en: `Working in an office and on a construction site`, uk: `Робота в офісі та на будівельному майданчику`, es: `Trabajo en oficina y en obra` },

    // ===== Job 3 =====
    'job3.date': { en: `08.2019 – 09.2022 (3 years 2 months)`, uk: `08.2019 – 09.2022 (3 роки 2 місяці)`, es: `08.2019 – 09.2022 (3 años 2 meses)` },
    'job3.role': { en: `Head of the Engineering Surveying Department`, uk: `Начальник відділу інженерної геодезії`, es: `Jefe del departamento de topografía de ingeniería` },
    'job3.company': {
      en: `„AVTOMAHISTRAL" ENGINEERING COMPANY LLC (Kyiv, Ukraine)`,
      uk: `"ІНЖИНІРИНГОВА КОМПАНІЯ „АВТОМАГІСТРАЛЬ", ТОВ (Київ, Україна)`,
      es: `EMPRESA DE INGENIERÍA „AVTOMAHISTRAL" S.L. (Kiev, Ucrania)`
    },
    'job3.desc': {
      en: `Planning, architecture, design, construction`,
      uk: `Планування, архітектура, дизайн, будівництво`,
      es: `Planificación, arquitectura, diseño, construcción`
    },
    'job3.li1': { en: `Managing the production and economic activities of the department.`, uk: `Управління виробничою та господарською діяльністю відділу.`, es: `Gestión de la producción y las actividades económicas del departamento.` },
    'job3.li2': { en: `Developing planning tasks for the preparation and execution of engineering (geodetic, geological, etc.) surveys and ensuring their implementation.`, uk: `Розроблення планових завдань для підготовки та виконання інженерних (геодезичних, геологічних тощо) вишукувань і забезпечення їх виконання.`, es: `Elaboración de tareas de planificación para la preparación y ejecución de estudios de ingeniería (geodésicos, geológicos, etc.) y garantía de su realización.` },
    'job3.li3': { en: `Taking measures for the efficient use of labour and material resources, machinery and other means of production per production unit.`, uk: `Вжиття заходів для ефективного використання трудових і матеріальних ресурсів, машин та інших засобів виробництва на одиницю продукції.`, es: `Adopción de medidas para el uso eficiente de los recursos laborales y materiales, la maquinaria y otros medios de producción por unidad de producción.` },
    'job3.li4': { en: `Ensuring the mechanization of production processes and increasing labour productivity.`, uk: `Забезпечення механізації виробничих процесів та підвищення продуктивності праці.`, es: `Garantía de la mecanización de los procesos productivos y del aumento de la productividad laboral.` },
    'job3.li5': { en: `Introducing scientifically based production standards.`, uk: `Впровадження науково обґрунтованих виробничих норм.`, es: `Introducción de normas de producción con base científica.` },
    'job3.li6': { en: `Organizing the planning, accounting, preparation and submission of documents of the established reporting on the department's production activities.`, uk: `Організація планування, обліку, підготовки та подання документів встановленої звітності про виробничу діяльність відділу.`, es: `Organización de la planificación, la contabilidad, la preparación y la presentación de los documentos de los informes establecidos sobre las actividades productivas del departamento.` },
    'job3.li7': { en: `Participating in organizing training and further education measures for staff.`, uk: `Участь в організації заходів з підготовки та підвищення кваліфікації персоналу.`, es: `Participación en la organización de medidas de formación y perfeccionamiento del personal.` },
    'job3.li8': { en: `Organizing the municipal and welfare provision for department staff.`, uk: `Організація комунально-побутового забезпечення працівників відділу.`, es: `Organización del abastecimiento comunal y de bienestar de los empleados del departamento.` },
    'job3.li9': { en: `Monitoring staff compliance with production and labour discipline, rules and regulations on occupational safety, occupational hygiene and fire protection.`, uk: `Контроль дотримання працівниками виробничої та трудової дисципліни, правил і норм охорони праці, виробничої санітарії та пожежної безпеки.`, es: `Control del cumplimiento por parte de los empleados de la disciplina productiva y laboral, de las normas y reglamentos de seguridad laboral, higiene industrial y protección contra incendios.` },
    'job3.li10': { en: `Carrying out mentoring work within the department team.`, uk: `Проведення виховної роботи в колективі відділу.`, es: `Realización de labores de orientación en el equipo del departamento.` },

    // ===== Job 4 =====
    'job4.date': { en: `02.2015 – 07.2019 (4 years 6 months)`, uk: `02.2015 – 07.2019 (4 роки 6 місяців)`, es: `02.2015 – 07.2019 (4 años 6 meses)` },
    'job4.role': { en: `Lead Specialist for Cadastral, Topographic and Geodetic Works`, uk: `Провідний фахівець з кадастрових, топографічних та геодезичних робіт`, es: `Especialista principal en trabajos catastrales, topográficos y geodésicos` },
    'job4.company': {
      en: `„INSTITUTE FOR INDEPENDENT EXPERT ASSESSMENT" LLC (Kyiv, Ukraine)`,
      uk: `„ІНСТИТУТ НЕЗАЛЕЖНОЇ ЕКСПЕРТНОЇ ОЦІНКИ", ТОВ (Київ, Україна)`,
      es: `„INSTITUTO DE EVALUACIÓN PERICIAL INDEPENDIENTE" S.L. (Kiev, Ucrania)`
    },
    'job4.desc': {
      en: `Geodetic surveying, land management, cadastre, real estate valuation`,
      uk: `Геодезичні знімання, землеустрій, кадастр, оцінка нерухомості`,
      es: `Levantamiento geodésico, gestión de tierras, catastro, valoración inmobiliaria`
    },
    'job4.p1': {
      en: `Organization, development and control of cadastral, topographic and geodetic works with subsequent coordination and approval of the relevant materials.`,
      uk: `Організація, розроблення та контроль кадастрових, топографічних і геодезичних робіт з подальшим погодженням та затвердженням відповідних матеріалів.`,
      es: `Organización, desarrollo y control de trabajos catastrales, topográficos y geodésicos con la posterior coordinación y aprobación de los materiales correspondientes.`
    },

    // ===== Job 5 =====
    'job5.date': { en: `11.2012 – 07.2014 (1 year 8 months)`, uk: `11.2012 – 07.2014 (1 рік 8 місяців)`, es: `11.2012 – 07.2014 (1 año 8 meses)` },
    'job5.role': { en: `Chief Surveyor`, uk: `Головний геодезист`, es: `Jefe de topografía` },
    'job5.company': {
      en: `„WEST UKRAINIAN LAND AGENCY" LLC (Ternopil, Ukraine)`,
      uk: `„ЗАХІДНОУКРАЇНСЬКА ЗЕМЕЛЬНА АГЕНЦІЯ", ТОВ (Тернопіль, Україна)`,
      es: `„AGENCIA DE TIERRAS DE UCRANIA OCCIDENTAL" S.L. (Ternopil, Ucrania)`
    },
    'job5.desc': {
      en: `Land legalization, geodetic surveying, land management, cadastre`,
      uk: `Легалізація земель, геодезичні знімання, землеустрій, кадастр`,
      es: `Legalización de tierras, levantamiento geodésico, gestión de tierras, catastro`
    },
    'job5.p1': {
      en: `Organization, development and control of topographic and geodetic works with subsequent coordination and approval of the relevant materials.`,
      uk: `Організація, розроблення та контроль топографічних і геодезичних робіт з подальшим погодженням та затвердженням відповідних матеріалів.`,
      es: `Organización, desarrollo y control de trabajos topográficos y geodésicos con la posterior coordinación y aprobación de los materiales correspondientes.`
    },
    'job5.li1': { en: `Cadastral surveying`, uk: `Кадастрове знімання`, es: `Levantamiento catastral` },
    'job5.li2': { en: `Geodetic support for construction projects`, uk: `Геодезичний супровід будівельних проєктів`, es: `Apoyo geodésico a proyectos de construcción` },
    'job5.li3': { en: `Topographic and geodetic design surveys`, uk: `Топографо-геодезичні вишукування для проєктування`, es: `Levantamientos topográficos y geodésicos de proyecto` },
    'job5.li4': { en: `Topographic and geodetic surveying of land parcels and entire areas`, uk: `Топографо-геодезичне знімання земельних ділянок і цілих територій`, es: `Levantamiento topográfico y geodésico de parcelas y de zonas enteras` },
    'job5.li5': { en: `Development and preparation of land management projects for leasing land parcels`, uk: `Розроблення та підготовка проєктів землеустрою щодо оренди земельних ділянок`, es: `Desarrollo y preparación de proyectos de ordenación territorial para el arrendamiento de parcelas` },
    'job5.li6': { en: `Development and preparation of crop rotation projects (graphic part)`, uk: `Розроблення та підготовка проєктів сівозмін (графічна частина)`, es: `Desarrollo y preparación de proyectos de rotación de cultivos (parte gráfica)` },
    'job5.li7': { en: `Development and preparation of technical documentation for boundary determination`, uk: `Розроблення та підготовка технічної документації щодо встановлення меж`, es: `Desarrollo y preparación de la documentación técnica para la determinación de linderos` },
    'job5.li8': { en: `Creation of exchange files in the relevant formats`, uk: `Формування обмінних файлів у відповідних форматах`, es: `Creación de archivos de intercambio en los formatos correspondientes` },

    // ===== Job 6 =====
    'job6.date': { en: `07.2006 – 11.2012 (6 years 4 months)`, uk: `07.2006 – 11.2012 (6 років 4 місяці)`, es: `07.2006 – 11.2012 (6 años 4 meses)` },
    'job6.role': { en: `Surveying Technician`, uk: `Технік-геодезист`, es: `Técnico topógrafo` },
    'job6.company': {
      en: `State Enterprise „PODILLJAGEODESKARTOGRAFIJA" (Vinnytsia, Ukraine)`,
      uk: `Державне підприємство „ПОДІЛЛЯГЕОДЕЗКАРТОГРАФІЯ" (Вінниця, Україна)`,
      es: `Empresa estatal „PODILLJAGEODESKARTOGRAFIJA" (Vinnytsia, Ucrania)`
    },
    'job6.desc': {
      en: `Geodesy, cartography, topography, land management`,
      uk: `Геодезія, картографія, топографія, землеустрій`,
      es: `Geodesia, cartografía, topografía, gestión de tierras`
    },
    'job6.p1': {
      en: `Execution of topographic and geodetic field works with the qualification of a second-category topographer. Preparation and control of ownership and use certificates for land parcels.`,
      uk: `Виконання топографо-геодезичних робіт у полі з кваліфікацією топографа другої категорії. Підготовка та контроль документів на право власності та користування земельними ділянками.`,
      es: `Ejecución de trabajos topográficos y geodésicos de campo con la cualificación de topógrafo de segunda categoría. Elaboración y control de los títulos de propiedad y uso de parcelas.`
    },
    'job6.li1': { en: `Geodetic surveying of land parcels`, uk: `Геодезичне знімання земельних ділянок`, es: `Levantamiento geodésico de parcelas` },
    'job6.li2': { en: `Preparation of technical documentation for land ownership`, uk: `Підготовка технічної документації щодо права власності на земельні ділянки`, es: `Preparación de la documentación técnica para la propiedad de parcelas` },
    'job6.li3': { en: `Carrying out topographic and geodetic works for the horizontal and vertical control of topographic maps`, uk: `Виконання топографо-геодезичних робіт для планово-висотної прив'язки топографічних карт`, es: `Realización de trabajos topográficos y geodésicos para la referencia planimétrica y altimétrica de mapas topográficos` },
    'job6.li4': { en: `Carrying out topographic and geodetic works for projects allocating land for kiosks and pond leases`, uk: `Виконання топографо-геодезичних робіт для проєктів відведення земель під кіоски та оренду ставків`, es: `Realización de trabajos topográficos y geodésicos para proyectos de asignación de terrenos para quioscos y arrendamiento de estanques` },

    // ===== Education =====
    'edu1.school': { en: `Lviv Polytechnic National University`, uk: `Національний університет „Львівська політехніка"`, es: `Universidad Nacional Politécnica de Lviv` },
    'edu1.location': { en: `Lviv, Ukraine`, uk: `Львів, Україна`, es: `Leópolis, Ucrania` },
    'edu1.degree': { en: `Geodesy, Surveying Engineer — Higher education (5 years 3 months)`, uk: `Геодезія, інженер-геодезист — вища освіта (5 років 3 місяці)`, es: `Geodesia, ingeniero topógrafo — Educación superior (5 años 3 meses)` },
    'edu1.desc': { en: `Completed a full higher education in the field of „Surveying" and obtained the qualification of surveying engineer.`, uk: `Здобуття повної вищої освіти за спеціальністю „Геодезія" та кваліфікації інженера-геодезиста.`, es: `Obtención de una educación superior completa en la especialidad de «Geodesia» y de la cualificación de ingeniero topógrafo.` },
    'edu2.school': { en: `Vinnytsia Technical College of Construction`, uk: `Вінницький технікум будівництва`, es: `Escuela Técnica de Construcción de Vinnytsia` },
    'edu2.location': { en: `Vinnytsia, Ukraine`, uk: `Вінниця, Україна`, es: `Vinnytsia, Ucrania` },
    'edu2.degree': { en: `Land Management, Land Management Technician — Technical vocational (2 years 9 months)`, uk: `Землевпорядкування, технік-землевпорядник — середня спеціальна (2 роки 9 місяців)`, es: `Gestión de tierras, técnico en gestión de tierras — Formación técnica especializada (2 años 9 meses)` },
    'edu2.desc': { en: `Obtained education in the field of „Land management" and the qualification of surveying technician.`, uk: `Здобуття освіти за спеціальністю „Землевпорядкування" та кваліфікації техніка-геодезиста.`, es: `Obtención de formación en la especialidad de «Ordenación del territorio» y de la cualificación de técnico topógrafo.` },

    // ===== Certificates =====
    'cert1.title': { en: `Authorization to use the professional title „Engineer"`, uk: `Дозвіл на використання професійного звання „Інженер"`, es: `Autorización para usar el título profesional de «Ingeniero»` },
    'cert1.org': { en: `Chamber of Engineers of Hesse, Wiesbaden`, uk: `Інженерна палата Гессену, Вісбаден`, es: `Colegio de Ingenieros de Hesse, Wiesbaden` },
    'cert2.title': { en: `Certification in occupational health and safety in construction`, uk: `Допуск з охорони праці та безпеки в будівництві`, es: `Habilitación en seguridad y salud laboral en la construcción` },
    'cert2.org': { en: `Transcarpathian Training and Retraining Center LLC, online`, uk: `Закарпатський навчальний центр підготовки та перепідготовки, ТОВ, онлайн`, es: `Centro de Formación y Reciclaje de Transcarpatia S.L., en línea` },
    'cert3.title': { en: `Certificate in Construction Safety and Health`, uk: `Сертифікат з безпеки та охорони здоров'я в будівництві`, es: `Certificado de seguridad y salud en la construcción` },
    'cert3.org': { en: `Alison, online`, uk: `Alison, онлайн`, es: `Alison, en línea` },
    'cert4.title': { en: `Certificate in Fundamentals of Manual Handling`, uk: `Сертифікат з основ ручного переміщення вантажів`, es: `Certificado de fundamentos de manipulación manual` },
    'cert4.org': { en: `Alison, online`, uk: `Alison, онлайн`, es: `Alison, en línea` },
    'cert5.title': { en: `Specialization Certificate: Excel Skills for Data Analysis and Visualization`, uk: `Сертифікат спеціалізації: навички Excel для аналізу та візуалізації даних`, es: `Certificado de especialización: competencias en Excel para análisis y visualización de datos` },
    'cert5.org': { en: `Macquarie University, online`, uk: `Університет Маккуорі, онлайн`, es: `Universidad Macquarie, en línea` },
    'cert6.title': { en: `Certificate of continuing education for a surveying engineer`, uk: `Свідоцтво про підвищення кваліфікації інженера-геодезиста`, es: `Certificado de formación continua de ingeniero topógrafo` },
    'cert6.org': { en: `National University of Life and Environmental Sciences of Ukraine, Kyiv`, uk: `Національний університет біоресурсів і природокористування України, Київ`, es: `Universidad Nacional de Ciencias de la Vida y del Medio Ambiente de Ucrania, Kiev` },
    'cert7.title': { en: `Certificate of competence of a design engineer for carrying out surveys`, uk: `Кваліфікаційний сертифікат інженера-проєктувальника щодо виконання вишукувань`, es: `Certificado de aptitud de ingeniero proyectista para la realización de levantamientos` },
    'cert7.org': { en: `All-Ukrainian Non-Profit Organization „Guild of Construction Designers", Kyiv`, uk: `Всеукраїнська громадська організація „Гільдія проєктувальників", Київ`, es: `Organización sin ánimo de lucro de toda Ucrania «Gremio de Proyectistas de Construcción», Kiev` },
    'cert8.title': { en: `Certificate of continuing education for a surveying engineer`, uk: `Свідоцтво про підвищення кваліфікації інженера-геодезиста`, es: `Certificado de formación continua de ingeniero topógrafo` },
    'cert8.org': { en: `Kyiv National University of Construction and Architecture, Kyiv`, uk: `Київський національний університет будівництва і архітектури, Київ`, es: `Universidad Nacional de Construcción y Arquitectura de Kiev, Kiev` },
    'cert9.title': { en: `Certificate of competence of a surveying engineer`, uk: `Кваліфікаційний сертифікат інженера-геодезиста`, es: `Certificado de aptitud de ingeniero topógrafo` },
    'cert9.org': { en: `Kyiv National University of Construction and Architecture, Kyiv`, uk: `Київський національний університет будівництва і архітектури, Київ`, es: `Universidad Nacional de Construcción y Arquitectura de Kiev, Kiev` },

    // ===== Skills =====
    'skills.title': { en: `Professional Skills`, uk: `Професійні навички`, es: `Competencias profesionales` },
    'skills.li1': { en: `Excellent knowledge of office applications and domain-specific software at an advanced user level`, uk: `Відмінне знання офісних застосунків та профільного програмного забезпечення на рівні досвідченого користувача`, es: `Excelente conocimiento de aplicaciones ofimáticas y software especializado a nivel de usuario avanzado` },
    'skills.li2': { en: `Professional experience and knowledge of the principles of creating, designing and editing digital maps`, uk: `Професійний досвід і знання принципів створення, оформлення та редагування цифрових карт`, es: `Experiencia profesional y conocimiento de los principios de creación, diseño y edición de mapas digitales` },
    'skills.li3': { en: `Experience operating equipment: level, total station, GPS devices, drone`, uk: `Досвід роботи з обладнанням: нівелір, тахеометр, GPS-приймачі, дрон`, es: `Experiencia en el manejo de equipos: nivel, estación total, dispositivos GPS, dron` },

    // ===== Languages card =====
    'lang.title': { en: `Languages`, uk: `Мови`, es: `Idiomas` },
    'lang.uk': { en: `Ukrainian`, uk: `Українська`, es: `Ucraniano` },
    'lang.ru': { en: `Russian`, uk: `Російська`, es: `Ruso` },
    'lang.en': { en: `English`, uk: `Англійська`, es: `Inglés` },
    'lang.de': { en: `German`, uk: `Німецька`, es: `Alemán` },
    'lang.native': { en: `Native`, uk: `Рідна`, es: `Nativo` },
    'lang.fluent': { en: `Fluent`, uk: `Вільно`, es: `Fluido` },
    'lang.intermediate': { en: `Intermediate`, uk: `Середній`, es: `Intermedio` },
    'lang.preIntermediate': { en: `Pre-intermediate`, uk: `Нижче середнього`, es: `Preintermedio` },

    // ===== About =====
    'about.title': { en: `About me`, uk: `Про мене`, es: `Sobre mí` },
    'about.birthLabel': { en: `Date of birth:`, uk: `Дата народження:`, es: `Fecha de nacimiento:` },
    'about.birthValue': { en: `24 February 1986`, uk: `24 лютого 1986`, es: `24 de febrero de 1986` },
    'about.licenseLabel': { en: `Driving licence:`, uk: `Посвідчення водія:`, es: `Permiso de conducir:` },
    'about.licenseValue': { en: `Category B`, uk: `Категорія B`, es: `Categoría B` },
    'about.familyLabel': { en: `Marital status:`, uk: `Сімейний стан:`, es: `Estado civil:` },
    'about.familyValue': { en: `Married, one child`, uk: `Одружений, одна дитина`, es: `Casado, un hijo` },
    'about.traitsLabel': { en: `Personal qualities:`, uk: `Особисті якості:`, es: `Cualidades personales:` },
    'about.traitsValue': { en: `demanding, leadership qualities, conscientiousness, independence.`, uk: `вимогливість, наявність лідерських якостей, сумлінність, самостійність.`, es: `exigente, con dotes de liderazgo, escrupulosidad, autonomía.` },
    'about.motto': { en: `I value politeness, professionalism and punctuality.`, uk: `Я ціную ввічливість, професіоналізм і пунктуальність.`, es: `Valoro la cortesía, la profesionalidad y la puntualidad.` },

    // ===== Contact =====
    'contact.tag': { en: `§ 03 · Contact`, uk: `§ 03 · Контакти`, es: `§ 03 · Contacto` },
    'contact.title': { en: `Get in touch`, uk: `Зв'язатися`, es: `Ponerse en contacto` },
    'contact.intro': { en: `I look forward to your message. Feel free to contact me by phone or email.`, uk: `Буду радий вашому повідомленню. Зв'яжіться зі мною телефоном або електронною поштою.`, es: `Espero su mensaje. No dude en contactarme por teléfono o correo electrónico.` },
    'contact.phone': { en: `Phone`, uk: `Телефон`, es: `Teléfono` },
    'contact.email': { en: `Email`, uk: `Ел. пошта`, es: `Correo electrónico` },
    'contact.address': { en: `Address`, uk: `Адреса`, es: `Dirección` },
    'contact.addressValue': { en: `65375 Oestrich-Winkel, Germany`, uk: `65375 Ойстріх-Вінкель, Німеччина`, es: `65375 Oestrich-Winkel, Alemania` },

    // ===== Form =====
    'form.name': { en: `Name`, uk: `Ім'я`, es: `Nombre` },
    'form.namePh': { en: `Your name`, uk: `Ваше ім'я`, es: `Su nombre` },
    'form.email': { en: `Email`, uk: `Ел. пошта`, es: `Correo electrónico` },
    'form.emailPh': { en: `your@email.com`, uk: `your@email.com`, es: `su@email.com` },
    'form.message': { en: `Message`, uk: `Повідомлення`, es: `Mensaje` },
    'form.messagePh': { en: `Your message...`, uk: `Ваше повідомлення...`, es: `Su mensaje...` },
    'form.submit': { en: `Send message`, uk: `Надіслати повідомлення`, es: `Enviar mensaje` },

    // ===== Footer =====
    'footer.brand': {
      en: `Surveying Engineer · Cartographer · Land Manager`,
      uk: `Інженер-геодезист · Картограф · Землевпорядник`,
      es: `Ingeniero topógrafo · Cartógrafo · Gestor de tierras`
    },
    'footer.copy': {
      en: `© 2026 Oleksii Yermakov. All rights reserved.`,
      uk: `© 2026 Олексій Єрмаков. Усі права захищено.`,
      es: `© 2026 Oleksii Yermakov. Todos los derechos reservados.`
    }
  };

  const SUPPORTED = ['de', 'en', 'uk', 'es'];
  const STORAGE_KEY = 'siteLang';
  const originals = {};
  let current = 'de';

  function detectLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
    const nav = (navigator.language || 'de').slice(0, 2).toLowerCase();
    return SUPPORTED.includes(nav) ? nav : 'de';
  }

  // Übersetzt einen Schlüssel in die aktuelle Sprache (mit Fallback auf Deutsch).
  function t(key) {
    const entry = I18N[key];
    if (current === 'de') {
      if (entry && entry.de != null) return entry.de;
      if (key in originals) return originals[key];
    }
    if (entry && entry[current] != null) return entry[current];
    if (key in originals) return originals[key];
    if (entry && entry.de != null) return entry.de;
    return key;
  }

  function applyLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = 'de';
    current = lang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (!(key in originals)) originals[key] = el.textContent;
      if (lang === 'de') {
        const entry = I18N[key];
        el.textContent = entry && entry.de != null ? entry.de : originals[key];
      } else {
        const entry = I18N[key];
        el.textContent = entry && entry[lang] != null ? entry[lang] : originals[key];
      }
    });

    document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
      const key = el.getAttribute('data-i18n-ph');
      if (!(key in originals)) originals[key] = el.getAttribute('placeholder') || '';
      const entry = I18N[key];
      if (lang === 'de') {
        el.setAttribute('placeholder', entry && entry.de != null ? entry.de : originals[key]);
      } else {
        el.setAttribute('placeholder', entry && entry[lang] != null ? entry[lang] : originals[key]);
      }
    });

    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    const codeEl = document.getElementById('langCode');
    if (codeEl) codeEl.textContent = lang.toUpperCase();
    document.querySelectorAll('#langMenu [data-lang]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    document.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang } }));
  }

  // Öffentliche API für andere Skripte (z. B. portfolio.js)
  window.i18nText = t;
  window.getLang = () => current;
  window.setLang = applyLang;

  function initSwitcher() {
    const wrap = document.getElementById('langSwitch');
    const btn = document.getElementById('langCurrent');
    const menu = document.getElementById('langMenu');
    if (!wrap || !btn || !menu) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = wrap.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    menu.querySelectorAll('[data-lang]').forEach((item) => {
      item.addEventListener('click', () => {
        applyLang(item.getAttribute('data-lang'));
        wrap.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target)) {
        wrap.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        wrap.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function boot() {
    initSwitcher();
    applyLang(detectLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
