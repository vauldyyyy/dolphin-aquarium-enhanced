"use client";

import { motion } from "framer-motion";
import SectionVideo from "./SectionVideo";
import SceneLayers from "./SceneLayers";
import Icon from "./Icon";

const EASE = [0.22, 0.61, 0.36, 1];
const rise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/** "The heart of Dolphin" band — leads into the Visit section below it. */
export default function HeartSection() {
  return (
    <section className="hs has-live-bg" id="heart" data-nav="dark" aria-labelledby="hs-title">
      <SectionVideo name="heart" scrim="dark" scrimStrength={0.5} position="30% 70%" fallback={<SceneLayers preset="heart" />} />
      <motion.div
        className="wrap hs-inner"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.11 } } }}
      >
        {/* reveal on the wrapper, heartbeat on the inner — a child with its own
            `animate` stops inheriting the parent's variants */}
        <motion.div variants={rise}>
          <motion.span
            className="hs-symbol"
            aria-hidden="true"
            animate={{ scale: [1, 1.07, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon name="heart" size={27} strokeWidth={1} />
          </motion.span>
        </motion.div>
        <motion.p className="hs-eyebrow" variants={rise}>THE HEART OF DOLPHIN</motion.p>
        <motion.h2 id="hs-title" className="hs-title" variants={rise}>
          The magic isn&apos;t just what you see.
          <br />
          <em>It&apos;s how you&apos;re cared for.</em>
        </motion.h2>
        <motion.p className="hs-body" variants={rise}>
          A beautiful aquarium. A happy companion. Someone who takes the time to listen.
          <br />
          That&apos;s the world we want to share with you.
        </motion.p>
        <motion.div variants={rise}>
          <a className="hs-btn" href="#visit">
            Make a little room for wonder
            <Icon name="arrow" size={18} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
