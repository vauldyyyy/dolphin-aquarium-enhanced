"use client";

import { motion } from "framer-motion";
import Icon from "./Icon";
import LiveBackground from "./LiveBackground";

const EASE = [0.22, 0.61, 0.36, 1];
const rise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/** "The heart of Dolphin" closing band, ported from the Living Aquarium package. */
export default function HeartSection() {
  return (
    <div className="dolphin-site dolphin-site--plain" data-nav="dark">
      <LiveBackground variant="aqua" density={0.9} />
      <motion.section
        className="care-section wrap"
        id="heart"
        aria-labelledby="care-title"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.11 } } }}
      >
        {/* reveal on the wrapper, heartbeat on the inner — a child with its own
            `animate` stops inheriting the parent's variants */}
        <motion.div variants={rise}>
          <motion.div
            className="care-symbol"
            aria-hidden="true"
            animate={{ scale: [1, 1.07, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon name="heart" />
          </motion.div>
        </motion.div>
        <motion.p className="eyebrow" variants={rise}>THE HEART OF DOLPHIN</motion.p>
        <motion.h2 id="care-title" variants={rise}>
          The magic isn&apos;t just what you see.
          <br />
          <em>It&apos;s how you&apos;re cared for.</em>
        </motion.h2>
        <motion.p variants={rise}>
          A beautiful aquarium. A happy companion. Someone who takes the time to listen.
          <br />
          That&apos;s the world we want to share with you.
        </motion.p>
        <motion.div variants={rise}>
          <a className="button button-outline" href="#visit">
            Make a little room for wonder
            <Icon name="arrow" />
          </a>
        </motion.div>
      </motion.section>
    </div>
  );
}
