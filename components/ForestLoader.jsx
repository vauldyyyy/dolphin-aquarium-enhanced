"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 0.61, 0.36, 1];
const MESSAGES = ["Waking up the jungle", "Untangling the vines", "Feeding the fish", "Counting the parrots"];

/* The branch in the loader video (1280×720 source). It never moves across the
   clip, so the progress bar is pinned to it by mapping these coordinates
   through the same cover-fit the <video> uses. */
const VIDEO = { w: 1280, h: 720 };
const BRANCH = { x0: 372, x1: 914, cy: 390, h: 24 };

/* A vine that grows along the branch (drawn in the bar's own pixel space so
   leaves and flowers never stretch). */
function VineProgress({ w, h, p }) {
  const { d, leaves } = useMemo(() => {
    const mid = h / 2;
    const amp = h * 0.3;
    const wave = h * 1.15;
    // two sines so the twist is irregular, like a real vine
    const y = (x) => mid + Math.sin(x / wave) * amp * 0.8 + Math.sin(x / (wave * 0.37) + 1.3) * amp * 0.25;
    const rnd = (i, k) => {
      const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
      return v - Math.floor(v);
    };
    let path = `M0 ${y(0).toFixed(1)}`;
    for (let x = 4; x <= w; x += 4) path += ` L${x} ${y(x).toFixed(1)}`;
    const step = h * 1.5;
    const list = [];
    for (let x = step * 0.6, i = 0; x < w - 4; x += step, i++) {
      const up = rnd(i, 1) > 0.45;
      list.push({
        x: x + (rnd(i, 2) - 0.5) * step * 0.4,
        y: y(x),
        up,
        ang: (up ? -1 : 1) * (38 + rnd(i, 3) * 34) + (up ? 0 : 180),
        size: 0.75 + rnd(i, 4) * 0.5,
        flower: i % 5 === 2,
        at: x / w,
      });
    }
    return { d: path, leaves: list };
  }, [w, h]);
  const leaf = h * 0.62;
  const spring = { type: "spring", stiffness: 60, damping: 18 };

  return (
    <svg className="fl-vine" width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <defs>
        <linearGradient id="flLeaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8fae55" />
          <stop offset="1" stopColor="#46692a" />
        </linearGradient>
      </defs>
      <motion.path
        d={d} fill="none" stroke="#26391a" strokeWidth={Math.max(2.4, h * 0.17)} strokeLinecap="round" strokeOpacity=".5"
        initial={{ pathLength: 0 }} animate={{ pathLength: p }} transition={spring}
      />
      <motion.path
        d={d} fill="none" stroke="#6f9440" strokeWidth={Math.max(1.4, h * 0.09)} strokeLinecap="round" strokeOpacity=".92"
        initial={{ pathLength: 0 }} animate={{ pathLength: p }} transition={spring}
      />
      {leaves.map((l) => {
        const on = p >= l.at;
        return (
          <g key={l.x} transform={`translate(${l.x.toFixed(1)} ${l.y.toFixed(1)}) rotate(${l.ang.toFixed(1)}) scale(${l.size.toFixed(2)})`}>
            <motion.path
              d={`M0 0 C ${leaf * 0.3} ${-leaf * 0.42}, ${leaf * 0.8} ${-leaf * 0.46}, ${leaf} 0 C ${leaf * 0.7} ${leaf * 0.22}, ${leaf * 0.3} ${leaf * 0.2}, 0 0 Z`}
              fill="url(#flLeaf)"
              initial={{ scale: 0 }}
              animate={{ scale: on ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 15 }}
              style={{ originX: 0, originY: 0.5 }}
            />
            {l.flower && (
              <motion.g
                initial={{ scale: 0, rotate: -40 }}
                animate={{ scale: on ? 1 : 0, rotate: on ? 0 : -40 }}
                transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.15 }}
                style={{ originX: 0.5, originY: 0.5 }}
              >
                {[0, 72, 144, 216, 288].map((a) => (
                  <ellipse
                    key={a}
                    cx={leaf * 0.55}
                    cy={-leaf * 0.28}
                    rx={leaf * 0.2}
                    ry={leaf * 0.13}
                    fill="#f4a7c3"
                    transform={`rotate(${a} ${leaf * 0.55 - leaf * 0.16} ${-leaf * 0.28})`}
                  />
                ))}
                <circle cx={leaf * 0.39} cy={-leaf * 0.28} r={leaf * 0.09} fill="#ffd978" />
              </motion.g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/**
 * Jungle loading screen: a looping forest video (animals playing around a
 * hanging branch) where the branch itself is the progress bar — a fresh vine
 * grows along it, sprouting leaves and pink blossoms as the site loads.
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
      // too little of the branch on screen to sit a vine on (very wide, short windows)
      setBar(right - left < 60 ? null : { left, width: right - left, top: oy + BRANCH.cy * s, h: Math.max(10, BRANCH.h * s) });
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
          <VineProgress w={bar.width} h={bar.h} p={shown / 100} />
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
