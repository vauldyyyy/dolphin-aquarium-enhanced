"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Nav from "../../components/Nav";
import Reveal from "../../components/Reveal";
import SiteFooter from "../../components/SiteFooter";
import WhatsAppFloat from "../../components/WhatsAppFloat";
import SceneLayers from "../../components/SceneLayers";
import { ScrollProgress, Words } from "../../components/motionKit";
import { waLink } from "../../lib/business";
import { GROUPS, FILTERS } from "../../lib/catalog";

function enquiryFor(item) {
  return item.enquiry || `Hi Dolphin Aquarium & Pets! I'm interested in ${item.name}. Is it available, and can you share more details?`;
}

export default function Shop() {
  const [filter, setFilter] = useState("all");
  const [fishQuery, setFishQuery] = useState("");

  return (
    <>
      <ScrollProgress />
      <Nav staticLight />
      <main id="main">
        <section className="page-top has-live-bg">
          <SceneLayers preset="shop" />
          <Reveal className="wrap">
            <p className="crumbs"><a href="/">Home</a> / Shop</p>
            <p className="eyebrow eyebrow--gold">Our collections</p>
            <Words className="display" text="Shop Aquariums, Fish & Essentials" as={motion.h1} />
            <p className="content-lede">
              Discover designer aquariums, custom tanks, live fish, plants and care essentials.
              Message our Madgaon team for current availability and a tailored quote.
            </p>
          </Reveal>
        </section>

        <section className="content content--cream shop-filter-bar" aria-label="Shop categories">
          <div className="wrap">
            <div className="chip-row" role="group" aria-label="Filter products">
              {FILTERS.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={filter === id}
                  className={`chip${filter === id ? " chip--on" : ""}`}
                  onClick={() => setFilter(id)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {GROUPS.map((group) => {
          if (filter !== "all" && filter !== group.id) return null;
          const items = group.id === "fish"
            ? group.items.filter((item) => item.name.toLowerCase().includes(fishQuery.trim().toLowerCase()))
            : group.items;
          return (
            <section className={`content ${group.tone}`} id={group.id} key={group.id}>
              <div className="wrap">
                <Reveal>
                  <h2 className="sec-title">{group.title}</h2>
                  <p className="shop-group-intro">{group.intro}</p>
                </Reveal>
                {group.id === "fish" && (
                  <div className="shop-search">
                    <label htmlFor="fish-search">Find a fish</label>
                    <input id="fish-search" type="search" placeholder="Search arowana, gar, stingray…" value={fishQuery} onChange={(event) => setFishQuery(event.target.value)} />
                    <span>{items.length} listings</span>
                  </div>
                )}
                <div className="cards-4 shop-cards">
                  {items.map((item) => (
                    <article className={`pcard shop-card${group.warm ? " warm" : ""}`} key={item.name}>
                      <div className="banner has-img">
                        <img src={item.img} alt={item.imageNote ? `${item.name} — ${item.imageNote.toLowerCase()}` : item.name} loading="lazy" />
                      </div>
                      <div className="pb">
                        <span className="cat">{item.cat}</span>
                        <h3>{item.name}</h3>
                        {item.desc && <p className="desc">{item.desc}</p>}
                        {item.imageNote && <p className="shop-image-note">{item.imageNote}</p>}
                        <div className="prow">
                          {item.price && <span className="price">{item.price}</span>}
                          <a className="mini-btn" href={waLink(enquiryFor(item))} target="_blank" rel="noopener noreferrer">
                            {item.cta || "Enquire"}
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                {items.length === 0 && <p className="shop-no-results">No fish match that search. Try another name or contact us for help.</p>}
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
