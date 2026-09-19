"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import LiveBackground from "./LiveBackground";

/* Leaf and paw silhouettes */
const LEAF = "M12 1C6.5 5 3.5 11 5.2 17.2 6.3 21 9.6 23 12 23s5.7-2 6.8-5.8C20.5 11 17.5 5 12 1Z";
const LEAF_VEIN = "M12 4v18M12 10l-3.5-2.5M12 14l4-3M12 18l-3-2";
const LEAF_TINTS = ["#6f9a5a", "#9cb86b", "#c9a24e", "#5f8a6a"];

/* Deterministic pseudo-random so server and client agree */
const rnd = (i, salt) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Warm "garden light" backdrop for the cream sections:
 * drifting colour blooms, falling leaves, rising paw prints and pollen.
 * Only animates while near the viewport. Under reduced motion the blooms still
 * drift (slower); the falling leaves and rising paws are left out.
 */
export default function GardenBackground({ leaves = 8, paws = 5, pollen = 0.9 }) {
  const ref = useRef(null);
  const [h, setH] = useState(0);
  const near = useInView(ref, { margin: "200px 0px" });
  const reduce = useReducedMotion();
  const drift = near;             // soft colour blooms: everyone
  const live = near && !reduce;   // leaves + paws: full motion only

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setH(el.clientHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const blob = (dur) => ({ duration: reduce ? dur * 1.8 : dur, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" });

  return (
    <div ref={ref} className="garden-bg" aria-hidden="true">
      {/* drifting light blooms */}
      <motion.span
        className="garden-blob garden-blob--sage"
        animate={drift ? { x: [0, 90, -40], y: [0, -50, 40], scale: [1, 1.18, 0.94] } : undefined}
        transition={blob(24)}
      />
      <motion.span
        className="garden-blob garden-blob--gold"
        animate={drift ? { x: [0, -110, 30], y: [0, 60, -30], scale: [1, 0.9, 1.15] } : undefined}
        transition={blob(28)}
      />
      <motion.span
        className="garden-blob garden-blob--peach"
        animate={drift ? { x: [0, 60, -80], y: [0, 40, -60], scale: [1, 1.12, 0.96] } : undefined}
        transition={blob(32)}
      />

      <LiveBackground variant="forest" density={pollen} />

      {/* falling leaves */}
      {live && h > 0 &&
        Array.from({ length: leaves }, (_, i) => {
          const size = 16 + rnd(i, 1) * 20;
          const dur = 14 + rnd(i, 2) * 12;
          const delay = rnd(i, 3) * dur;
          const sway = 30 + rnd(i, 4) * 60;
          const spin = (rnd(i, 5) > 0.5 ? 1 : -1) * (160 + rnd(i, 6) * 260);
          return (
            <motion.svg
              key={`l${i}`}
              className="garden-leaf"
              viewBox="0 0 24 24"
              width={size}
              height={size}
              style={{ left: `${4 + rnd(i, 7) * 92}%` }}
              initial={{ y: -60, opacity: 0 }}
              animate={{
                y: [-60, h + 60],
                x: [0, sway, -sway * 0.6, sway * 0.4, 0],
                rotate: [0, spin],
                opacity: [0, 0.85, 0.85, 0.85, 0],
              }}
              transition={{
                y: { duration: dur, delay, repeat: Infinity, ease: "linear" },
                x: { duration: dur, delay, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: dur, delay, repeat: Infinity, ease: "linear" },
                opacity: { duration: dur, delay, repeat: Infinity, ease: "linear" },
              }}
            >
              <path d={LEAF} fill={LEAF_TINTS[i % LEAF_TINTS.length]} />
              <path d={LEAF_VEIN} fill="none" stroke="rgba(255,255,255,.45)" strokeWidth=".8" strokeLinecap="round" />
            </motion.svg>
          );
        })}

      {/* paw prints drifting upward */}
      {live && h > 0 &&
        Array.from({ length: paws }, (_, i) => {
          const dur = 9 + rnd(i, 8) * 6;
          return (
            <motion.svg
              key={`p${i}`}
              className="garden-paw"
              viewBox="0 0 24 24"
              width={26}
              height={26}
              style={{ left: `${8 + rnd(i, 9) * 84}%`, top: `${55 + rnd(i, 10) * 40}%`, rotate: `${-30 + rnd(i, 11) * 60}deg` }}
              initial={{ opacity: 0 }}
              animate={{ y: [0, -h * 0.35], opacity: [0, 0.32, 0], scale: [0.8, 1, 1] }}
              transition={{ duration: dur, delay: rnd(i, 12) * dur, repeat: Infinity, ease: "easeOut" }}
            >
              <g fill="#b98a3e">
                <ellipse cx="5" cy="8" rx="2" ry="3" />
                <ellipse cx="10" cy="5" rx="2" ry="3" />
                <ellipse cx="16" cy="5" rx="2" ry="3" />
                <ellipse cx="21" cy="9" rx="2" ry="3" />
                <path d="M6 18c0-3 3-7 6-7s7 4 7 7c0 4-4 1-7 1s-6 3-6-1Z" />
              </g>
            </motion.svg>
          );
        })}
    </div>
  );
}
