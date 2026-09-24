const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

// Central content + catalog data for EchelisAudio.
// Imagery is concept render — final product is still in development.

export const IMAGES = {
  heroIem: 'https://media.db.com/images/public/6aab6d05f219adb22d0d5108/5157af7b7_generated_image.png',
  productMain: 'https://media.db.com/images/public/6aab6d05f219adb22d0d5108/09a6c2f33_generated_image.png',
  engineeringMacro: 'https://media.db.com/images/public/6aab6d05f219adb22d0d5108/7c1115a63_generated_image.png',
  materials: 'https://media.db.com/images/public/6aab6d05f219adb22d0d5108/10f085cb1_generated_image.png',
};

export const categories = [
  { id: 'iems', label: 'IEMs', count: 1 },
  { id: 'cables', label: 'Cables', count: 0 },
  { id: 'ear-tips', label: 'Ear Tips', count: 0 },
  { id: 'accessories', label: 'Accessories', count: 0 },
  { id: 'limited-editions', label: 'Limited Editions', count: 0 },
];

export const products = [
  {
    slug: 'echelis-one-founders-edition',
    name: 'Echelis One',
    edition: 'Founders Edition',
    status: 'in-development',
    statusLabel: 'In Development',
    category: 'IEMs',
    tagline: 'A precision-tuned in-ear monitor built for listeners who want to disappear into the music.',
    price: null,
    image: IMAGES.productMain,
    gallery: [IMAGES.productMain, IMAGES.heroIem, IMAGES.engineeringMacro, IMAGES.materials],
    reservedPct: 84,
    tuningPhilosophy:
      'We are tuning Echelis One toward emotional honesty rather than spectacle. The goal is a signature that feels open and unforced — articulate in the mids, controlled and textured in the bass, and extended without fatigue up top. Every voicing decision is being validated by ear, not by graph alone.',
    shellDesign:
      'A comfort-first shell sculpted from ear impressions and refined through iterative 3D printing. The body is sized to sit flush within the concha, distributing pressure evenly so the monitor disappears during long sessions. Materials under evaluation include CNC-machined titanium and translucent resin.',
    cable:
      'A detachable cable with MMCX connectors is planned, using silver-plated Litz wire in a braided geometry. Detachability means the cable is replaceable and upgradeable — the monitor is built to last, not to be disposable.',
    driverArchitecture:
      'A multi-driver balanced armature architecture is under development, with a custom crossover designed to keep each driver working in its most linear range. The exact driver count and configuration remain subject to refinement as prototyping continues.',
    listeningProfile:
      'Intended for extended, intimate listening — vocal, acoustic, jazz, electronic, and well-produced modern recordings. A signature that rewards attention without demanding it.',
    specs: [
      { label: 'Type', value: 'In-ear monitor', tentative: false },
      { label: 'Driver architecture', value: 'Multi balanced armature (TBC)', tentative: true },
      { label: 'Crossover', value: 'Custom, 3-way (TBC)', tentative: true },
      { label: 'Frequency response', value: '20 Hz – 20 kHz (target)', tentative: true },
      { label: 'Impedance', value: 'To be confirmed', tentative: true },
      { label: 'Sensitivity', value: 'To be confirmed', tentative: true },
      { label: 'Shell material', value: 'Titanium / translucent resin (under evaluation)', tentative: true },
      { label: 'Connector', value: 'MMCX detachable', tentative: false },
      { label: 'Cable', value: 'Silver-plated Litz, braided', tentative: true },
      { label: 'Ear tips', value: 'Silicone + foam options included', tentative: false },
    ],
    story:
      'Echelis One began as a frustration with monitors that impress for five minutes and fatigue for fifty. We wanted something we could live inside of — honest, comfortable, and built with the patience of people who listen for a living. The Founders Edition is our first attempt, refined in the open with the people who care enough to follow along before it exists.',
    fitGuidance:
      'A proper seal is everything. We are designing the shell to accommodate a range of ear geometries, and the final package will include multiple ear tip sizes and materials. For the deepest, most consistent bass and best isolation, choose the largest tip that fits comfortably and creates a gentle seal without pressure.',
    whatsIncluded: [
      'Echelis One monitors (left + right)',
      'Detachable braided cable',
      'Ear tip kit (multiple sizes / materials)',
      'Protective carry case',
      'Cleaning tool',
      'Founders Edition serial card',
    ],
    faqs: [
      {
        q: 'When will Echelis One be available?',
        a: 'We are still in active development. Joining the early access list is the best way to hear about availability first — we will not open orders until we are confident in the product.',
      },
      {
        q: 'How much will it cost?',
        a: 'Pricing is not finalized. We are committed to delivering genuine value for a premium monitor and will share pricing with the early access list before public launch.',
      },
      {
        q: 'What does "Founders Edition" mean?',
        a: 'The Founders Edition is our first production run, reserved for early supporters. It will carry a distinct serial and is being shaped with feedback from the community.',
      },
      {
        q: 'Are the specifications final?',
        a: 'No. Any specification marked "TBC" or "subject to refinement" is still being validated through prototyping. We will publish confirmed specifications as they are locked.',
      },
    ],
  },
];

export const principles = [
  {
    title: 'Precision over spectacle',
    body: 'We tune for honesty, not for the demo room. A monitor should reveal what is in the recording — nothing more, nothing less.',
  },
  {
    title: 'Comfort is engineering',
    body: 'A monitor you take out after twenty minutes is a failed product. Fit, weight, and pressure are designed as carefully as the sound.',
  },
  {
    title: 'Built to be kept',
    body: 'Detachable cables, serviceable architecture, and materials chosen for longevity. We are building instruments, not disposables.',
  },
  {
    title: 'Open by default',
    body: 'We share the development process in public. Feedback from listeners shapes the product before it ever ships.',
  },
];

export const philosophy = [
  {
    title: 'Tuning by intention',
    body: 'We start from the feeling we want a recording to leave behind, then work backward toward the drivers, crossover, and shell. Measurements guide us, but the final decisions are made by ear.',
  },
  {
    title: 'Designed around the ear',
    body: 'The shell is derived from real ear geometry and refined through iteration. Comfort, seal, and isolation are not afterthoughts — they are part of the acoustic design.',
  },
  {
    title: 'From driver to detail',
    body: 'Each driver is kept in its most linear operating range by a custom crossover. The result is meant to be effortless: detail that is present without being pushed.',
  },
  {
    title: 'Prototype to performance',
    body: 'Every change is prototyped, measured, and listened to — then shared with the community. We ship only when the prototype and the intention agree.',
  },
];

export const explodedComponents = [
  {
    id: 'ear-tip',
    name: 'Ear Tip',
    spec: 'Medical-grade silicone',
    desc: 'The seal. Determines isolation, bass, and long-session comfort.',
  },
  {
    id: 'nozzle',
    name: 'Nozzle',
    spec: 'Stainless · Ø4.2 mm (TBC)',
    desc: 'The acoustic path between driver and ear. Length and bore shape the timbre.',
  },
  {
    id: 'shell',
    name: 'Shell',
    spec: 'CNC titanium + resin (TBC)',
    desc: 'The body. Engineered to sit flush and distribute pressure evenly.',
  },
  {
    id: 'chamber',
    name: 'Acoustic Chamber',
    spec: 'Precision internal volume',
    desc: 'The space the drivers breathe into. Volume tuning shapes the low end.',
  },
  {
    id: 'driver',
    name: 'Driver Array',
    spec: 'Balanced armature (TBC)',
    desc: 'The transducers. Each kept in its most linear range by the crossover.',
  },
  {
    id: 'cable',
    name: 'Cable Connection',
    spec: 'MMCX · silver litz',
    desc: 'The link. Detachable, replaceable, and built to be upgraded.',
  },
];

export const journalPosts = [
  {
    slug: 'why-we-tune-by-ear',
    title: 'Why we tune by ear, then measure',
    excerpt: 'Measurements describe a monitor. They do not decide it. Here is how we use both — and why the listening room comes first.',
    date: '2026-08-29',
    category: 'Tuning',
    readTime: '6 min',
    content: [
      'A frequency response curve is a map, not the territory. It tells you a great deal about a monitor, but it cannot tell you whether a vocal lands, whether a cymbal decays naturally, or whether a bass line feels grounded or merely loud.',
      'Our process begins in the listening room. We define the feeling we want a recording to leave behind — openness, weight, ease — and only then do we reach for the drivers, the crossover, and the shell. Measurements enter as a discipline: they keep us honest, reveal mistakes, and make our decisions repeatable.',
      'The temptation, especially early on, is to chase a curve that looks impressive. We have learned to be suspicious of that. A monitor that measures beautifully can still fatigue; a monitor that measures modestly can still disappear into the music. The ear is the final arbiter. The graph is the record.',
      'This is why every prototype is heard before it is approved — and why we share what we hear with the community as we go.',
    ],
  },
  {
    slug: 'the-case-for-detachable-cables',
    title: 'The case for detachable cables',
    excerpt: 'A cable is the most failure-prone part of any monitor. Detachability is not a luxury — it is an engineering decision about longevity.',
    date: '2026-07-14',
    category: 'Engineering',
    readTime: '4 min',
    content: [
      'If you have owned in-ear monitors long enough, you have lost a pair to a cable. It is the part that bends, pulls, and fatigues — and historically the part that turns a working instrument into waste.',
      'We see the cable as a serviceable component, not a permanent one. A detachable connector means a damaged cable is a fifteen-minute fix, not a funeral. It also means the monitor can grow with you: a different cable for a different source, an upgrade years down the line.',
      'The trade-off is a slightly more complex connector and a small cost in weight. We think that is the right trade. Built to be kept is not a slogan; it is a set of decisions like this one.',
    ],
  },
  {
    slug: 'building-in-public',
    title: 'Building in public: what it costs and what it buys',
    excerpt: 'We are developing our first monitor in the open. Here is what that actually means day to day — and why we think it makes a better product.',
    date: '2026-06-02',
    category: 'Behind the scenes',
    readTime: '5 min',
    content: [
      'Building in public is not a marketing strategy for us. It is a constraint. It means we cannot hide a bad prototype behind a polished render, and it means our decisions are exposed to people who care more about sound than we do.',
      'In practice it looks like this: we share prototypes, we share what we changed and why, and we ask the early access list real questions. Sometimes the answer is "we were wrong." That is the point.',
      'The cost is vulnerability and a slower-looking timeline. The benefit is a product that has been pressure-tested by the people who will actually use it before it ever reaches a shelf.',
    ],
  },
];

export const faqs = [
  {
    q: 'Is Echelis One available to buy right now?',
    a: 'No. Echelis One is in active development. You can join the early access list to be notified before public availability, and to help shape the final product.',
  },
  {
    q: 'What does joining the early access list get me?',
    a: 'Early visibility into development, the chance to give feedback, and priority access when pre-orders open. There is no obligation to purchase.',
  },
  {
    q: 'Are the specifications final?',
    a: 'No. Any specification marked "TBC" or "subject to refinement" is still being validated through prototyping. We will publish confirmed specifications as they are locked.',
  },
  {
    q: 'How much will Echelis One cost?',
    a: 'Pricing is not finalized. We will share pricing with the early access list before public launch.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'We plan to ship internationally at launch. Specific regions and rates will be confirmed closer to availability.',
  },
  {
    q: 'What is your return policy?',
    a: 'We are designing a fair return policy for in-ear monitors, including hygiene-safe handling. Full details will be published before orders open.',
  },
  {
    q: 'How can I give feedback during development?',
    a: 'Join the early access list and reply to our updates, or reach us through the contact page. We read everything.',
  },
];

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'How It Works', to: '/engineering' },
  { label: 'Journal', to: '/journal' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];