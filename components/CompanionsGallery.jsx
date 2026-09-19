"use client";

import { forwardRef, useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import Icon from "./Icon";
import SectionVideo from "./SectionVideo";
import SceneLayers from "./SceneLayers";
import CompanionQuiz from "./CompanionQuiz";
import { Words, Magnetic } from "./motionKit";
import { waLink } from "../lib/business";

const EASE = [0.22, 0.61, 0.36, 1];

const PETS = [
  { src: "/assets/golden-retriever.jpg", name: "Golden Retriever", kind: "dog", traits: "Gentle · Loyal · Family favourite" },
  { src: "/assets/husky.jpg", name: "Siberian Husky", kind: "dog", traits: "Energetic · Talkative · Adventurous" },
  { src: "/assets/persian-cat.jpg", name: "Persian Cat", kind: "cat", traits: "Calm · Affectionate · Regal" },
  { src: "/assets/cocker-spaniel.jpg", name: "Cocker Spaniel", kind: "dog", traits: "Cheerful · Loving · Playful" },
  { src: "/assets/weimaraner.jpg", name: "Weimaraner", kind: "dog", traits: "Graceful · Energetic · Devoted" },
  { src: "/assets/dalmatian.jpg", name: "Dalmatian", kind: "dog", traits: "Lively · Loyal · Athletic" },
  { src: "/assets/british-cat.jpg", name: "British Shorthair", kind: "cat", traits: "Easy-going · Quiet · Cuddly" },
  { src: "/assets/hamster.jpg", name: "Hamster", kind: "small", traits: "Curious · Tiny · Low-maintenance" },
  { src: "/assets/saint-bernard.jpg", name: "Saint Bernard", kind: "dog", traits: "Gentle giant · Patient · Devoted" },
  { src: "/assets/neapolitan.jpg", name: "Neapolitan Mastiff", kind: "dog", traits: "Protective · Calm · Loyal", pos: "62% 50%" },
];

const FILTERS = [
  { id: "all", label: "All companions", test: () => true },
  { id: "dog", label: "Dogs", test: (p) => p.kind === "dog" },
  { id: "cat", label: "Cats & small pets", test: (p) => p.kind !== "dog" },
];

const KIND_LABEL = { dog: "Dog", cat: "Cat", small: "Small pet" };

/* ------------------------------------------------------------------ */
/* forwardRef: AnimatePresence "popLayout" measures exiting children via ref */
const PetCard = forwardRef(function PetCard({ pet, index, canHover }, ref) {
  const [hover, setHover] = useState(false);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [9, -9]), { stiffness: 220, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 220, damping: 20 });
  const gx = useTransform(mx, (v) => `${v * 100}%`);
  const gy = useTransform(my, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,.38), rgba(255,255,255,0) 55%)`;

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    setHover(false);
    mx.set(0.5);
    my.set(0.5);
  };
  const open = canHover ? hover : true;

  return (
    <motion.article
      ref={ref}
      layout
      className="pet"
      initial={{ opacity: 0, y: 70, scale: 0.9, rotate: index % 2 ? 4 : -4, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      exit={{ opacity: 0, scale: 0.82, filter: "blur(8px)", transition: { duration: 0.28 } }}
      transition={{ duration: 0.85, delay: (index % 5) * 0.08, ease: EASE, layout: { type: "spring", stiffness: 260, damping: 30 } }}
    >
      {/* gentle idle float, offset per card */}
      <motion.div
        className="pet-float"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5 + (index % 3), repeat: Infinity, ease: "easeInOut", delay: index * 0.35 }}
      >
        <motion.div
          className="pet-card"
          style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
          onMouseMove={canHover ? onMove : undefined}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={reset}
          onFocus={() => setHover(true)}
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) reset(); }}
          whileHover={{ boxShadow: "0 34px 70px rgba(42,33,24,.32)" }}
        >
          <motion.img
            src={pet.src}
            alt={pet.name}
            loading="lazy"
            style={{ objectPosition: pet.pos || "50% 40%" }}
            animate={{ scale: hover ? 1.1 : 1.02 }}
            transition={{ duration: 0.8, ease: EASE }}
          />
          <motion.span className="pet-glare" style={{ background: glare }} animate={{ opacity: hover ? 1 : 0 }} />
          <span className="pet-tag">
            <Icon name="paw" size={13} />
            {KIND_LABEL[pet.kind]}
          </span>
          <div className="pet-info">
            <h3>{pet.name}</h3>
            <motion.div
              className="pet-more"
              initial={false}
              animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <p>{pet.traits}</p>
              <a
                href={waLink(`Hi! I'd love to know more about your ${pet.name}s.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask about them <Icon name="arrow" size={15} />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.article>
  );
});

/* ------------------------------------------------------------------ */
export default function CompanionsGallery() {
  const [filter, setFilter] = useState("all");
  const [canHover, setCanHover] = useState(true);
  const [quizOpen, setQuizOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mq.matches);
    const on = (e) => setCanHover(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const active = FILTERS.find((f) => f.id === filter);
  const shown = PETS.filter(active.test);

  return (
    <section className="gal has-live-bg amb-garden" id="gallery" data-nav="light" aria-label="A few of our companions">
      <SectionVideo name="gallery" scrim="light" scrimStrength={0.35} fallback={<SceneLayers preset="gallery" />} />
      <div className="amb-motes" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>

      <div className="wrap">
        <header className="gal-head">
          <motion.p
            className="gal-eyebrow"
            initial={{ opacity: 0, letterSpacing: "0.8em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.34em" }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <Icon name="paw" size={16} /> A FEW OF OUR COMPANIONS
          </motion.p>
          <Words className="gal-title" text="Raised with love" as={motion.h2} />
          <motion.svg
            className="gal-flourish"
            viewBox="0 0 220 24"
            aria-hidden="true"
            initial="hide"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.path
              d="M4 14C40 2 70 22 110 12S180 2 216 12"
              variants={{ hide: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 1.4, delay: 0.3, ease: EASE } } }}
            />
          </motion.svg>
          <motion.p
            className="gal-lede"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            Hand-selected dogs, cats and small pets — healthy, socialised and ready for home.
          </motion.p>

          <motion.div
            className="gal-filters"
            role="tablist"
            aria-label="Filter companions"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
          >
            {FILTERS.map((f) => {
              const on = f.id === filter;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={on}
                  aria-controls="gal-grid"
                  className={`gal-chip${on ? " is-on" : ""}`}
                  onClick={() => setFilter(f.id)}
                >
                  {on && <motion.span layoutId="galPill" className="gal-pill" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                  <span className="gal-chip-label">{f.label}</span>
                </button>
              );
            })}
          </motion.div>
        </header>

        <motion.div layout id="gal-grid" className="gal-grid" role="tabpanel">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <PetCard key={p.name} pet={p} index={i} canHover={canHover} />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="gal-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p>
            Looking for someone special? <span>Tell us who you&apos;re dreaming of — we&apos;ll help you find them.</span>
          </p>
          <Magnetic strength={0.25}>
            <motion.button
              className="gal-cta-btn"
              onClick={() => setQuizOpen(true)}
              whileHover={{ y: -3, boxShadow: "0 18px 40px rgba(201,154,74,.45)" }}
              whileTap={{ scale: 0.97 }}
            >
              <Icon name="paw" size={18} />
              Find my companion
              <Icon name="arrow" size={18} />
            </motion.button>
          </Magnetic>
          <CompanionQuiz open={quizOpen} onClose={() => setQuizOpen(false)} />
        </motion.div>
      </div>
    </section>
  );
}
