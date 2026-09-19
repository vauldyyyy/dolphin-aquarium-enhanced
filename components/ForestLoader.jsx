"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimationFrame } from "framer-motion";

const EASE = [0.22, 0.61, 0.36, 1];
/* deterministic pseudo-random, rounded so server and client markup match */
const rnd = (i, s) => {
  const x = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453;
  return x - Math.floor(x);
};
const r1 = (n) => Math.round(n * 10) / 10;
const loop = (duration, extra = {}) => ({ duration, repeat: Infinity, ease: "easeInOut", ...extra });

const MESSAGES = ["Waking up the jungle", "Untangling the vines", "Feeding the fish", "Counting the parrots"];

/* Loading branch geometry (stage viewBox units) */
const BX0 = 44;
const BX1 = 556;
const BLEN = BX1 - BX0;
const vineY = (x) => 90 + Math.sin((x - BX0) / 18) * 8;
const VINE_D = (() => {
  let d = `M${BX0} ${r1(vineY(BX0))}`;
  for (let x = BX0 + 4; x <= BX1; x += 4) d += ` L${x} ${r1(vineY(x))}`;
  return d;
})();
const LEAVES = Array.from({ length: 14 }, (_, i) => {
  const x = 62 + i * 36;
  return { x, y: r1(vineY(x)), up: i % 2 === 0, flower: i % 4 === 2, at: (x - BX0) / BLEN };
});

/* ================================ characters ================================ */

function MonkeyArt() {
  const fur = "#6e4222";
  const body = "#7a4a26";
  const light = "#d9a86c";
  return (
    <g>
      <motion.path
        d="M44 78 C 66 80, 72 98, 60 103 C 51 106, 50 96, 57 95"
        fill="none" stroke={fur} strokeWidth="4" strokeLinecap="round"
        animate={{ rotate: [-6, 8, -6] }} transition={loop(2.4)} style={{ originX: 0, originY: 0 }}
      />
      <motion.g animate={{ rotate: [12, -14, 12] }} transition={loop(1.4)} style={{ originX: 0.8, originY: 0 }}>
        <path d="M34 72 C 30 80, 27 87, 28 94" fill="none" stroke={fur} strokeWidth="6.5" strokeLinecap="round" />
        <ellipse cx="27" cy="96" rx="4.5" ry="3" fill="#8a5a33" />
      </motion.g>
      <motion.g animate={{ rotate: [-12, 14, -12] }} transition={loop(1.4, { delay: 0.35 })} style={{ originX: 0.2, originY: 0 }}>
        <path d="M46 72 C 50 80, 53 87, 52 94" fill="none" stroke={fur} strokeWidth="6.5" strokeLinecap="round" />
        <ellipse cx="53" cy="96" rx="4.5" ry="3" fill="#8a5a33" />
      </motion.g>
      <path d="M31 48 C 21 36, 25 16, 34 6" fill="none" stroke={fur} strokeWidth="7" strokeLinecap="round" />
      <path d="M49 48 C 59 36, 55 16, 46 6" fill="none" stroke={fur} strokeWidth="7" strokeLinecap="round" />
      <circle cx="34" cy="6" r="4.6" fill="#8a5a33" />
      <circle cx="46" cy="6" r="4.6" fill="#8a5a33" />
      <ellipse cx="40" cy="60" rx="15" ry="19" fill={body} />
      <ellipse cx="40" cy="64" rx="9" ry="12" fill={light} />
      <circle cx="26.5" cy="33" r="5.5" fill={body} />
      <circle cx="26.5" cy="33" r="3" fill={light} />
      <circle cx="53.5" cy="33" r="5.5" fill={body} />
      <circle cx="53.5" cy="33" r="3" fill={light} />
      <circle cx="40" cy="33" r="13" fill={body} />
      <path d="M31 36 C 31 28, 37 27, 40 30 C 43 27, 49 28, 49 36 C 49 43, 44 46, 40 46 C 36 46, 31 43, 31 36 Z" fill="#e2b57a" />
      <motion.g
        animate={{ scaleY: [1, 1, 0.1, 1] }}
        transition={{ duration: 3.6, repeat: Infinity, times: [0, 0.9, 0.95, 1] }}
        style={{ originX: 0.5, originY: 0.5 }}
      >
        <circle cx="36" cy="34" r="2" fill="#2a1a0e" />
        <circle cx="44" cy="34" r="2" fill="#2a1a0e" />
        <circle cx="36.6" cy="33.3" r=".7" fill="#fff" />
        <circle cx="44.6" cy="33.3" r=".7" fill="#fff" />
      </motion.g>
      <circle cx="38.6" cy="38.5" r=".8" fill="#6b3f1f" />
      <circle cx="41.4" cy="38.5" r=".8" fill="#6b3f1f" />
      <path d="M36.5 41.5 Q40 44.5 43.5 41.5" fill="none" stroke="#6b3f1f" strokeWidth="1.2" strokeLinecap="round" />
    </g>
  );
}

function ToucanArt() {
  return (
    <g>
      <path d="M-4 -8 L -16 10 L -2 2 Z" fill="#141414" />
      <ellipse cx="0" cy="-18" rx="11" ry="16" fill="#1a1a1a" />
      <ellipse cx="4" cy="-24" rx="6.5" ry="8.5" fill="#fff4d6" />
      <motion.g
        animate={{ rotate: [0, -14, 0, 8, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, times: [0, 0.2, 0.5, 0.7, 1], ease: "easeInOut" }}
        style={{ originX: 0.2, originY: 0.9 }}
      >
        <circle cx="4" cy="-35" r="9.5" fill="#1a1a1a" />
        <path d="M11 -40 C 30 -43, 37 -34, 35 -29 C 27 -30, 19 -31, 11 -32 Z" fill="url(#flBeak)" />
        <path d="M31 -31.5 C 33 -32, 35 -30.5, 35 -29 C 33 -29.3, 32 -29.6, 31 -29.8 Z" fill="#1a1a1a" />
        <circle cx="6.5" cy="-36" r="3.4" fill="#5fb4e6" />
        <circle cx="6.5" cy="-36" r="1.6" fill="#111" />
      </motion.g>
      <path d="M-3 -3 L -4 2 M 3 -3 L 4 2" stroke="#e0a030" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

/* Snake draped along the branch: coils wrap it, body slithers, head sways and tastes the air */
function Snake() {
  const body = useRef(null);
  const stripe = useRef(null);
  const head = useRef(null);

  useAnimationFrame((ms) => {
    const t = ms / 1000;
    const hx = 352 + Math.sin(t * 0.7) * 6;
    const hy = 60 + Math.sin(t * 1.6) * 5;
    let d = "M470 76";
    for (let x = 466; x >= 378; x -= 4) d += ` L${x} ${(76 + Math.sin(x / 14 - t * 3) * 2.5).toFixed(1)}`;
    d += ` Q${(hx + 14).toFixed(1)} 76 ${(hx + 8).toFixed(1)} ${(hy + 4).toFixed(1)}`;
    body.current?.setAttribute("d", d);
    stripe.current?.setAttribute("d", d);
    head.current?.setAttribute("transform", `translate(${hx.toFixed(1)} ${hy.toFixed(1)})`);
  });

  return (
    <g>
      <path ref={body} d="M470 76" fill="none" stroke="#3f8f3a" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
      <path ref={stripe} d="M470 76" fill="none" stroke="#a6dd6e" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="3 7" />
      <g ref={head} transform="translate(352 60)">
        <ellipse cx="0" cy="0" rx="11" ry="7.5" fill="#3f8f3a" transform="rotate(15)" />
        <circle cx="-3" cy="-4" r="2.4" fill="#f4e04d" />
        <ellipse cx="-3" cy="-4" rx=".8" ry="1.9" fill="#111" />
        <motion.path
          d="M-10 -1 L-19 -3 L-23 -6 M-19 -3 L-23 0"
          fill="none" stroke="#e0413b" strokeWidth="1.4" strokeLinecap="round"
          animate={{ scaleX: [0, 0, 1, 0, 0, 1, 0], opacity: [0, 0, 1, 1, 0, 1, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, times: [0, 0.5, 0.55, 0.6, 0.7, 0.75, 0.8] }}
          style={{ originX: 1, originY: 0.5 }}
        />
      </g>
    </g>
  );
}

function SnakeCoilsBack() {
  return <path d="M484 104 C 486 96, 489 84, 492 75" fill="none" stroke="#2f6e2c" strokeWidth="10" strokeLinecap="round" />;
}

function SnakeCoilsFront() {
  const d = ["M470 76 C 476 82, 480 96, 484 104", "M492 75 C 498 82, 502 96, 506 104", "M506 104 C 512 112, 518 114, 522 108"];
  return (
    <g fill="none" strokeLinecap="round">
      {d.map((p) => (
        <g key={p}>
          <path d={p} stroke="#3f8f3a" strokeWidth="10" />
          <path d={p} stroke="#a6dd6e" strokeWidth="3" strokeDasharray="3 7" />
        </g>
      ))}
    </g>
  );
}

function ParrotArt() {
  return (
    <svg viewBox="0 0 80 44" width="100%" height="100%" aria-hidden="true">
      <path d="M22 24 L 0 34 L 5 28 L 1 39 L 26 28 Z" fill="#2f7fd1" />
      <path d="M22 25 L 6 33 L 25 27 Z" fill="#e23b2e" />
      <ellipse cx="38" cy="24" rx="17" ry="8" fill="#e23b2e" />
      <circle cx="54" cy="20" r="7" fill="#e23b2e" />
      <ellipse cx="56.5" cy="19" rx="3.6" ry="3" fill="#fff3e6" />
      <circle cx="57" cy="18.6" r="1.2" fill="#111" />
      <path d="M60 17 C 66 16, 68 22, 62.5 25 C 63.5 22, 62.5 20, 60 21 Z" fill="#f2e2c4" />
      <motion.g
        animate={{ scaleY: [1, -0.7, 1] }}
        transition={{ duration: 0.42, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: 0.5, originY: 1 }}
      >
        <path d="M32 22 C 27 6, 42 -1, 50 3 C 46 9, 44 15, 43 22 Z" fill="#f4c430" />
        <path d="M34 10 C 36 2, 44 -1, 50 3 C 47 6, 45 9, 44 12 Z" fill="#2f7fd1" />
      </motion.g>
    </svg>
  );
}

function ButterflyArt({ c1, c2 }) {
  return (
    <svg viewBox="-15 -12 30 24" width="100%" height="100%" aria-hidden="true">
      <motion.g
        animate={{ scaleX: [1, 0.2, 1] }}
        transition={{ duration: 0.3, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: 0.5, originY: 0.5 }}
      >
        <path d="M0 0 C -6 -12, -15 -10, -13 -3 C -12 1, -6 1, 0 0 Z" fill={c1} />
        <path d="M0 0 C 6 -12, 15 -10, 13 -3 C 12 1, 6 1, 0 0 Z" fill={c1} />
        <path d="M0 1 C -5 2, -11 8, -7 10 C -4 11, -1 6, 0 1 Z" fill={c2} />
        <path d="M0 1 C 5 2, 11 8, 7 10 C 4 11, 1 6, 0 1 Z" fill={c2} />
      </motion.g>
      <path d="M0 -5 L 0 7" stroke="#2a1a0e" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function BunnyArt() {
  return (
    <svg viewBox="0 0 64 52" width="100%" height="100%" aria-hidden="true">
      <circle cx="10" cy="34" r="5" fill="#fffaf0" />
      <ellipse cx="26" cy="36" rx="16" ry="12" fill="#d8c7ae" />
      <ellipse cx="20" cy="44" rx="9" ry="5" fill="#c6b08c" />
      <ellipse cx="38" cy="13" rx="3.5" ry="10" fill="#d8c7ae" transform="rotate(-12 38 13)" />
      <ellipse cx="38" cy="14" rx="1.6" ry="7" fill="#e8a3ad" transform="rotate(-12 38 14)" />
      <ellipse cx="45" cy="12" rx="3.5" ry="10" fill="#d8c7ae" transform="rotate(12 45 12)" />
      <ellipse cx="45" cy="13" rx="1.6" ry="7" fill="#e8a3ad" transform="rotate(12 45 13)" />
      <circle cx="43" cy="27" r="9" fill="#d8c7ae" />
      <circle cx="46" cy="25" r="1.6" fill="#2a1a0e" />
      <circle cx="51" cy="28" r="1.2" fill="#e38b9a" />
      <ellipse cx="38" cy="46" rx="5" ry="3" fill="#c6b08c" />
    </svg>
  );
}

function FrogArt() {
  return (
    <svg viewBox="0 0 60 44" width="100%" height="100%" aria-hidden="true">
      <ellipse cx="12" cy="36" rx="11" ry="6" fill="#3e8a3a" />
      <ellipse cx="48" cy="36" rx="11" ry="6" fill="#3e8a3a" />
      <ellipse cx="30" cy="28" rx="19" ry="13" fill="#5cb84a" />
      <ellipse cx="30" cy="33" rx="12" ry="7" fill="#cdeaa0" />
      <circle cx="20" cy="15" r="7" fill="#5cb84a" />
      <circle cx="40" cy="15" r="7" fill="#5cb84a" />
      <circle cx="20" cy="14" r="4.6" fill="#fff" />
      <circle cx="40" cy="14" r="4.6" fill="#fff" />
      <circle cx="21" cy="14.5" r="2.4" fill="#111" />
      <circle cx="39" cy="14.5" r="2.4" fill="#111" />
      <path d="M22 27 Q30 32 38 27" fill="none" stroke="#2c6a28" strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="18" cy="40" rx="5" ry="2.4" fill="#3e8a3a" />
      <ellipse cx="42" cy="40" rx="5" ry="2.4" fill="#3e8a3a" />
    </svg>
  );
}

/* ================================ scenery ================================ */

function Treeline({ className, color, count, top, minR, maxR, seed }) {
  const W = 1600;
  const H = 400;
  const trees = Array.from({ length: count }, (_, i) => {
    const r = minR + rnd(i, seed + 1) * (maxR - minR);
    return {
      cx: r1((i / (count - 1)) * W + (rnd(i, seed) - 0.5) * 60),
      cy: r1(top + r * 0.55 + rnd(i, seed + 2) * 40),
      r: r1(r),
    };
  });
  return (
    <svg className={className} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      <g fill={color}>
        {trees.map((t, i) => (
          <g key={i}>
            <circle cx={t.cx} cy={t.cy} r={t.r} />
            <rect x={r1(t.cx - 6)} y={t.cy} width="12" height={r1(H - t.cy)} />
          </g>
        ))}
        <rect x="0" y={r1(top + maxR * 0.9)} width={W} height={r1(H - top - maxR * 0.9)} />
      </g>
    </svg>
  );
}

function HangingVine({ left, length, delay }) {
  const leaves = [];
  for (let y = 18; y < length - 6; y += 22) leaves.push(y);
  return (
    <motion.svg
      className="fl-vine"
      style={{ left, originX: 0.5, originY: 0 }}
      width="40"
      height={length}
      viewBox={`0 0 40 ${length}`}
      animate={{ rotate: [-2.5, 2.5, -2.5] }}
      transition={loop(5 + delay, { delay })}
      aria-hidden="true"
    >
      <path d={`M20 0 C 14 ${r1(length * 0.3)}, 26 ${r1(length * 0.6)}, 20 ${length}`} stroke="#2e6a33" strokeWidth="3" fill="none" />
      {leaves.map((y, i) => (
        <path
          key={y}
          d="M0 0 C 4 -5, 12 -6, 15 -1 C 10 2, 4 2, 0 0 Z"
          transform={`translate(20 ${y}) rotate(${i % 2 ? 150 : 30})`}
          fill={i % 3 === 0 ? "#5aa84d" : "#3f8a42"}
        />
      ))}
    </motion.svg>
  );
}

function Fern({ className, flip = false, color = "#0a2415" }) {
  const fronds = [
    { a: 100, L: 250 },
    { a: 125, L: 215 },
    { a: 76, L: 230 },
    { a: 148, L: 165 },
    { a: 54, L: 175 },
  ];
  const stems = [];
  const leaflets = [];
  fronds.forEach((f, fi) => {
    const rad = (f.a * Math.PI) / 180;
    const bx = 150;
    const by = 300;
    const tx = bx + Math.cos(rad) * f.L;
    const ty = by - Math.sin(rad) * f.L;
    const cx = bx + Math.cos(rad + 0.35) * f.L * 0.55;
    const cy = by - Math.sin(rad + 0.35) * f.L * 0.55;
    stems.push(`M${bx} ${by} Q${r1(cx)} ${r1(cy)} ${r1(tx)} ${r1(ty)}`);
    for (let k = 1; k < 16; k++) {
      const t = k / 16;
      const px = (1 - t) ** 2 * bx + 2 * (1 - t) * t * cx + t * t * tx;
      const py = (1 - t) ** 2 * by + 2 * (1 - t) * t * cy + t * t * ty;
      const dx = 2 * (1 - t) * (cx - bx) + 2 * t * (tx - cx);
      const dy = 2 * (1 - t) * (cy - by) + 2 * t * (ty - cy);
      const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
      const s = (1 - t) * 15 + 4;
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;
      [1, -1].forEach((side) => {
        leaflets.push({
          k: `${fi}-${k}-${side}`,
          cx: r1(px + nx * s * 0.8 * side),
          cy: r1(py + ny * s * 0.8 * side),
          rx: r1(s),
          ry: r1(s * 0.32),
          rot: r1(ang + 62 * side),
        });
      });
    }
  });
  return (
    <motion.svg
      className={className}
      viewBox="0 0 300 300"
      animate={{ rotate: [-1.6, 1.6, -1.6] }}
      transition={loop(6)}
      style={{ originX: 0.5, originY: 1 }}
      aria-hidden="true"
    >
      <g transform={flip ? "translate(300 0) scale(-1 1)" : undefined} fill={color}>
        {stems.map((d) => (
          <path key={d} d={d} fill="none" stroke={color} strokeWidth="3" />
        ))}
        {leaflets.map((l) => (
          <ellipse key={l.k} cx={l.cx} cy={l.cy} rx={l.rx} ry={l.ry} transform={`rotate(${l.rot} ${l.cx} ${l.cy})`} />
        ))}
      </g>
    </motion.svg>
  );
}

/* ================================ loader ================================ */

/**
 * Jungle loading screen: the progress bar is a branch hung on vines — a vine
 * grows along it, a monkey swings hand-over-hand to the progress front, a snake
 * lies coiled on the far end and a toucan keeps watch, while parrots,
 * butterflies, a bunny and fireflies play around the forest.
 *
 * `progress` is the real load (0–100). The displayed value never runs ahead of
 * `minMs` of screen time, so the scene always gets a moment on screen.
 * `demo` loops the progress forever (for previewing via ?loader).
 */
export default function ForestLoader({ progress = 0, minMs = 3200, demo = false }) {
  const [shown, setShown] = useState(0);
  const [msg, setMsg] = useState(0);
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

  const p = shown / 100;
  const monkeyX = BX0 + BLEN * p - 40;

  return (
    <motion.div
      className="fl"
      role="status"
      aria-label={`Loading Dolphin Aquarium & Pets, ${shown}%`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      {/* ---------- sky, sun and light ---------- */}
      <div className="fl-sun" />
      <motion.div
        className="fl-rays"
        animate={{ rotate: [-7, 7, -7], opacity: [0.16, 0.28, 0.16] }}
        transition={loop(14)}
        style={{ originX: 0.5, originY: 0 }}
      />

      {/* ---------- forest layers ---------- */}
      <Treeline className="fl-trees fl-trees--far" color="#2c6040" count={22} top={40} minR={60} maxR={110} seed={3} />
      <Treeline className="fl-trees fl-trees--mid" color="#1a4a2d" count={16} top={70} minR={80} maxR={140} seed={9} />
      <div className="fl-mist" />
      <Treeline className="fl-trees fl-trees--near" color="#0b2617" count={12} top={150} minR={70} maxR={120} seed={17} />

      {/* ---------- hanging vines ---------- */}
      {[
        ["3%", 190, 0], ["16%", 120, 0.8], ["27%", 230, 1.6], ["71%", 170, 0.4], ["84%", 260, 1.2], ["95%", 140, 2],
      ].map(([l, len, d]) => (
        <HangingVine key={l} left={l} length={len} delay={d} />
      ))}

      {/* ---------- monkey swinging on a vine ---------- */}
      <motion.div
        className="fl-swinger"
        animate={{ rotate: [-16, 16, -16] }}
        transition={loop(3.2)}
        style={{ originX: 0.5, originY: 0 }}
      >
        <i />
        <svg viewBox="0 0 80 110" aria-hidden="true">
          <MonkeyArt />
        </svg>
      </motion.div>

      {/* ---------- parrots flying across ---------- */}
      {[
        { top: "12%", delay: 0.6, dur: 9, size: 120 },
        { top: "26%", delay: 5.4, dur: 11, size: 88 },
      ].map((b, i) => (
        <motion.div
          key={i}
          className="fl-critter"
          style={{ top: b.top, left: 0, width: b.size, height: b.size * 0.55 }}
          initial={{ x: "-12vw" }}
          animate={{ x: ["-12vw", "112vw"], y: [0, -28, 12, -18, 0] }}
          transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, repeatDelay: 2.5, ease: "linear" }}
        >
          <ParrotArt />
        </motion.div>
      ))}

      {/* ---------- butterflies ---------- */}
      {[
        { left: "14%", top: "56%", c1: "#ff9f43", c2: "#ffd166", dur: 11 },
        { left: "80%", top: "50%", c1: "#4aa3df", c2: "#9ad7ff", dur: 13 },
        { left: "62%", top: "70%", c1: "#f78fb3", c2: "#ffd1dc", dur: 9 },
        { left: "30%", top: "76%", c1: "#ffd166", c2: "#fff1c6", dur: 12 },
      ].map((b, i) => (
        <motion.div
          key={i}
          className="fl-critter"
          style={{ left: b.left, top: b.top, width: 46, height: 37 }}
          animate={{ x: [0, 50, -30, 70, 0], y: [0, -40, -10, -60, 0], rotate: [0, 12, -8, 10, 0] }}
          transition={loop(b.dur)}
        >
          <ButterflyArt c1={b.c1} c2={b.c2} />
        </motion.div>
      ))}

      {/* ---------- bunny hopping along the forest floor ---------- */}
      <motion.div
        className="fl-critter fl-bunny"
        initial={{ x: "-10vw" }}
        animate={{ x: ["-10vw", "110vw"] }}
        transition={{ duration: 16, repeat: Infinity, repeatDelay: 1.5, ease: "linear", delay: 0.8 }}
      >
        <motion.div
          style={{ width: "100%", height: "100%" }}
          animate={{ y: [0, -26, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 0.62, repeat: Infinity, ease: "easeInOut" }}
        >
          <BunnyArt />
        </motion.div>
      </motion.div>

      {/* ---------- frog doing little hops ---------- */}
      <motion.div
        className="fl-critter fl-frog"
        animate={{ y: [0, 0, -46, 0, 0], x: [0, 0, -18, -30, -30], scaleY: [1, 0.82, 1.08, 0.86, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, repeatType: "mirror", times: [0, 0.35, 0.55, 0.75, 1], ease: "easeInOut" }}
        style={{ originY: 1 }}
      >
        <FrogArt />
      </motion.div>

      {/* ---------- fireflies ---------- */}
      {Array.from({ length: 22 }, (_, i) => (
        <motion.span
          key={i}
          className="fl-firefly"
          style={{ left: `${r1(4 + rnd(i, 21) * 92)}%`, top: `${r1(30 + rnd(i, 22) * 64)}%` }}
          animate={{
            x: [0, r1((rnd(i, 23) - 0.5) * 80), r1((rnd(i, 24) - 0.5) * 80), 0],
            y: [0, r1((rnd(i, 25) - 0.5) * 60), r1((rnd(i, 26) - 0.5) * 60), 0],
            opacity: [0.15, 1, 0.35, 0.15],
          }}
          transition={loop(r1(6 + rnd(i, 27) * 6), { delay: r1(rnd(i, 28) * 4) })}
        />
      ))}

      {/* ---------- falling leaves ---------- */}
      {Array.from({ length: 9 }, (_, i) => {
        const dur = r1(10 + rnd(i, 31) * 8);
        return (
          <motion.svg
            key={i}
            className="fl-leaf"
            viewBox="0 0 24 24"
            width={r1(16 + rnd(i, 32) * 16)}
            height={r1(16 + rnd(i, 32) * 16)}
            style={{ left: `${r1(4 + rnd(i, 33) * 92)}%` }}
            initial={{ y: "-8vh", opacity: 0 }}
            animate={{
              y: ["-8vh", "108vh"],
              x: [0, 40, -30, 25, 0],
              rotate: [0, (rnd(i, 34) > 0.5 ? 1 : -1) * 320],
              opacity: [0, 0.9, 0.9, 0.9, 0],
            }}
            transition={{ duration: dur, delay: r1(rnd(i, 35) * dur), repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          >
            <path d="M12 1C6.5 5 3.5 11 5.2 17.2 6.3 21 9.6 23 12 23s5.7-2 6.8-5.8C20.5 11 17.5 5 12 1Z" fill={["#6f9a5a", "#9cb86b", "#c9a24e"][i % 3]} />
            <path d="M12 4v18" stroke="rgba(255,255,255,.4)" strokeWidth=".8" />
          </motion.svg>
        );
      })}

      {/* ---------- foreground ferns ---------- */}
      <Fern className="fl-fern fl-fern--l" />
      <Fern className="fl-fern fl-fern--r" flip />

      {/* ---------- logo + loading branch ---------- */}
      <div className="fl-center">
        <motion.img
          className="fl-logo"
          src="/assets/logo-white.png"
          alt="Dolphin Aquarium & Pets"
          initial={{ opacity: 0, y: 16 }}
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

        <svg className="fl-stage" viewBox="0 -30 600 250" aria-hidden="true">
          <defs>
            <linearGradient id="flBark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8a5a31" />
              <stop offset="1" stopColor="#4a2e17" />
            </linearGradient>
            <linearGradient id="flBeak" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#ffcf3a" />
              <stop offset="1" stopColor="#ff8a1f" />
            </linearGradient>
            <linearGradient id="flHold" x1="0" y1="-30" x2="0" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#2f6b34" stopOpacity="0" />
              <stop offset="0.5" stopColor="#2f6b34" />
              <stop offset="1" stopColor="#3f8a42" />
            </linearGradient>
          </defs>

          {/* the whole swing sways gently on its vines */}
          <motion.g animate={{ rotate: [-1.2, 1.2, -1.2] }} transition={loop(4)} style={{ originX: 0.5, originY: 0 }}>
            <path d="M72 -30 Q 64 30 70 86" stroke="url(#flHold)" strokeWidth="4" fill="none" />
            <path d="M530 -30 Q 538 30 530 84" stroke="url(#flHold)" strokeWidth="4" fill="none" />
            {[20, 48, 70].map((y, i) => (
              <g key={y}>
                <path d="M0 0 C 4 -5, 12 -6, 15 -1 C 10 2, 4 2, 0 0 Z" transform={`translate(${i % 2 ? 67 : 69} ${y}) rotate(${i % 2 ? 150 : 25})`} fill="#4f9a45" />
                <path d="M0 0 C 4 -5, 12 -6, 15 -1 C 10 2, 4 2, 0 0 Z" transform={`translate(${i % 2 ? 533 : 531} ${y}) rotate(${i % 2 ? 30 : 160})`} fill="#4f9a45" />
              </g>
            ))}

            <SnakeCoilsBack />

            {/* branch */}
            <path
              d="M40 82 C 150 78, 300 84, 420 80 C 480 78, 530 82, 560 81 L 562 99 C 520 101, 460 98, 400 100 C 290 103, 160 97, 42 99 Z"
              fill="url(#flBark)"
            />
            <g stroke="#3a2412" strokeOpacity=".5" strokeWidth="1.4" strokeLinecap="round" fill="none">
              <path d="M110 86 q 14 -2 26 1" />
              <path d="M210 93 q 18 2 30 -1" />
              <path d="M320 87 q 12 -1 22 1" />
              <path d="M430 92 q 16 2 28 0" />
            </g>
            <ellipse cx="41" cy="90.5" rx="5" ry="8.6" fill="#b07b4a" />
            <ellipse cx="41" cy="90.5" rx="2.4" ry="4.2" fill="none" stroke="#7a4f2a" strokeWidth="1" />
            <ellipse cx="561" cy="90" rx="5" ry="8.6" fill="#b07b4a" />
            <path d="M250 81 Q 256 66 266 60" stroke="#5a3a1e" strokeWidth="3.4" fill="none" strokeLinecap="round" />
            <path d="M0 0 C 4 -5, 12 -6, 15 -1 C 10 2, 4 2, 0 0 Z" transform="translate(265 60) rotate(-35) scale(1.3)" fill="#5aa84d" />

            {/* progress: a vine grows along the branch, sprouting leaves and flowers */}
            <motion.path
              d={VINE_D}
              fill="none"
              stroke="#5cc04a"
              strokeWidth="4.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: p, opacity: p > 0 ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 90, damping: 20 }}
            />
            {LEAVES.map((l) => (
              <g key={l.x} transform={`translate(${l.x} ${l.y}) rotate(${l.up ? -50 : 130})`}>
                <motion.path
                  d="M0 0 C 5 -7, 14 -8, 18 -1 C 12 3, 5 3, 0 0 Z"
                  fill="#7fd05c"
                  initial={{ scale: 0 }}
                  animate={{ scale: p >= l.at ? 1 : 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 14 }}
                  style={{ originX: 0, originY: 0.5 }}
                />
                {l.flower && (
                  <motion.g
                    initial={{ scale: 0 }}
                    animate={{ scale: p >= l.at ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 12, delay: 0.1 }}
                  >
                    {[0, 72, 144, 216, 288].map((a) => (
                      <circle key={a} cx={r1(18 + Math.cos((a * Math.PI) / 180) * 3.6)} cy={r1(-1 + Math.sin((a * Math.PI) / 180) * 3.6)} r="2.6" fill="#ff8fb1" />
                    ))}
                    <circle cx="18" cy="-1" r="2" fill="#ffd166" />
                  </motion.g>
                )}
              </g>
            ))}

            <SnakeCoilsFront />
            <Snake />

            <g transform="translate(546 82) scale(-1 1)">
              <ToucanArt />
            </g>

            {/* monkey hangs at the progress front, swinging hand-over-hand */}
            <g transform="translate(0 84)">
              <motion.g
                initial={{ x: BX0 - 40 }}
                animate={{ x: monkeyX }}
                transition={{ type: "spring", stiffness: 70, damping: 16 }}
              >
                <motion.g animate={{ rotate: [-10, 10, -10] }} transition={loop(1.6)} style={{ originX: 0.5, originY: 0 }}>
                  <MonkeyArt />
                </motion.g>
              </motion.g>
            </g>
          </motion.g>
        </svg>

        <div className="fl-status">
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
          <b>{shown}%</b>
        </div>
      </div>
    </motion.div>
  );
}
