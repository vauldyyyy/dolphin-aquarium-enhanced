"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import LiveBackground from "./LiveBackground";

/* Painted section backgrounds, animated in layers: a slowly drifting plate, a
   foreground layer that sways, creatures crossing the scene, and a particle
   pass on top. Art lives in public/scene/. Motion follows the art hand-off. */

const rnd = (i, s) => {
  const x = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

/* path: "right" / "left" cross the scene, "rise" floats upward, "loop" circles */
const PRESETS = {
  care: {
    plate: "care-plate", front: "care-front", scrim: "dark", strength: 0.3, kb: 24,
    effects: { variant: "aqua", density: 0.55 },
    sprites: [
      { file: "care-sprite-tetras", n: 5, path: "right", w: [9, 15], top: [42, 74], dur: [28, 34], o: 0.85 },
      { file: "care-sprite-angelfish", n: 1, path: "left", w: [11, 11], top: [26, 26], dur: [42, 42], o: 0.9 },
    ],
  },
  gallery: {
    plate: "gallery-plate", front: "gallery-front", scrim: "light", strength: 0.14, kb: 26, drift: 2.5,
    sprites: [
      { file: "gallery-sprite-butterfly", n: 2, path: "loop", w: [5, 7], top: [22, 58], dur: [18, 26], o: 0.95 },
      { file: "gallery-sprite-dandelion-seed", n: 5, path: "rise", w: [2.5, 4], top: [0, 0], dur: [20, 30], o: 0.8 },
    ],
  },
  services: {
    plate: "services-plate", front: "services-front", scrim: "light", strength: 0.22, kb: 26,
    effects: { variant: "forest", density: 0.5 },
    sprites: [],
  },
  why: {
    plate: "why-plate", scrim: "dark", strength: 0.38, kb: 22,
    effects: { variant: "aqua", density: 0.5 },
    sprites: [
      { file: "why-sprite-discus", n: 1, path: "right", w: [4, 4], top: [58, 58], dur: [36, 36], o: 0.9 },
      { file: "why-sprite-bubbles", n: 3, path: "rise", w: [3, 5], top: [0, 0], dur: [16, 24], o: 0.55 },
    ],
  },
  founders: {
    plate: "founders-plate", front: "founders-front", scrim: "light", strength: 0.16, kb: 24,
    effects: { variant: "forest", density: 0.55 },
    sprites: [{ file: "founders-sprite-goldfish", n: 1, path: "loop", w: [3.5, 3.5], top: [56, 56], dur: [16, 16], o: 0.95 }],
  },
  clients: {
    plate: "clients-plate", front: "clients-front", scrim: "light", strength: 0.18, kb: 24,
    sprites: [{ file: "clients-sprite-gull", n: 2, path: "right", w: [4, 6], top: [16, 28], dur: [22, 30], o: 0.8 }],
  },
  reviews: {
    plate: "reviews-plate", scrim: "light", strength: 0.18, kb: 28,
    sprites: [
      { file: "reviews-sprite-lantern", n: 4, path: "rise", w: [1.6, 2.6], top: [0, 0], dur: [26, 38], o: 0.9 },
      { file: "reviews-sprite-bird", n: 5, path: "right", w: [2.5, 4], top: [10, 30], dur: [18, 24], o: 0.65 },
    ],
  },
  heart: {
    plate: "heart-plate", scrim: "dark", strength: 0.36, kb: 26,
    effects: { variant: "aqua", density: 0.5 },
    sprites: [{ file: "heart-sprite-fish", n: 3, path: "loop", w: [3, 4.5], top: [30, 52], dur: [14, 20], o: 0.9 }],
  },
  visit: {
    plate: "visit-plate", front: "visit-front", scrim: "visit", strength: 0.4, kb: 24,
    effects: { variant: "aqua", density: 0.7 },
    sprites: [
      { file: "visit-sprite-silver-fish", n: 2, path: "right", w: [10, 14], top: [30, 58], dur: [26, 34], o: 0.8 },
      { file: "visit-sprite-manta-ray", n: 1, path: "left", w: [9, 9], top: [18, 18], dur: [38, 38], o: 0.7 },
    ],
  },
  footer: {
    plate: "footer-plate", scrim: "dark", strength: 0.46, kb: 35,
    effects: { variant: "aqua", density: 0.45 },
    sprites: [{ file: "footer-sprite-jellyfish", n: 2, path: "rise", w: [4, 6], top: [0, 0], dur: [28, 42], o: 0.7 }],
  },
};

function Sprite({ spec, i, calm }) {
  const seed = i * 3.7 + spec.file.length;
  const w = spec.w[0] + rnd(seed, 1) * (spec.w[1] - spec.w[0]);
  const dur = (spec.dur[0] + rnd(seed, 2) * (spec.dur[1] - spec.dur[0])) * (calm ? 1.7 : 1);
  const top = spec.top[0] + rnd(seed, 3) * (spec.top[1] - spec.top[0]);
  const delay = -rnd(seed, 4) * dur;
  const style = { position: "absolute", width: `${w}%`, height: "auto", opacity: spec.o, willChange: "transform" };
  const ease = "linear";

  if (spec.path === "rise") {
    return (
      <motion.img
        src={`/scene/${spec.file}.webp`} alt="" aria-hidden="true" loading="lazy" decoding="async"
        style={{ ...style, left: `${6 + rnd(seed, 5) * 88}%`, bottom: "-12%" }}
        animate={{ y: ["0%", "-780%"], x: [0, 26, -18, 10], opacity: [0, spec.o, spec.o, 0] }}
        transition={{ duration: dur, delay, repeat: Infinity, ease, times: [0, 0.15, 0.85, 1] }}
      />
    );
  }
  if (spec.path === "loop") {
    return (
      <motion.img
        src={`/scene/${spec.file}.webp`} alt="" aria-hidden="true" loading="lazy" decoding="async"
        style={{ ...style, left: `${18 + rnd(seed, 5) * 60}%`, top: `${top}%` }}
        animate={{ x: [0, 60, 8, -46, 0], y: [0, -26, -6, 22, 0], rotate: [0, 4, -3, 2, 0] }}
        transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
      />
    );
  }
  const toLeft = spec.path === "left";
  return (
    <motion.img
      src={`/scene/${spec.file}.webp`} alt="" aria-hidden="true" loading="lazy" decoding="async"
      style={{ ...style, left: 0, top: `${top}%`, scaleX: toLeft ? -1 : 1 }}
      animate={{ x: toLeft ? ["112vw", "-24vw"] : ["-24vw", "112vw"], y: [0, -14, 8, -6, 0] }}
      transition={{
        x: { duration: dur, delay, repeat: Infinity, ease },
        y: { duration: dur / 3, delay, repeat: Infinity, ease: "easeInOut" },
      }}
    />
  );
}

export default function SceneLayers({ preset }) {
  const p = PRESETS[preset];
  const ref = useRef(null);
  const near = useInView(ref, { margin: "300px 0px" });
  const calm = useReducedMotion();
  if (!p) return null;

  const kb = p.kb * (calm ? 1.6 : 1);

  return (
    <div ref={ref} className="scene" aria-hidden="true">
      <motion.img
        className="scene-plate"
        src={`/scene/${p.plate}.webp`}
        alt=""
        loading="lazy"
        decoding="async"
        animate={near ? { scale: [1.03, 1.03 + (p.drift ? 0.01 : 0.045)], x: p.drift ? ["-1.2%", "1.2%"] : ["0%", "-0.8%"] } : undefined}
        transition={{ duration: kb, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
      {near && p.effects && <LiveBackground variant={p.effects.variant} density={p.effects.density} />}
      {near && p.sprites.map((spec) =>
        Array.from({ length: spec.n }, (_, i) => <Sprite key={`${spec.file}-${i}`} spec={spec} i={i} calm={calm} />)
      )}
      {p.front && (
        <motion.img
          className="scene-front"
          src={`/scene/${p.front}.webp`}
          alt=""
          loading="lazy"
          decoding="async"
          animate={near ? { rotate: [-0.7, 0.7], scale: [1.05, 1.07] } : undefined}
          transition={{ duration: 11 * (calm ? 1.6 : 1), repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
      )}
      <div className={`scene-scrim scene-scrim--${p.scrim}`} style={{ "--s": p.strength }} />
    </div>
  );
}

/* The ocean→garden bridge: two plates cross-faded by scroll, so the page rises
   out of the water as you read the line. */
export function SceneTransition() {
  const ref = useRef(null);
  const calm = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const gardenOpacity = useTransform(scrollYProgress, [0.28, 0.72], [0, 1]);
  const underOpacity = useTransform(scrollYProgress, [0.28, 0.72], [1, 0]);
  const near = useInView(ref, { margin: "300px 0px" });

  return (
    <div ref={ref} className="scene" aria-hidden="true">
      <motion.img className="scene-plate" src="/scene/transition-under.webp" alt="" loading="lazy" decoding="async" style={{ opacity: underOpacity, scale: 1.05 }} />
      <motion.img className="scene-plate" src="/scene/transition-garden.webp" alt="" loading="lazy" decoding="async" style={{ opacity: gardenOpacity, scale: 1.05 }} />
      {near && (
        <motion.img
          src="/scene/transition-sprite-songbird.webp" alt="" aria-hidden="true" loading="lazy" decoding="async"
          style={{ position: "absolute", width: "7%", height: "auto", left: 0, top: "22%", opacity: 0.9 }}
          animate={{ x: ["-20vw", "112vw"], y: [0, -30, 10, -20, 0] }}
          transition={{ x: { duration: calm ? 40 : 24, repeat: Infinity, ease: "linear" }, y: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
        />
      )}
      <div className="scene-scrim scene-scrim--dark" style={{ "--s": 0.2 }} />
    </div>
  );
}
