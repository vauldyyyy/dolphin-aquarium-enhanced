"use client";

import { motion } from "framer-motion";
import Nav from "../../components/Nav";
import Reveal from "../../components/Reveal";
import SiteFooter from "../../components/SiteFooter";

const WA = "https://wa.me/919953858521";

const GROUPS = [
  {
    id: "aquariums",
    title: "Designer & Custom Aquariums",
    tone: "content--cream",
    items: [
      ["Nano cube tank", "Aquarium", "Nano Cube Tank", "from ₹3,500"],
      ["2ft planted setup", "Aquarium", "2ft Planted Setup", "from ₹8,900"],
      ["4ft custom tank", "Custom Build", "4ft Custom Tank", "Quote"],
      ["Reef-ready system", "Marine", "Reef-Ready System", "Quote"],
    ],
  },
  {
    id: "fish",
    title: "Exotic & Ornamental Fish",
    tone: "content--sand",
    items: [
      ["Fancy goldfish", "Freshwater", "Fancy Goldfish", "from ₹150"],
      ["Betta (fighter)", "Freshwater", "Betta (Fighter)", "from ₹120"],
      ["Discus", "Premium", "Discus", "Quote"],
      ["Koi carp", "Pond", "Koi Carp", "Quote"],
    ],
  },
  {
    id: "plants",
    title: "Live Plants & Hardscape",
    tone: "content--cream",
    items: [
      ["Anubias nana", "Live Plant", "Anubias Nana", "from ₹120"],
      ["Java fern", "Live Plant", "Java Fern", "from ₹100"],
      ["Aqua soil", "Substrate", "Aqua Soil", "from ₹600"],
      ["Driftwood", "Hardscape", "Driftwood", "from ₹250"],
    ],
  },
  {
    id: "care",
    title: "Food, Accessories & Essentials",
    tone: "content--sand",
    warm: true,
    items: [
      ["Premium dog food", "Nutrition", "Premium Dog Food", "from ₹450"],
      ["Filtration systems", "Equipment", "Filtration Systems", "from ₹900"],
      ["Grooming essentials", "Grooming", "Grooming Essentials", "from ₹350"],
      ["Cages & aviaries", "Accessories", "Cages & Aviaries", "Quote"],
    ],
  },
];

export default function Shop() {
  return (
    <>
      <Nav staticLight />
      <main>
        <section className="page-top">
          <Reveal>
            <p className="crumbs">
              <a href="/">Home</a> / Shop
            </p>
            <p className="eyebrow eyebrow--gold">Our collections</p>
            <h1 className="display">Shop Aquariums, Fish &amp; Essentials</h1>
            <p className="content-lede">
              A curated selection from our Madgaon showroom. Prices are indicative — message us on
              WhatsApp for live availability, sizing and custom builds.
            </p>
          </Reveal>
        </section>

        {GROUPS.map((g) => (
          <section className={`content ${g.tone}`} id={g.id} key={g.id}>
            <div className="wrap">
              <Reveal>
                <h2 className="sec-title">{g.title}</h2>
              </Reveal>
              <div className="cards-4">
                {g.items.map(([banner, cat, name, price], i) => (
                  <Reveal
                    className={`pcard${g.warm ? " warm" : ""}`}
                    key={name}
                    delay={i * 0.08}
                    whileHover={{ y: -6, boxShadow: "0 22px 50px rgba(42,33,24,.14)" }}
                  >
                    <div className="banner">{banner}</div>
                    <div className="pb">
                      <span className="cat">{cat}</span>
                      <h3>{name}</h3>
                      <div className="prow">
                        <span className="price">{price}</span>
                        <motion.a
                          className="mini-btn"
                          href={WA}
                          target="_blank"
                          rel="noopener"
                          whileHover={{ borderColor: "#3fa65b", color: "#3fa65b" }}
                          whileTap={{ scale: 0.96 }}
                        >
                          Enquire
                        </motion.a>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
