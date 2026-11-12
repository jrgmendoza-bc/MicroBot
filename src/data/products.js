const img = (folder, file) => `assets/images/Products/${folder}/${file}`;

export const LINKS = {
  shopee: "https://shopee.ph/microbot.ph",
  facebook: "https://www.facebook.com/microbot.ph",
  email: "microbot.ph@gmail.com",
  gmailCompose: "https://mail.google.com/mail/?view=cm&fs=1&to=microbot.ph@gmail.com",
  mailto: "mailto:microbot.ph@gmail.com",
};

export const PRODUCTS = [
  {
    id: "byou",
    name: "Build-Your-Own Uno",
    shortDescription:
      "Introducing the Build-Your-Own Arduino — a hands-on microcontroller kit designed to take learning beyond plug-and-play. Instead of buying a pre-assembled board, users build it themselves, gaining real-world electronics experience from the ground up.",
    fullDescription:
      "This board delivers the same functionality and compatibility as a standard Arduino-style development board — but with the added value of true hardware understanding. From soldering components to testing circuits, users don’t just program — they build the brain behind their projects. <br><br> This isn’t just a development board — it’s an experience. It bridges theory and practice, turning learners into builders and builders into innovators. <br><br> Build it. Program it. Understand it. Own it.",
    priceText: "₱412",
    images: [
      img("BYOU", "black.webp"),
      img("BYOU", "black-back.webp"),
      img("BYOU", "green.webp"),
      img("BYOU", "white.webp"),
    ],
    keyFeatures: [
      "ATMEGA328P microcontroller for UNO-compatible projects",
      "CH9340G USB-to-TTL interface for reliable serial programming",
      "LM7805 onboard regulation for stable 5V operation",
      "Hands-on board architecture for educational electronics",
    ],
    applications: [
      "Embedded systems and microcontroller classes",
      "Rapid robotics and sensor prototyping",
      "DIY automation projects and STEM workshops",
    ],
    shopeeLink:
      "https://shopee.ph/Build-Your-Own-Arduino-Uno-i.1638858368.48157353027?extraParams=%7B%22display_model_id%22%3A445652559827%2C%22model_selection_logic%22%3A3%7D",
    buyLink:
      "https://shopee.ph/Build-Your-Own-Arduino-Uno-i.1638858368.48157353027?extraParams=%7B%22display_model_id%22%3A445652559827%2C%22model_selection_logic%22%3A3%7D",
    documentation: "assets/docs/BYOU.pdf",
  },
  {
    id: "nano-expansion",
    name: "Nano Expansion Board",
    shortDescription:
      "Stop fighting messy wiring and start building smarter. This Arduino Expansion Board packs everything you need to power robotics and automation projects—cleanly and efficiently.",
    fullDescription:
      "Less clutter. More creativity. <br><br> Whether you're building robots, smart systems, or prototypes—this board helps you go from idea to reality, faster. <br><br> Nano Expansion Board provides organized wiring channels, motor driver support, and quick terminal access so your Nano-based robotics builds can move from wiring to testing faster.",
    priceText: "₱279",
    images: [
      img("Nano", "cutout.webp"),
      img("Nano", "board.webp"),
      img("Nano", "side.webp"),
      img("Nano", "parts.webp"),
      img("Nano", "pcb-front.webp"),
      img("Nano", "pcb-back.webp"),
    ],
    keyFeatures: [
      "Dual Motor Power - Drive two DC motors with the integrated TB6612FNG driver (1.2A continuous, 3.2A peak) for smooth, reliable motion.",
      "Plug-and-Play Servos - Connect up to 12 servos (D2–D13) with built-in 5V and GND—no extra wiring required.",
      "Clean, Stable Connections - Full GND rails on every I/O pin make sensor and module wiring simple and rock-solid.",
      "Expand Without Limits - Four I2C connectors let you easily add displays, sensors, and more—no splitters needed.",
      "Flexible Power Options - Run it via VIN (6–12V) or 5V input to suit your project.",
      "Built-in Buzzer Support - Add sound alerts instantly with a dedicated passive buzzer pin.",
    ],
    applications: [
      "Mini rover, Servo, and line-following robots",
      "Classroom electronics prototyping",
      "Fast hardware validation benches",
    ],
    shopeeLink:
      "https://shopee.ph/Nano-Expansion-Board-i.1638858368.53561381770?extraParams=%7B%22display_model_id%22%3A350990317283%2C%22model_selection_logic%22%3A3%7D",
    buyLink:
      "https://shopee.ph/Nano-Expansion-Board-i.1638858368.53561381770?extraParams=%7B%22display_model_id%22%3A350990317283%2C%22model_selection_logic%22%3A3%7D",
    documentation: "assets/docs/Nano Expansion.pdf",
  },
  {
    id: "rover-module",
    name: "Rover Robotics Module",
    shortDescription:
      "Introducing Rover, the ultimate robotics control module designed to make building mobile robots faster, cleaner, and smarter. Whether you’re a student, hobbyist, or robotics enthusiast, Rover combines all the essential interfaces and mounts in one compact platform.",
    fullDescription:
      "Rover isn’t just a module — it’s a platform that simplifies robotics, letting you focus on programming, innovation, and experimentation rather than hardware headaches. <br><br> Build. Connect. Control. Innovate. With Rover, your robotic ideas come to life faster and smarter.",
    priceText: "₱349",
    images: [
      img("Rover", "cutout.webp"),
      img("Rover", "board.webp"),
      img("Rover", "side.webp"),
      img("Rover", "in-use.webp"),
      img("Rover", "pcb-front.webp"),
      img("Rover", "pcb-back.webp"),
    ],
    keyFeatures: [
      "Plug & Play Sensors – Connect up to 3 ultrasonic sensors and 7 IR sensors without messy wiring.",
      "Wireless Ready – Add Bluetooth or other wireless modules for remote control and telemetry.",
      "Custom Control – Use DIP switches and a tactile button for mode selection and manual triggers.",
      "Motor & Buzzer Support – Mount your TB6612FNG motor driver and an active buzzer for full robot control.",
      "Flexible Power – Switch between internal or external power safely with the built-in jumper.",
    ],
    applications: [
      "Remote controlled rover projects",
      "Autonomous robotics prototyping",
      "Sensor fusion and mobility experiments",
    ],
    shopeeLink:
      "https://shopee.ph/Rover-%E2%80%93-The-All-in-One-Robotics-Module-i.1638858368.47657348448?extraParams=%7B%22display_model_id%22%3A345990339852%2C%22model_selection_logic%22%3A3%7D",
    buyLink:
      "https://shopee.ph/Rover-%E2%80%93-The-All-in-One-Robotics-Module-i.1638858368.47657348448?extraParams=%7B%22display_model_id%22%3A345990339852%2C%22model_selection_logic%22%3A3%7D",
    documentation: "assets/docs/Rover.pdf",
  },
];

export const getProductById = (id) => PRODUCTS.find((p) => p.id === id) || null;

export const NEWS = [
  {
    image: "assets/images/News/news-byou.webp",
    alt: "Build-Your-Own Uno boards in green, black and white",
    productId: "byou",
    tag: "MB-01 · Build-Your-Own Uno",
    title: "Build-Your-Own Arduino – Learn by Building",
    copy: "Introducing the Build-Your-Own Arduino — a hands-on microcontroller kit designed to take learning beyond plug-and-play. Instead of buying a pre-assembled board, users build it themselves, gaining real-world electronics experience from the ground up.",
  },
  {
    image: "assets/images/News/news-rover.webp",
    alt: "Rover Robotics Module assembled with a Nano and motor driver",
    productId: "rover-module",
    tag: "MB-03 · Rover Robotics Module",
    title: "Rover – The All-in-One Robotics Module",
    copy: "Introducing Rover, the ultimate robotics control module designed to make building mobile robots faster, cleaner, and smarter. Whether you’re a student, hobbyist, or robotics enthusiast, Rover combines all the essential interfaces and mounts in one compact platform.",
  },
  {
    image: "assets/images/News/news-nano.webp",
    alt: "Nano Expansion Board with Nano and TB6612FNG motor driver",
    productId: "nano-expansion",
    tag: "MB-02 · Nano Expansion Board",
    title: "Nano Expansion Board - Build More. Wire Less. Create Faster.",
    copy: "Stop fighting messy wiring and start building smarter. This Arduino Expansion Board packs everything you need to power robotics and automation projects—cleanly and efficiently.",
  },
];

export const HERO_BANNERS = [
  { src: "assets/images/Hero/sumo.webp", pos: "40% 55%" },
  { src: "assets/images/Hero/rover.webp", pos: "50% 60%" },
  { src: "assets/images/Hero/nano-robot.webp", pos: "55% 50%" },
];

export const HERO_QUOTES = [
  "Engineering practical electronics and robotics modules designed for learning, prototyping, and real deployments.",
  "Advanced robotics and embedded electronics engineered for education, innovation, and real-world applications.",
  "Precision-built electronics and intelligent robotics platforms for makers, students, and engineers.",
  "Hands-on robotics systems and practical electronics crafted for experimentation, development, and deployment.",
  "Modern embedded technology and robotics solutions built for learning, rapid prototyping, and scalable projects.",
  "Reliable electronics and robotics modules designed to transform ideas into functional real-world systems.",
];

export const SERVICES = [
  {
    title: "Embedded Systems Development",
    copy: "Custom microcontroller-based systems tailored for automation, robotics, IoT, and intelligent devices.",
    icon: "chip",
  },
  {
    title: "Board-Level Circuit Design",
    copy: "From schematic design to PCB development, we engineer efficient and production-ready electronic hardware.",
    icon: "pcb",
  },
  {
    title: "Learning and Prototyping Platforms",
    copy: "Hands-on electronics kits and development boards that simplify embedded systems learning without sacrificing technical depth.",
    icon: "kit",
  },
  {
    title: "Website Development",
    copy: "Modern, responsive, and performance-focused websites engineered for businesses, technical projects, and digital platforms with clean UI, scalable architecture, and seamless user experience.",
    icon: "web",
  },
];

export const CONTACTS = [
  {
    title: "Email Us",
    copy: "For inquiries, support, partnerships, and bulk orders:",
    handle: "microbot.ph@gmail.com",
    href: LINKS.gmailCompose,
    icon: "mail",
  },
  {
    title: "Visit Our Shopee Store",
    copy: "Browse our latest electronics kits, modules, components, and educational products:",
    handle: "shopee.ph/microbot.ph",
    href: LINKS.shopee,
    icon: "bag",
  },
  {
    title: "Follow Us on Facebook",
    copy: "Stay updated with new product releases, tutorials, project ideas, and promotions:",
    handle: "fb.com/microbot.ph",
    href: LINKS.facebook,
    icon: "social",
  },
];

export const SHOWCASE = [
  { src: "assets/images/Showcase/sumo-side.webp", alt: "Sumo robot built with a Microbot controller", label: "SUMO.BOT", span: "wide" },
  { src: "assets/images/Showcase/sumo.webp", alt: "Top view of a completed sumo robot", label: "TOP.VIEW", span: "tall" },
  { src: "assets/images/Showcase/line-follower.webp", alt: "Line follower robot chassis with Nano controller", label: "LINE.FOLLOWER", span: "tall" },
  { src: "assets/images/Showcase/sumo-angle.webp", alt: "Sumo robot at an angle", label: "FIELD.TEST", span: "wide" },
];
