"use client";

import { motion } from "framer-motion";
import Nav from "../../components/Nav";
import Reveal from "../../components/Reveal";
import SiteFooter from "../../components/SiteFooter";
import WhatsAppFloat from "../../components/WhatsAppFloat";
import LiveBackground from "../../components/LiveBackground";
import { ScrollProgress, Words } from "../../components/motionKit";

const GUIDES = [
  ["Setting up your first aquarium", "Aquariums", "Your First Aquarium", "Tank size, placement, substrate, filtration and lighting — everything to know before adding water.", false],
  ["The nitrogen cycle", "Water Quality", "The Nitrogen Cycle", "Why you should never add fish on day one, and how to cycle your tank safely in 3–4 weeks.", false],
  ["How much to feed", "Feeding", "How Much to Feed", "Overfeeding is the #1 beginner mistake. The simple rule that keeps water clean and fish healthy.", false],
  ["Bringing home a puppy", "Dogs", "New Puppy Care", "Vaccinations, first-week routine, food transitions and parvovirus warning signs to watch for.", true],
  ["Caring for lovebirds", "Birds", "Lovebirds & Budgies", "Cage size, diet, companionship and the little things that keep pet birds happy and chirpy.", true],
  ["A beginner's planted tank", "Aquascaping", "Beginner Planted Tank", "Easy, low-maintenance plants, lighting and dosing for a lush aquascape without the fuss.", false],
];

export default function CareGuides() {
  return (
    <>
      <ScrollProgress />
      <Nav staticLight />
      <main>
        <section className="page-top has-live-bg">
          <LiveBackground variant="forest" density={0.8} />
          <Reveal className="wrap">
            <p className="crumbs">
              <a href="/">Home</a> / Care Guides
            </p>
            <p className="eyebrow eyebrow--gold">Learn with us</p>
            <Words className="display" text="Expert Care Guides" as={motion.h1} />
            <p className="content-lede">
              Three decades of hands-on knowledge, distilled into simple guides. New to fishkeeping
              or bringing home a pet? Start here — then visit us and we&apos;ll help in person.
            </p>
          </Reveal>
        </section>

        <section className="content content--cream">
          <div className="wrap">
            <div className="cards-3">
              {GUIDES.map(([banner, cat, title, desc, warm], i) => (
                <Reveal
                  className={`pcard${warm ? " warm" : ""}`}
                  key={title}
                  delay={(i % 3) * 0.1}
                  whileHover={{ y: -6, boxShadow: "0 22px 50px rgba(42,33,24,.14)" }}
                >
                  <div className="banner">{banner}</div>
                  <div className="pb">
                    <span className="cat">{cat}</span>
                    <h3>{title}</h3>
                    <p className="desc">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <p className="content-lede center" style={{ marginTop: 36 }}>
                Full written guides are coming soon. Want us to prioritise a topic?{" "}
                <a
                  href="https://wa.me/919953858521"
                  target="_blank"
                  rel="noopener"
                  style={{ color: "var(--leaf)", fontWeight: 600 }}
                >
                  Ask us on WhatsApp →
                </a>
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
