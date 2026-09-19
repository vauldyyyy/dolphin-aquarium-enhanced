"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav";
import Reveal from "../../components/Reveal";
import SiteFooter from "../../components/SiteFooter";
import WhatsAppFloat from "../../components/WhatsAppFloat";
import LiveBackground from "../../components/LiveBackground";
import { ScrollProgress, Words } from "../../components/motionKit";

const WA_NUMBER = "919953858521";
const waEnquire = (product, price) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hi Dolphin Aquarium & Pets! I'm interested in the *${product}* (${price}) from your website. Is it available, and can you share more details?`
  )}`;

const GROUPS = [
  {
    id: "aquariums",
    title: "Designer & Custom Aquariums",
    tone: "content--cream",
    items: [
      { name: "Nano Cube Tank", cat: "Aquarium", price: "from ₹3,500", img: "/assets/products/nano-cube.jpg", alt: "Nano cube aquarium with moss and red shrimp" },
      { name: "2ft Planted Setup", cat: "Aquarium", price: "from ₹8,900", img: "/assets/products/planted-2ft.jpg", alt: "Two-foot planted aquarium on a wooden cabinet" },
      { name: "4ft Custom Tank", cat: "Custom Build", price: "Quote", img: "/assets/products/custom-4ft.jpg", alt: "Four-foot custom aquarium with blue LED lighting" },
      { name: "Reef-Ready System", cat: "Marine", price: "Quote", img: "/assets/products/reef-system.jpg", alt: "Reef aquarium with live corals and a clownfish" },
    ],
  },
  {
    id: "fish",
    title: "Exotic & Ornamental Fish",
    tone: "content--sand",
    items: [
      { name: "Fancy Goldfish", cat: "Freshwater", price: "from ₹150", img: "/assets/products/goldfish.jpg", alt: "Fancy goldfish with flowing double tail" },
      { name: "Betta (Fighter)", cat: "Freshwater", price: "from ₹120", img: "/assets/products/betta.jpg", alt: "Red and blue halfmoon betta with flared fins" },
      { name: "Discus", cat: "Premium", price: "Quote", img: "/assets/products/discus.jpg", alt: "Three red-turquoise discus fish in a dark aquarium" },
      { name: "Koi Carp", cat: "Pond", price: "Quote", img: "/assets/products/koi.jpg", alt: "Koi carp with orange, white and black pattern" },
    ],
  },
  {
    id: "plants",
    title: "Live Plants & Hardscape",
    tone: "content--cream",
    items: [
      { name: "Anubias Nana", cat: "Live Plant", price: "from ₹120", img: "/assets/products/anubias.jpg", alt: "Potted Anubias nana aquarium plant" },
      { name: "Java Fern", cat: "Live Plant", price: "from ₹100", img: "/assets/products/java-fern.jpg", alt: "Java fern attached to driftwood" },
      { name: "Aqua Soil", cat: "Substrate", price: "from ₹600", img: "/assets/products/aqua-soil.jpg", alt: "Bag of aquascaping soil substrate" },
      { name: "Driftwood", cat: "Hardscape", price: "from ₹250", img: "/assets/products/driftwood.jpg", alt: "Twisted aquascaping driftwood piece" },
    ],
  },
  {
    id: "care",
    title: "Food, Accessories & Essentials",
    tone: "content--sand",
    warm: true,
    items: [
      { name: "Premium Dog Food", cat: "Nutrition", price: "from ₹450", img: "/assets/products/dog-food.jpg", alt: "Premium bag of dog food with a bowl of kibble" },
      { name: "Filtration Systems", cat: "Equipment", price: "from ₹900", img: "/assets/products/filtration.jpg", alt: "Modern aquarium canister filter with hoses" },
      { name: "Grooming Essentials", cat: "Grooming", price: "from ₹350", img: "/assets/products/grooming.jpg", alt: "Pet grooming kit with brushes and shampoo" },
      { name: "Cages & Aviaries", cat: "Accessories", price: "Quote", img: "/assets/products/aviary.jpg", alt: "Handcrafted bird aviary with a green parrot" },
    ],
  },
];

const FILTERS = [
  ["all", "Everything"],
  ["aquariums", "Aquariums"],
  ["fish", "Fish"],
  ["plants", "Plants & Hardscape"],
  ["care", "Food & Essentials"],
];

export default function Shop() {
  const [filter, setFilter] = useState("all");

  return (
    <>
      <ScrollProgress />
      <Nav staticLight />
      <main>
        <section className="page-top has-live-bg">
          <LiveBackground variant="forest" density={0.8} />
          <Reveal className="wrap">
            <p className="crumbs">
              <a href="/">Home</a> / Shop
            </p>
            <p className="eyebrow eyebrow--gold">Our collections</p>
            <Words className="display" text="Shop Aquariums, Fish & Essentials" as={motion.h1} />
            <p className="content-lede">
              A curated selection from our Madgaon showroom. Prices are indicative — message us on
              WhatsApp for live availability, sizing and custom builds.
            </p>
          </Reveal>
        </section>

        <section className="content content--cream shop-filter-bar">
          <div className="wrap">
            <div className="chip-row" role="tablist" aria-label="Filter products">
              {FILTERS.map(([id, label]) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={filter === id}
                  className={`chip${filter === id ? " chip--on" : ""}`}
                  onClick={() => setFilter(id)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {GROUPS.map((g) => {
          if (filter !== "all" && filter !== g.id) return null;
          return (
            <section className={`content ${g.tone}`} id={g.id} key={g.id}>
              <div className="wrap">
                <Reveal>
                  <h2 className="sec-title">{g.title}</h2>
                </Reveal>
                <motion.div className="cards-4" layout>
                  <AnimatePresence mode="popLayout">
                    {g.items.map((p, i) => (
                      <motion.div
                        key={p.name}
                        layout
                        initial={{ opacity: 0, y: 24, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.35, delay: i * 0.05 }}
                        whileHover={{ y: -6, boxShadow: "0 22px 50px rgba(42,33,24,.14)" }}
                        className={`pcard${g.warm ? " warm" : ""}`}
                      >
                        <div className="banner has-img">
                          <img src={p.img} alt={p.alt} loading="lazy" />
                        </div>
                        <div className="pb">
                          <span className="cat">{p.cat}</span>
                          <h3>{p.name}</h3>
                          <div className="prow">
                            <span className="price">{p.price}</span>
                            <motion.a
                              className="mini-btn"
                              href={waEnquire(p.name, p.price)}
                              target="_blank"
                              rel="noopener"
                              whileHover={{ borderColor: "#3fa65b", color: "#3fa65b" }}
                              whileTap={{ scale: 0.96 }}
                            >
                              Enquire
                            </motion.a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            </section>
          );
        })}
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
