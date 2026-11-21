export interface PortfolioGalleryImage {
  src: string;
  title: string;
  caption: string;
}

export interface PortfolioProject {
  id: string;
  index: string;
  title: string;
  category: string;
  plainSummary: string;
  problem?: string;
  outcome?: string;
  highlights: string[];
  stack: string[];
  liveUrl?: string;
  repoUrl: string;
  embeddable: boolean;
  previewNote: string;
  previewImage?: string;
  galleryImages?: PortfolioGalleryImage[];
  schematicModules?: string[];
  cadShowcaseId?: string;
  cadLabel?: string;
}

export interface SecondaryBuild {
  title: string;
  kind: string;
  summary: string;
  stack: string[];
  liveUrl?: string;
  repoUrl: string;
  embeddable: boolean;
  statusLabel: string;
  cadShowcaseId?: string;
  cadLabel?: string;
}

export type ShowcaseCategory = '3d-models' | '3d-prints' | 'hardware' | 'offline-apps';

export interface ShowcaseModelPreset {
  key: string;
  label: string;
  hiddenParts: string[];
  xray?: boolean;
}

export interface ShowcaseModelPartSource {
  src: string;
  label: string;
}

export interface ShowcaseModelConfig {
  outerParts: string[];
  presets: ShowcaseModelPreset[];
  partSources?: ShowcaseModelPartSource[];
  partLabels?: Record<string, string>;
  initialCamera?: [number, number, number];
}

export interface ShowcaseItem {
  id: string;
  category: ShowcaseCategory;
  categoryLabel: string;
  title: string;
  caption: string;
  tools: string;
  /** Served from apps/web/public/showcase/ or apps/web/public/models/thumbs/ */
  imageSrc: string | null;
  /** Optional light-theme studio preview paired with imageSrc via CSS theme class */
  lightImageSrc?: string | null;
  suggestedPath: string;
  /** Optional interactive 3D GLB model served from public/models/ */
  modelSrc?: string;
  partCount?: number;
  modelConfig?: ShowcaseModelConfig;
}

export interface CommunityPhoto {
  src: string;
  caption: string;
}

export interface CommunityHighlight {
  id: string;
  index: string;
  badge: string;
  organizer: string;
  title: string;
  summary: string;
  highlights: string[];
  coverSrc: string;
  photos: CommunityPhoto[];
  certificateId?: string;
  certificateLabel?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  credentialType: string;
  date: string;
  summary: string;
  previewImage: string;
}

export interface ContactLinks {
  githubUrl: string;
  githubHandle: string;
  email: string;
  messengerUrl: string;
}

export const PROFILE = {
  brand: 'MARCO',
  fullName: 'Marco Rye S. Dela Serna',
  shortName: 'Marco',
  handle: 'sudo-marco-dev',
  degree: '4th-Year BSIT Student',
  university: 'Palawan State University',
  location: 'Palawan, Philippines',
  availability: 'Open for OJT, Junior Full-Stack / IoT Roles & Client Builds',
  shortAvailability: 'OPEN · OJT & COMMISSIONS',
  headline: 'Full-stack web systems, soldered IoT hardware & custom 3D enclosures.',
  subheadline:
    '4th-year BSIT student at Palawan State University combining full-stack web apps (Next.js, React, Supabase) with ESP32 microcontrollers, soldering, and Onshape + Flashforge Creator 3 prototyping.',
  headshotSrc: '/profile/headshot.jpg' as string | null,
  suggestedHeadshotPath: 'apps/web/public/profile/headshot.jpg',
} as const;

export const CONTACT_LINKS: ContactLinks = {
  githubUrl: 'https://github.com/sudo-marco-dev',
  githubHandle: '@sudo-marco-dev',
  email: 'mrcrye@gmail.com',
  messengerUrl: 'https://m.me/marcorye255',
};

export const FLAGSHIP_PROJECTS: PortfolioProject[] = [
  {
    id: 'psu-sportstrack',
    index: '01',
    title: 'PSU-SportsTrack',
    category: 'College Capstone · Sports Platform',
    plainSummary:
      'Live tournament scoring, athlete eligibility verification, and stadium big-screen scoreboards built for Palawan State University sports events.',
    problem: 'Manual paper bracket & COR athlete checks slowed university matches.',
    outcome: 'Live courtside scoring, jumbotron display & instant PDF eligibility verification.',
    highlights: [
      'Courtside facilitator kiosk mode designed for fast dual-thumb mobile scoring without scrolling',
      'Big-screen stadium display view with Screen Wake Lock, Picture-in-Picture stream, and procedural Web Audio referee SFX',
      'In-browser PDF Certificate of Registration (COR) athlete verification, 9 sport profiles, and 5-role access control',
      'Automated end-to-end verification suite with Playwright and Supabase PostgreSQL + PL/pgSQL policies',
    ],
    stack: ['React 19', 'Vite 8', 'TypeScript', 'Supabase', 'Tailwind CSS', 'shadcn/ui', 'PDF.js', 'Playwright'],
    liveUrl: 'https://psusportstrack.tech/',
    repoUrl: 'https://github.com/sudo-marco-dev/PSU-SportsTrack',
    embeddable: true,
    previewNote: 'Live Vercel deployment verified (200 OK)',
  },
  {
    id: 'rtnhs-qr-sms',
    index: '02',
    title: 'RTNHS QR Attendance + SMS',
    category: 'School Client System · IoT + Web',
    plainSummary:
      'QR code attendance system built for Rio Tuba National High School that checks students in and automatically notifies parents via SMS, paired with an ESP32-CAM unit.',
    problem: 'Manual student roll calls gave parents zero real-time arrival visibility.',
    outcome: 'Instant QR/ESP32-CAM check-ins with automated SMS alerts & 3 role portals.',
    highlights: [
      'Three dedicated role portals (Admin, Teacher, and Scanner Terminal) delivered with full client handover docs',
      'Automated parent SMS notifications powered by httpSMS when students scan in on time or late',
      'Custom C++ ESP32-CAM firmware paired with browser QR/vision scanning (jsQR + MediaPipe Vision)',
      'One-click attendance export to Excel (ExcelJS) and printable PDF reports (jsPDF)',
    ],
    stack: ['React 19', 'Vite', 'TypeScript', 'C++ / ESP32-CAM', 'Supabase', 'Zustand', 'httpSMS', 'ExcelJS'],
    liveUrl: 'https://rtnhs-qr-code-attendace-system-with.vercel.app',
    repoUrl: 'https://github.com/sudo-marco-dev/RTNHS-QR-code-attendace-system-with-SMS',
    embeddable: true,
    previewNote: 'Live Vercel deployment verified (200 OK)',
    cadShowcaseId: 'rtnhs-qr-scanner-cad',
    cadLabel: '3D Enclosure',
  },
  {
    id: 'psu-pos',
    index: '03',
    title: 'PSU Sales & Inventory (POS)',
    category: 'ADS Finals · Retail & Stock System',
    plainSummary:
      'Point-of-sale checkout, real-time inventory monitoring, and printable sales reporting built for Palawan State University Advanced Database Systems finals.',
    problem: 'Fragmented stock tracking & manual end-of-day payment reconciliation.',
    outcome: 'Unified Prisma + SQLite ledger with multi-method analytics, backups & PDF/Excel.',
    highlights: [
      'Role-based Admin, Cashier, and Inventory Clerk dashboards with bcrypt auth and SQLite backup/restore',
      'Relational database schema modeled with Prisma ORM on SQLite across products, suppliers, and sales',
      'Analytics breakdown across GCash, Cash, Card, and PayMaya with exportable PDF and Excel reports',
      'Clean App Router interface built with Next.js 14, TypeScript, Tailwind CSS, and Radix UI',
    ],
    stack: ['Next.js 14', 'TypeScript', 'Prisma ORM', 'SQLite', 'Tailwind CSS', 'Radix UI', 'jsPDF', 'SheetJS'],
    repoUrl: 'https://github.com/sudo-marco-dev/psu-sales-inventory-system',
    embeddable: false,
    previewNote: 'Local Next.js + SQLite build · System captures',
    previewImage: '/showcase/offline-pos-sales-pnl.png',
    galleryImages: [
      {
        src: '/showcase/offline-pos-sales-pnl.png',
        title: 'Sales Summary & Profit/Loss Analytics',
        caption:
          'Aggregates shift transactions in SQLite via Prisma by payment tender for rapid cashier closeouts, computing real-time COGS gross margin with one-click PDF and Excel exports.',
      },
      {
        src: '/showcase/offline-pos-inventory.png',
        title: 'Inventory Status & Low-Stock Alerts',
        caption:
          'Runs inside atomic Prisma checkout transactions so every sale deducts SKU stock safely and flags items below reorder thresholds before supplies run out.',
      },
      {
        src: '/showcase/offline-pos-rankings.png',
        title: 'Top Selling & Slow Moving SKUs',
        caption:
          'Groups completed order line items across reporting windows to separate high-turnover campus staples from slow stock tying up storage and capital.',
      },
    ],
    schematicModules: ['POS Checkout Terminal', 'Real-Time Stock Ledger', 'Prisma + SQLite Schema', 'PDF & Excel Export'],
  },
  {
    id: 'codm-camo-tracker',
    index: '04',
    title: 'CODM Camo Tracker',
    category: 'Interactive Web App · Next.js 14',
    plainSummary:
      'Dark-mode progress tracker for Call of Duty: Mobile weapon challenges, letting players track base camos, Gold weapons, and Platinum category unlocks directly in the browser.',
    problem: 'Tracking dozens of weapon camo sets across tiers in-game is tedious.',
    outcome: 'Zero-friction browser tracker with instant Gold & Platinum unlock sync.',
    highlights: [
      'Tracks all 6 base camo sets per weapon (Sand, Dragon, Splinter, Tiger, Jungle, Reptile) with challenge target counts',
      'One-click toggle for individual camos plus a Complete Gun action to mark an entire weapon done',
      'Live progress dashboard showing overall completion percentage, Gold weapon count, and Platinum category status',
      'Built with Next.js 14 and TypeScript to run offline-ready in the browser with LocalStorage JSON backup/import',
    ],
    stack: ['Next.js 14', 'React 18', 'TypeScript', 'Custom CSS', 'LocalStorage', 'PWA', 'Vercel'],
    liveUrl: 'https://codm-camo-tracker.vercel.app',
    repoUrl: 'https://github.com/sudo-marco-dev/CODM-camo-tracker',
    embeddable: true,
    previewNote: 'Live Vercel deployment verified (200 OK)',
  },
];

export const MORE_BUILDS: SecondaryBuild[] = [
  {
    title: 'D.R.O.P. Drop-Box Digital Twin',
    kind: 'IoT Hardware Twin · Next.js 14',
    summary:
      'Digital twin dashboard mirroring an ESP32 smart parcel drop-box state machine, mobile remote CCTV via Supabase Realtime CDC, and Discord alerts.',
    stack: ['Next.js 14', 'TypeScript', 'Supabase Realtime', 'ESP32 State Machine'],
    liveUrl: 'https://drop-realtime-web.vercel.app',
    repoUrl: 'https://github.com/sudo-marco-dev/DROP_Realtime_web',
    embeddable: true,
    statusLabel: 'Live Preview',
    cadShowcaseId: 'drop-v2-cad',
    cadLabel: '3D Console',
  },
  {
    title: 'Electricity Tracker',
    kind: 'Utility · Next.js 16 + Recharts',
    summary: 'kWh cost calculator, billing-cycle analytics, and printable slips synced with Google Sheets.',
    stack: ['Next.js 16', 'Tailwind v4', 'Recharts', 'Google Sheets API'],
    repoUrl: 'https://github.com/sudo-marco-dev/My_Electricity_Tracker',
    embeddable: false,
    statusLabel: 'Private Vercel',
  },
  {
    title: 'PSUSphere Dockerized',
    kind: 'Containerized Web · Django',
    summary: 'Dockerized Python/Django campus platform packaged with Docker Compose and published to Docker Hub.',
    stack: ['Python', 'Django', 'Docker', 'SCSS'],
    repoUrl: 'https://github.com/sudo-marco-dev/PSUShere_Docker',
    embeddable: false,
    statusLabel: 'Source + Docker Hub',
  },
  {
    title: 'nRFBox VOID Version',
    kind: 'Embedded RF Lab · ESP32',
    summary: 'Customized open-source ESP32 hardware tool exploring 2.4GHz, BLE, and Wi-Fi wireless diagnostics.',
    stack: ['ESP32', 'C', '2.4GHz / BLE'],
    repoUrl: 'https://github.com/sudo-marco-dev/nRFBox_VOID_version',
    embeddable: false,
    statusLabel: 'Hardware Repo',
  },
];

export const SHOWCASE_GALLERY: ShowcaseItem[] = [
  // ── 3D MODELS (6 Interactive GLB Assemblies with Studio Previews) ─────────────
  {
    id: 'rtnhs-qr-scanner-cad',
    category: '3d-models',
    categoryLabel: '3D Models',
    title: 'RTNHS QR Scanner Enclosure',
    caption:
      'Multi-part Onshape CAD assembly for the Rio Tuba NHS QR attendance scanner, housing the OLED screen, phone mount, and student ID slot. Rotate, toggle parts, or inspect inside in 3D.',
    tools: 'Onshape Cloud CAD · Interactive 3D',
    imageSrc: '/models/thumbs/rtnhs-qr-scanner-dark.jpg',
    lightImageSrc: '/models/thumbs/rtnhs-qr-scanner-light.jpg',
    suggestedPath: 'apps/web/public/models/qr-scanner-complete.glb',
    modelSrc: '/models/qr-scanner-complete.glb',
    partCount: 6,
    modelConfig: {
      outerParts: ['Front cover', 'Main housing'],
      presets: [
        { key: 'assembled', label: 'Assembled', hiddenParts: [] },
        { key: 'scanner-only', label: 'Scanner Only', hiddenParts: ['Mock Student ID', 'Mock Phone'] },
        { key: 'see-inside', label: 'See Inside', hiddenParts: ['Front cover'] },
        { key: 'xray', label: 'X-Ray', hiddenParts: [], xray: true },
      ],
    },
  },
  {
    id: 'smart-house-cad',
    category: '3d-models',
    categoryLabel: '3D Models',
    title: 'Modular Smart House Prototype',
    caption:
      'Rapid-turnaround client commission for an embedded systems final project, engineered into 8 modular walls, floors, and roofs so the entire structure prints in one day and assembles cleanly around wiring.',
    tools: 'Onshape CAD · Client Commission',
    imageSrc: '/models/thumbs/smart-house-dark.jpg',
    lightImageSrc: '/models/thumbs/smart-house-light.jpg',
    suggestedPath: 'apps/web/public/models/smart-house-enclosure.glb',
    modelSrc: '/models/smart-house-enclosure.glb',
    partCount: 8,
    modelConfig: {
      outerParts: ['front roof', 'back roof', 'terrace roof', 'left wall', 'front wall', 'back wall', 'right wall'],
      presets: [
        { key: 'assembled', label: 'Assembled', hiddenParts: [] },
        { key: 'roof-off', label: 'Roof Off', hiddenParts: ['front roof', 'back roof', 'terrace roof'] },
        {
          key: 'floor-plan',
          label: 'Floor Plan',
          hiddenParts: ['front roof', 'back roof', 'terrace roof', 'front wall', 'left wall'],
        },
        { key: 'xray', label: 'X-Ray', hiddenParts: [], xray: true },
      ],
      partLabels: {
        'front roof': 'Front Roof',
        'back roof': 'Back Roof',
        'left wall': 'Left Wall',
        'front wall': 'Front Wall',
        floor: 'Base Floor',
        'terrace roof': 'Terrace Roof',
        'back wall': 'Back Wall',
        'right wall': 'Right Wall',
      },
    },
  },
  {
    id: 'wand-scanner-cad',
    category: '3d-models',
    categoryLabel: '3D Models',
    title: 'Handheld Wand Scanner Enclosure',
    caption:
      'Client commission converting a hand-built Sintra-board scanner prototype into a custom 4-part 3D-printable shell, matching exact ESP32, LCD, RF sensor, and battery clearances.',
    tools: 'Onshape CAD · Client Commission',
    imageSrc: '/models/thumbs/handheld-wand-scanner-dark.jpg',
    lightImageSrc: '/models/thumbs/handheld-wand-scanner-light.jpg',
    suggestedPath: 'apps/web/public/models/handheld-wand-scanner.glb',
    modelSrc: '/models/handheld-wand-scanner.glb',
    partCount: 4,
    modelConfig: {
      initialCamera: [3.3, 1.2, 3.8],
      outerParts: ['lid', 'battery lid', 'case'],
      presets: [
        { key: 'assembled', label: 'Assembled', hiddenParts: [] },
        { key: 'open-covers', label: 'Open Covers', hiddenParts: ['lid', 'battery lid'] },
        { key: 'xray', label: 'X-Ray', hiddenParts: [], xray: true },
      ],
      partLabels: {
        lid: 'Top Lid',
        handel: 'Ergonomic Handle',
        'battery lid': 'Battery Cover',
        case: 'Main Shell',
      },
    },
  },
  {
    id: 'registration-terminal-cad',
    category: '3d-models',
    categoryLabel: '3D Models',
    title: 'Desktop Registration Terminal',
    caption:
      'Companion two-piece tabletop enclosure commissioned alongside the handheld wand scanner, split into a top housing and bottom mounting panel for fast printing and servicing.',
    tools: 'Onshape CAD · Client Commission',
    imageSrc: '/models/thumbs/registration-terminal-dark.jpg',
    lightImageSrc: '/models/thumbs/registration-terminal-light.jpg',
    suggestedPath: 'apps/web/public/models/registration-terminal.glb',
    modelSrc: '/models/registration-terminal.glb',
    partCount: 2,
    modelConfig: {
      initialCamera: [2.3, 2.6, 2.9],
      outerParts: ['top case'],
      presets: [
        { key: 'assembled', label: 'Assembled', hiddenParts: [] },
        { key: 'open-shell', label: 'Open Shell', hiddenParts: ['top case'] },
        { key: 'xray', label: 'X-Ray', hiddenParts: [], xray: true },
      ],
      partLabels: {
        'top case': 'Top Enclosure',
        'bottom pannel': 'Bottom Panel',
      },
    },
  },
  {
    id: 'drop-v1-cad',
    category: '3d-models',
    categoryLabel: '3D Models',
    title: 'D.R.O.P. Control Panel (V1)',
    caption:
      'First CAD revision for the smart parcel drop-box keypad and status readout, designed as a compact base case with a removable control faceplate.',
    tools: 'Fusion 360 · Hardware Rev 01',
    imageSrc: '/models/thumbs/drop-v1-dark.jpg',
    lightImageSrc: '/models/thumbs/drop-v1-light.jpg',
    suggestedPath: 'apps/web/public/models/drop-v1.glb',
    modelSrc: '/models/drop-v1.glb',
    partCount: 2,
    modelConfig: {
      outerParts: ['Case'],
      presets: [
        { key: 'assembled', label: 'Assembled', hiddenParts: [] },
        { key: 'remove-panel', label: 'Remove Panel', hiddenParts: ['Front Pannel'] },
        { key: 'xray', label: 'X-Ray', hiddenParts: [], xray: true },
      ],
      partLabels: {
        case: 'Enclosure Case',
        'front pannel': 'Front Control Panel',
      },
    },
  },
  {
    id: 'drop-v2-cad',
    category: '3d-models',
    categoryLabel: '3D Models',
    title: 'D.R.O.P. Angled Console (V2)',
    caption:
      'Second-revision angled console modeled in Fusion 360 prior to adopting Onshape, combining separate front faceplate and rear housing exports into one unified 3D assembly.',
    tools: 'Fusion 360 · Hardware Rev 02',
    imageSrc: '/models/thumbs/drop-v2-dark.jpg',
    lightImageSrc: '/models/thumbs/drop-v2-light.jpg',
    suggestedPath: 'apps/web/public/models/drop-v2-front.glb',
    modelSrc: '/models/drop-v2-front.glb',
    partCount: 2,
    modelConfig: {
      initialCamera: [-2.4, 2.2, -3.0],
      partSources: [
        { src: '/models/drop-v2-back.glb', label: 'Rear Housing Body' },
        { src: '/models/drop-v2-front.glb', label: 'Angled Front Panel' },
      ],
      outerParts: ['Rear Housing Body', 'Angled Front Panel'],
      presets: [
        { key: 'assembled', label: 'Assembled', hiddenParts: [] },
        { key: 'remove-panel', label: 'Remove Panel', hiddenParts: ['Angled Front Panel'] },
        { key: 'xray', label: 'X-Ray', hiddenParts: [], xray: true },
      ],
    },
  },

  // ── 3D PRINTS (Real Fabrication Photos) ──────────────────────────────────────
  {
    id: 'print-rtnhs-final',
    category: '3d-prints',
    categoryLabel: '3D Prints',
    title: 'RTNHS QR Scanner (Finished Build)',
    caption:
      'Final 3D-printed and assembled RTNHS attendance terminal running live OLED status readouts (`W:OK .152`) and real-time student scan feedback.',
    tools: 'Flashforge Creator 3 · OLED + ESP32-CAM',
    imageSrc: '/showcase/rtnhs-scanner-final.jpg',
    suggestedPath: 'apps/web/public/showcase/rtnhs-scanner-final.jpg',
  },
  {
    id: 'print-smart-house',
    category: '3d-prints',
    categoryLabel: '3D Prints',
    title: 'Rapid-Printed Modular Smart House',
    caption:
      'Black PLA print of an 8-part modular house commission, engineered for 1-day printing so the client could immediately wire their embedded sensors.',
    tools: 'Flashforge Creator 3 · Client Print',
    imageSrc: '/showcase/client-smart-house-print.jpg',
    suggestedPath: 'apps/web/public/showcase/client-smart-house-print.jpg',
  },
  {
    id: 'print-dual-nozzle-chess',
    category: '3d-prints',
    categoryLabel: '3D Prints',
    title: 'Dual-Nozzle Travel Chess Set',
    caption:
      'Complete interlocking travel chess board and cylindrical storage case printed in two-tone red and black to test and calibrate the Flashforge Creator 3 dual nozzles.',
    tools: 'Flashforge Creator 3 · Dual-Nozzle Test',
    imageSrc: '/showcase/dual-nozzle-chess-board.jpg',
    suggestedPath: 'apps/web/public/showcase/dual-nozzle-chess-board.jpg',
  },
  {
    id: 'print-build-plate-batch',
    category: '3d-prints',
    categoryLabel: '3D Prints',
    title: 'Creator 3 Multi-Piece Build Plate',
    caption:
      'Batch of multi-piece functional black housings printed side-by-side during dual-extruder calibration and print-bed workflow testing.',
    tools: 'Flashforge Creator 3 · Batch Print',
    imageSrc: '/showcase/creator3-build-plate.jpg',
    suggestedPath: 'apps/web/public/showcase/creator3-build-plate.jpg',
  },

  // ── WIRING & HARDWARE (Real Bench & Prototype Photos) ────────────────────────
  {
    id: 'wiring-rtnhs-live',
    category: 'hardware',
    categoryLabel: 'Wiring & Hardware',
    title: 'RTNHS Scanner & ID Scan Rig',
    caption:
      'Finished Rio Tuba NHS QR scanner mounted alongside the phone cradle, scanning a sample student ID QR badge live into the OLED display queue.',
    tools: 'ESP32-CAM · OLED · 3D Housing',
    imageSrc: '/showcase/rtnhs-scanner-scanning.jpg',
    suggestedPath: 'apps/web/public/showcase/rtnhs-scanner-scanning.jpg',
  },
  {
    id: 'wiring-wand-reference',
    category: 'hardware',
    categoryLabel: 'Wiring & Hardware',
    title: 'Client Sintra-Board Wiring Reference',
    caption:
      'Hand-built Sintra-board scanner prototype measured caliper-by-caliper (ESP32, I2C LCD, sensor PCB, battery bay) before drafting its 4-part CAD shell.',
    tools: 'ESP32 · I2C LCD · RF Module',
    imageSrc: '/showcase/wand-scanner-prototype-wiring.jpg',
    suggestedPath: 'apps/web/public/showcase/wand-scanner-prototype-wiring.jpg',
  },
  {
    id: 'wiring-crane-bench',
    category: 'hardware',
    categoryLabel: 'Wiring & Hardware',
    title: 'ESP32 3-Axis Stepper Wiring Bench',
    caption:
      'Clean breadboard and soldered wiring harness connecting an ESP32 to three stepper motor driver boards and an I2C LCD for our embedded systems 3-axis crane project.',
    tools: 'ESP32 · 3x Stepper Drivers · Soldering',
    imageSrc: '/showcase/crane-stepper-wiring.jpg',
    suggestedPath: 'apps/web/public/showcase/crane-stepper-wiring.jpg',
  },
  {
    id: 'wiring-crane-diorama',
    category: 'hardware',
    categoryLabel: 'Wiring & Hardware',
    title: '3-Axis Motorized Tower Crane',
    caption:
      'Embedded systems mini-project combining stepper-driven load lifting and tower swivel axes to master ESP32 GPIO control and multi-driver wiring.',
    tools: 'ESP32 · 3-Axis Steppers · Structural Rig',
    imageSrc: '/showcase/crane-3axis-prototype.jpg',
    suggestedPath: 'apps/web/public/showcase/crane-3axis-prototype.jpg',
  },

  // ── OFFLINE APPS (PSU Sales & Inventory System Captures) ─────────────────────
  {
    id: 'offline-pos-sales-pnl',
    category: 'offline-apps',
    categoryLabel: 'Offline Apps',
    title: 'POS Sales & Profit Analytics',
    caption:
      'Aggregates shift transactions in SQLite via Prisma by payment tender for rapid cashier closeouts, computing real-time COGS gross margin with one-click PDF and Excel exports.',
    tools: 'Next.js 14 · Prisma · SQLite',
    imageSrc: '/showcase/offline-pos-sales-pnl.png',
    suggestedPath: 'apps/web/public/showcase/offline-pos-sales-pnl.png',
  },
  {
    id: 'offline-pos-inventory',
    category: 'offline-apps',
    categoryLabel: 'Offline Apps',
    title: 'POS Inventory & Low-Stock Alerts',
    caption:
      'Runs inside atomic Prisma checkout transactions so every sale deducts SKU stock safely and flags items below reorder thresholds before supplies run out.',
    tools: 'SQLite · jsPDF · SheetJS',
    imageSrc: '/showcase/offline-pos-inventory.png',
    suggestedPath: 'apps/web/public/showcase/offline-pos-inventory.png',
  },
  {
    id: 'offline-pos-rankings',
    category: 'offline-apps',
    categoryLabel: 'Offline Apps',
    title: 'POS Product Performance Rankings',
    caption:
      'Groups completed order line items across reporting windows to separate high-turnover campus staples from slow stock tying up storage and capital.',
    tools: 'Prisma ORM · Analytics · Next.js 14',
    imageSrc: '/showcase/offline-pos-rankings.png',
    suggestedPath: 'apps/web/public/showcase/offline-pos-rankings.png',
  },
];

export const COMMUNITY_HIGHLIGHTS: CommunityHighlight[] = [
  {
    id: 'sui-builders-palawan',
    index: '01',
    badge: 'Team 2nd Place · Certificate',
    organizer: 'Sui · DICT MIMAROPA · YGG Pilipinas · Oct-Nov 2025',
    title: 'Sui Builders Program · Palawan Cohort',
    summary:
      'Completed a hands-on Web3 cohort taught in partnership with Sui, DICT, and YGG Pilipinas, learning Move smart contracts, coin/token minting, and deploying projects on Sui, contributing as a member of our 2nd Place group build.',
    highlights: [
      'Contributed as a team member to a 2nd Place (runner-up) group project building and minting on Sui Move',
      'Featured via an official @SuiCommunity_PH (Sui Philippines) repost during the program',
      'Earned verified Certificate of Completion signed by YGG Metaversity Co-Leads',
    ],
    coverSrc: '/events/sui-builders-stage.jpg',
    photos: [
      {
        src: '/events/sui-builders-stage.jpg',
        caption: 'Sui Builders Program Palawan main cohort session and live stage lecture.',
      },
      {
        src: '/events/sui-builders-team.jpg',
        caption: 'With teammates during the hands-on Sui Builders Palawan workshop sessions.',
      },
      {
        src: '/events/sui-builders-repost.jpg',
        caption: 'Official @SuiCommunity_PH repost highlighting our Day 1 Palawan cohort post.',
      },
    ],
    certificateId: 'sui-builders-palawan-2025',
    certificateLabel: 'View Certificate',
  },
  {
    id: 'pitbi-project-nexus',
    index: '02',
    badge: 'Live Demonstrator',
    organizer: 'PSU PITBI · Project Nexus Workshop · Apr 2026',
    title: 'Project Nexus: 3D Printing Beginner Course',
    summary:
      'Served as a live hardware and 3D printing demonstrator at Palawan State University PITBI, guiding beginners through practical CAD workflows, slicing setup, and live Flashforge Creator 3 runs.',
    highlights: [
      'Demonstrated live dual-nozzle setup and printing workflows on the Flashforge Creator 3',
      'Mentored student participants hands-on at workstations from 3D design basics to print readiness',
      'Showcased real dual-color printed prototypes and student-commissioned parts during the session',
    ],
    coverSrc: '/events/pitbi-nexus-mentoring.jpg',
    photos: [
      {
        src: '/events/pitbi-nexus-mentoring.jpg',
        caption: 'Guiding student attendees hands-on at laptops during the Project Nexus workshop at PSU PITBI.',
      },
      {
        src: '/events/pitbi-nexus-printer-demo.jpg',
        caption: 'Live Flashforge Creator 3 dual-nozzle demonstration inside the PITBI maker space.',
      },
      {
        src: '/events/pitbi-nexus-cipher-lab.jpg',
        caption: 'Project Nexus session room at PITBI featuring Cipher Lab on display alongside sample prints.',
      },
    ],
  },
  {
    id: 'cipher-lab-commissions',
    index: '03',
    badge: 'Co-Founder · Studio',
    organizer: 'Cipher Lab · Custom 3D, Hardware & Web Commissions',
    title: 'Cipher Lab · Rapid Prototyping & Design',
    summary:
      'Co-founded with a partner to take custom commissions across Onshape 3D modeling, rapid 3D printing, and full-stack web or embedded system builds for local clients and student researchers.',
    highlights: [
      'Turned rough client sketches and Sintra-board electronics into print-ready Onshape assemblies',
      'Delivered fast 1-day modular 3D-printed structures so student teams can focus on firmware & wiring',
      'Combined custom mechanical enclosures with web dashboards and POS/booking software commissions',
    ],
    coverSrc: '/events/pitbi-nexus-cipher-lab.jpg',
    photos: [
      {
        src: '/events/pitbi-nexus-cipher-lab.jpg',
        caption: 'Cipher Lab ("Deciphering your design needs") showcased during our PITBI live demonstration.',
      },
      {
        src: '/showcase/client-smart-house-print.jpg',
        caption: 'Rapid 1-day printed modular smart house commissioned for an embedded systems final project.',
      },
      {
        src: '/showcase/wand-scanner-prototype-wiring.jpg',
        caption: 'Converting a client’s hand-wired Sintra-board scanner prototype into a clean 3D-printable enclosure.',
      },
    ],
  },
];

export const CERTIFICATES: CertificateItem[] = [
  {
    id: 'sui-builders-palawan-2025',
    title: 'Sui Builders Program · Palawan Cohort',
    issuer: 'Sui · DICT MIMAROPA · Trabahong Digital · YGG Pilipinas',
    credentialType: 'Certificate of Completion · Team 2nd Place',
    date: '2025',
    summary:
      'Hands-on Web3 developer cohort covering core blockchain fundamentals, Move smart contract programming, token minting, and deploying group projects on Sui.',
    previewImage: '/certificates/sui-builders-palawan-preview.jpg',
  },
];

export const OFFERINGS = [
  {
    index: '01',
    title: 'Websites & Self-Managed Portals',
    plainEnglish:
      'Clean, fast mobile-first websites, product catalogs, POS/inventory tools, and booking systems that owners can easily update themselves.',
    techProof: 'Next.js · React · TypeScript · Supabase Auth & PostgreSQL · Vercel',
  },
  {
    index: '02',
    title: 'Smart Hardware & IoT Integration',
    plainEnglish:
      'Physical devices wired to live web dashboards and instant alerts, connecting sensors, cameras, and locks straight to phones and browsers.',
    techProof: 'ESP32 · ESP32-CAM · Stepper Drivers · Soldering · C/C++ · Realtime CDC',
  },
  {
    index: '03',
    title: '3D CAD Modeling & Cipher Lab Prints',
    plainEnglish:
      'Custom device enclosures, mounts, and rapid 1-day multi-part prototypes designed in Onshape and fabricated cleanly for clients and teams.',
    techProof: 'Onshape · Fusion 360 · Flashforge Creator 3 · Cipher Lab Co-Founder',
  },
] as const;

export const SIGNAL_FLOW_NODES = [
  {
    step: 'NODE 01',
    shortTitle: 'Onshape CAD',
    subtitle: 'Parametric fit',
    stageLabel: 'STAGE 01 · DIGITAL CAD TOLERANCES',
    tool: 'Measured Onshape Multi-Part Enclosures (Cipher Lab)',
    detail:
      'Every case begins from real component clearances (OLED windows, ESP32-CAM lens cutouts, switches, and snap-fit battery lids) exported to inspectable multi-part .GLB assemblies.',
    input: 'Sintra sketches & caliper specs',
    output: 'Multi-part .GLB + .STL plates',
    proof: 'RTNHS, Wand & House CAD',
  },
  {
    step: 'NODE 02',
    shortTitle: 'Creator 3 IDEX',
    subtitle: 'Dual-nozzle print',
    stageLabel: 'STAGE 02 · PITBI FABRICATION',
    tool: 'Flashforge Creator 3 Dual-Nozzle (PITBI @ PSU)',
    detail:
      'IDEX dual-extrusion workflows turn modular 8-part structures, functional brackets, and two-tone showcase prints around in 1 day, demonstrated live during Project Nexus.',
    input: 'Sliced modular plates (0.4mm)',
    output: 'Functional PLA / PETG parts',
    proof: '1-Day House & Chess Plates',
  },
  {
    step: 'NODE 03',
    shortTitle: 'ESP32 + Wiring',
    subtitle: 'Sensors & CAM',
    stageLabel: 'STAGE 03 · EMBEDDED FIRMWARE',
    tool: 'Soldered ESP32, Stepper Drivers & Camera Bridges',
    detail:
      'Custom power rails, soldered harnesses, OLED status displays, and C/C++ firmware connecting optical QR scanners, parcel drop-boxes, and 3-axis cranes over Wi-Fi.',
    input: 'ESP32-CAM, drivers & switches',
    output: 'HTTP / Realtime state events',
    proof: 'RTNHS Scanner & 3-Axis Crane',
  },
  {
    step: 'NODE 04',
    shortTitle: 'Next.js + Cloud',
    subtitle: 'Live telemetry',
    stageLabel: 'STAGE 04 · FULL-STACK SOFTWARE',
    tool: 'Next.js Dashboards, POS Ledgers & SMS Alerts',
    detail:
      'Production React & Next.js interfaces backed by Supabase PostgreSQL or Prisma SQLite delivering instant courtside scoring, role portals, and exportable PDF/Excel reports.',
    input: 'Hardware events & user input',
    output: 'Live UI, PDF/Excel & httpSMS',
    proof: 'PSU-SportsTrack & RTNHS',
  },
] as const;

export const TOOLKIT_GROUPS = [
  {
    heading: 'Frontend & UI',
    items: ['Next.js (14 / 16 App Router)', 'React (18 / 19) & Vite', 'TypeScript & JavaScript', 'Tailwind CSS (v3 / v4)', 'shadcn/ui & Radix UI', 'Motion & Recharts'],
  },
  {
    heading: 'Backend & Data',
    items: ['Supabase (Postgres, Auth, RLS)', 'Realtime CDC & Storage', 'Prisma ORM, SQLite & PL/pgSQL', 'Python & Django', 'Sui Move (Web3 Cohort)', 'Playwright E2E Testing'],
  },
  {
    heading: 'Hardware & IoT',
    items: ['ESP32 & ESP32-CAM (C/C++)', 'Circuit Soldering & Wiring', 'Stepper Drivers, Sensors & OLED', 'QR & Vision (jsQR / MediaPipe)', 'SMS Alerts (httpSMS)', 'Web Audio & Discord Webhooks'],
  },
  {
    heading: 'CAD, 3D & Ops',
    items: ['Onshape Cloud CAD & Fusion 360', 'Flashforge Creator 3 (Dual-Nozzle)', 'Cipher Lab (Co-Founder)', 'PITBI Student Demonstrator', 'Vercel, Docker & Domains', 'Git & Turborepo Monorepos'],
  },
] as const;

export const BSIT_TIMELINE = [
  {
    stage: 'FOUNDATIONS',
    title: 'Python, Security Drills & Sui Builders Palawan (Team 2nd Place)',
    detail: 'Built programming logic, Python CTF drills, and contributed as a team member to a 2nd Place group build in the Sui Builders Program Palawan cohort learning Move and Web3 app deployment.',
  },
  {
    stage: 'SYSTEMS & CONTAINERS',
    title: 'PSUSphere (Django + Docker)',
    detail: 'Containerized full-stack Python web services with Docker Compose and published reproducible images to Docker Hub.',
  },
  {
    stage: 'DATABASES & POS',
    title: 'PSU Sales & Inventory System',
    detail: 'Built a full-stack Next.js + Prisma + SQLite POS and inventory ledger with backup/restore APIs and exportable PDF/Excel reports for ADS finals.',
  },
  {
    stage: 'CLIENT + IOT + 3D LAB',
    title: 'RTNHS Attendance, Client Enclosures & Project Nexus Demo',
    detail: 'Delivered a multi-portal school attendance system with ESP32-CAM + SMS, co-founded Cipher Lab commissions, and led PITBI live 3D printing demos.',
  },
  {
    stage: '4TH-YEAR CAPSTONE',
    title: 'PSU-SportsTrack & Client Web Systems',
    detail: 'Engineered a multi-sport live scoring and athlete verification platform, now building custom web systems and hardware prototypes for clients.',
  },
] as const;
