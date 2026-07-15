window.GALLERY_ITEMS = [
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `5-line-laser-0${i + 1}`,
    title: `Laser Level ${String(i + 1).padStart(2, "0")}`,
    type: "DIY(Laser Level)",
    description: "Laser level product image.",
    image: `./assets/images/5-line-laser-0${i + 1}.png`,
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `dough-mixer-0${i + 1}`,
    title: `Dough Mixer ${String(i + 1).padStart(2, "0")}`,
    type: "Small Appliances(Dough Mixer)",
    description: "Dough mixer product image.",
    image: `./assets/images/dough-mixer-0${i + 1}.png`,
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `solar-lamp-0${i + 1}`,
    title: `Solar-powered Lights ${String(i + 1).padStart(2, "0")}`,
    type: "DIY(Solar-powered Lights)",
    description: "Solar-powered lights product image.",
    image: `./assets/images/solar-lamp-0${i + 1}.png`,
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `air-pump-0${i + 1}`,
    title: `Inflator ${String(i + 1).padStart(2, "0")}`,
    type: "Automotive(Inflator)",
    description: "Inflator product image.",
    image: `./assets/images/air-pump-0${i + 1}.png`,
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `food-warmer-0${i + 1}`,
    title: `Food Warmer ${String(i + 1).padStart(2, "0")}`,
    type: "Small Appliances/Homeware, Furniture(Food Warmer)",
    description: "Food warmer product image.",
    image: `./assets/images/food-warmer-0${i + 1}.png`,
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `air-fryer-0${i + 1}`,
    title: `Fryer ${String(i + 1).padStart(2, "0")}`,
    type: "Small Appliances(Fryer)",
    description: "Fryer product image.",
    image: `./assets/images/air-fryer-0${i + 1}.png`,
  })),
];
