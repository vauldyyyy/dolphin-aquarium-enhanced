const product = (name, cat, img, extra = {}) => ({ name, cat, img, ...extra });
const fish = (name, img, extra = {}) => product(name, "Live fish", `/assets/catalog/${img}.jpg`, { imageNote: "Representative photo", ...extra });
const fishIllustration = (name, img) => fish(name, img, { img: `/assets/catalog/${img}.png`, imageNote: "Illustrative image" });

const customTanks = Array.from({ length: 10 }, (_, index) => {
  const feet = index + 1;
  return product(`${feet} ft Custom Tank`, "Custom tank", [
    "/assets/products/nano-cube.jpg",
    "/assets/products/planted-2ft.jpg",
    "/assets/products/custom-4ft.jpg",
    "/assets/products/reef-system.jpg",
  ][index % 4], {
    desc: "Includes a shade, filter and light. Built to your space and preferred finish.",
    cta: "Customize",
    enquiry: `Hi Dolphin Aquarium & Pets! I'd like to customize a ${feet} ft tank with a shade, filter and light. Please share the options and a quote.`,
  });
});

export const GROUPS = [
  {
    id: "aquariums",
    title: "Designer Tanks",
    intro: "Explore our designer setups, or ask us to build a tank for your space.",
    tone: "content--cream",
    items: [
      product("Nano Cube Tank", "Designer tank", "/assets/products/nano-cube.jpg", { price: "from ₹3,500" }),
      product("2 ft Planted Setup", "Designer tank", "/assets/products/planted-2ft.jpg", { price: "from ₹8,900" }),
      product("4 ft Custom Tank", "Custom build", "/assets/products/custom-4ft.jpg"),
      product("Reef-Ready System", "Marine", "/assets/products/reef-system.jpg"),
    ],
  },
  {
    id: "custom-tanks",
    title: "Custom Tanks · 1–10 ft",
    intro: "Every size includes a shade, filter and light. Photos show example setups; we will tailor your build.",
    tone: "content--sand",
    items: customTanks,
  },
  {
    id: "fish",
    title: "Live Fish",
    intro: "Ask us about current availability, exact size and care requirements. Photos are representative, not images of the fish currently in stock.",
    tone: "content--cream",
    items: [
      product("Fancy Goldfish", "Live fish", "/assets/products/goldfish.jpg"),
      product("Betta (Fighter)", "Live fish", "/assets/products/betta.jpg"),
      product("Discus", "Live fish", "/assets/products/discus.jpg"),
      product("Koi Carp", "Live fish", "/assets/products/koi.jpg"),
      fishIllustration("Silver Arowana · 5–6 in", "silver-arowana-illustration"),
      fishIllustration("Silver Arowana · 7–8 in", "silver-arowana-illustration"),
      fishIllustration("Silver Arowana · 8–12 in", "silver-arowana-illustration"),
      fish("Albino Silver Arowana · 3 in", "albino-arowana", { img: "/assets/catalog/albino-arowana.png", imageNote: "Illustrative image" }),
      fish("Albino Silver Arowana · 7–8 in", "albino-arowana", { img: "/assets/catalog/albino-arowana.png", imageNote: "Illustrative image" }),
      fish("Albino Silver Arowana · 8–12 in", "albino-arowana", { img: "/assets/catalog/albino-arowana.png", imageNote: "Illustrative image" }),
      fishIllustration("RTG Arowana", "rtg-arowana"),
      fishIllustration("Super Red Chili Arowana", "red-arowana-illustration"),
      fishIllustration("Electric Blue Crossback Arowana", "blue-crossback"),
      fishIllustration("High Back Arowana", "rtg-arowana"),
      fishIllustration("24K Gold Arowana", "gold-arowana-illustration"),
      fishIllustration("Indo Super Red Arowana", "red-arowana-illustration"),
      fishIllustration("Golden Crossback Arowana", "gold-arowana-illustration"),
      fishIllustration("24K Blue Base Arowana · 15 in", "blue-crossback"),
      fishIllustration("Hybrid Stingray", "hybrid-stingray"),
      fish("L-Series Pleco", "pleco"),
      fish("Altum Angel", "altum-angel"),
      fish("Wide Bar Silver Dollar", "wide-bar-dollar"),
      fish("Royal Clown Knife", "royal-knife"),
      fishIllustration("Red Tail Barracuda", "red-tail-barracuda"),
      fish("Red Pike", "red-pike"),
      fishIllustration("Balloon Tinfoil", "balloon-tinfoil"),
      fishIllustration("Banded Leporinus", "banded-leporinus"),
      fish("American Flagtail · 8 in", "flagtail"),
      fish("American Flagtail · 6 in", "flagtail"),
      fish("American Flagtail · 3 in", "flagtail"),
      fish("Albino Alligator Gar", "albino-gar", { img: "/assets/catalog/albino-gar.png", imageNote: "Illustrative image" }),
      fish("Alligator Gar", "alligator-gar"),
      fish("Aba Aba", "aba-aba"),
      fish("Tiger Shovelnose Catfish", "shovelnose"),
      fishIllustration("Leopard Shovelnose Catfish", "leopard-shovelnose"),
    ],
  },
  {
    id: "plants",
    title: "Live Plants & Hardscape",
    intro: "Anubias varieties and aquascaping essentials for planted tanks.",
    tone: "content--sand",
    items: [
      product("Anubias Nana", "Anubias", "/assets/products/anubias.jpg"),
      product("Anubias Nana Petite", "Anubias", "/assets/products/anubias.jpg"),
      product("Anubias Barteri", "Anubias", "/assets/products/anubias.jpg"),
      product("Anubias Coffeefolia", "Anubias", "/assets/products/anubias.jpg"),
      product("Anubias Congensis", "Anubias", "/assets/products/anubias.jpg"),
      product("Anubias Hastifolia", "Anubias", "/assets/products/anubias.jpg"),
      product("Anubias Gracilis", "Anubias", "/assets/products/anubias.jpg"),
      product("Anubias Heterophylla", "Anubias", "/assets/products/anubias.jpg"),
      product("Java Fern", "Live plant", "/assets/products/java-fern.jpg"),
      product("Aqua Soil", "Substrate", "/assets/products/aqua-soil.jpg"),
      product("Driftwood", "Hardscape", "/assets/products/driftwood.jpg"),
    ],
  },
  {
    id: "care",
    title: "Care & Essentials",
    intro: "Equipment and practical care, including cages made for your space.",
    tone: "content--cream",
    warm: true,
    items: [
      product("Tank & Pond Maintenance", "Aquarium care", "/assets/aquarium.jpg", { desc: "Cleaning, filtration and water care for tanks and ponds." }),
      product("Filtration Systems", "Equipment", "/assets/products/filtration.jpg", { price: "from ₹900", desc: "Find a filter that suits your tank or pond." }),
      product("Grooming Essentials", "Grooming", "/assets/products/grooming.jpg", { price: "from ₹350", desc: "Tools and essentials for everyday pet care." }),
      product("Customize Your Cages", "Custom build", "/assets/products/aviary.jpg", {
        desc: "Tell us the animal, measurements and features you need.",
        cta: "Customize",
        enquiry: "Hi Dolphin Aquarium & Pets! I'd like to customize a cage. Please help me with sizing, design options and a quote.",
      }),
    ],
  },
];

export const FILTERS = [
  ["all", "Everything"],
  ["aquariums", "Designer Tanks"],
  ["custom-tanks", "Custom Tanks"],
  ["fish", "Live Fish"],
  ["plants", "Plants & Hardscape"],
  ["care", "Care & Essentials"],
];
