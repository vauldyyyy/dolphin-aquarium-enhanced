"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 0.61, 0.36, 1];
const MESSAGES = ["Waking up the jungle", "Untangling the vines", "Feeding the fish", "Counting the parrots"];

/* The branch in the loader video (1120×630 source). It never moves across the
   clip, so the progress bar is pinned to it by mapping these coordinates
   through the same cover-fit the <video> uses. */
const VIDEO = { w: 1120, h: 630 };
const BRANCH = { x0: 356, x1: 898, cy: 390, h: 24 };

/**
 * Jungle loading screen: a looping forest video (animals playing around a
 * hanging branch) where the branch itself is the progress bar — it lights up
 * from left to right as the site loads.
 *
 * `progress` is the real load (0–100). The displayed value never runs ahead of
 * `minMs` of screen time, so the scene always gets a moment on screen.
 * `demo` loops the progress forever (for previewing via ?loader).
 */
export default function ForestLoader({ progress = 0, minMs = 3200, demo = false }) {
  const [shown, setShown] = useState(0);
  const [msg, setMsg] = useState(0);
  const [bar, setBar] = useState(null);
  const rootRef = useRef(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    const start = performance.now();
    const id = setInterval(() => {
      const el = performance.now() - start;
      const timed = demo ? ((el % (minMs + 1800)) / minMs) * 100 : (el / minMs) * 100;
      const v = demo ? timed : Math.min(progressRef.current, timed);
      setShown(Math.round(Math.max(0, Math.min(100, v))));
    }, 90);
    const m = setInterval(() => setMsg((i) => (i + 1) % MESSAGES.length), 1700);
    return () => {
      clearInterval(id);
      clearInterval(m);
    };
  }, [minMs, demo]);

  useEffect(() => {
    const place = () => {
      // the loader's own box (window.innerWidth would include the scrollbar)
      const W = rootRef.current?.clientWidth || window.innerWidth;
      const H = rootRef.current?.clientHeight || window.innerHeight;
      const s = Math.max(W / VIDEO.w, H / VIDEO.h);
      const ox = (W - VIDEO.w * s) / 2;
      const oy = (H - VIDEO.h * s) / 2;
      const pad = 18;
      const left = Math.max(pad, ox + BRANCH.x0 * s);
      const right = Math.min(W - pad, ox + BRANCH.x1 * s);
      setBar({ left, width: right - left, top: oy + BRANCH.cy * s, h: Math.max(10, BRANCH.h * s) });
    };
    place();
    window.addEventListener("resize", place, { passive: true });
    return () => window.removeEventListener("resize", place);
  }, []);

  const spring = { type: "spring", stiffness: 60, damping: 18 };

  return (
    <motion.div
      ref={rootRef}
      className="fl"
      role="status"
      aria-label={`Loading Dolphin Aquarium & Pets, ${shown}%`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <video
        className="fl-video"
        src="/loader/jungle.mp4"
        poster="/loader/jungle-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="fl-scrim" />

      <div className="fl-top">
        <motion.img
          className="fl-logo"
          src="/assets/logo-white.png"
          alt="Dolphin Aquarium & Pets"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        />
        <motion.p
          className="fl-tag"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          SINCE 1992 · MADGAON, GOA
        </motion.p>
      </div>

      {bar && (
        <motion.div
          className="fl-bar"
          style={{ left: bar.left, top: bar.top, width: bar.width, height: bar.h }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          aria-hidden="true"
        >
          <motion.div className="fl-fill" initial={{ width: 0 }} animate={{ width: `${shown}%` }} transition={spring}>
            <motion.span
              className="fl-tip"
              style={{ x: "50%", y: "-50%" }}
              animate={{ scale: [1, 1.35, 1], opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          {/* slides from left-aligned (0%) to right-aligned (100%) so it never leaves the screen */}
          <motion.span
            className="fl-pct"
            initial={{ left: "0%", x: "0%" }}
            animate={{ left: `${shown}%`, x: `-${shown}%` }}
            transition={spring}
          >
            {shown}%
          </motion.span>
        </motion.div>
      )}

      <div className="fl-bottom">
        <AnimatePresence mode="wait">
          <motion.span
            key={msg}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            {MESSAGES[msg]}…
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
