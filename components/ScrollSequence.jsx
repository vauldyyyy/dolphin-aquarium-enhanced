"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { nearestFrame } from "./useImageSequence";

/* ------------------------------------------------------------------
   Beat — a text overlay whose opacity/offset is driven by scroll
------------------------------------------------------------------ */
function Beat({ progress, range, align = "center", children }) {
  const [start, end] = range;
  // A beat pinned to the very start must already be visible at progress 0,
  // and one pinned to the end must stay visible through progress 1.
  const atStart = start <= 0.001;
  const atEnd = end >= 1;

  const stops = [];
  const opac = [];
  const ys = [];
  const blurs = [];

  if (atStart) {
    stops.push(0); opac.push(1); ys.push(0); blurs.push(0);
  } else {
    stops.push(start, start + 0.04); opac.push(0, 1); ys.push(34, 0); blurs.push(8, 0);
  }
  if (atEnd) {
    stops.push(1); opac.push(1); ys.push(0); blurs.push(0);
  } else {
    stops.push(end - 0.05, end); opac.push(1, 0); ys.push(0, -26); blurs.push(0, 6);
  }

  const opacity = useTransform(progress, stops, opac);
  const y = useTransform(progress, stops, ys);
  const blur = useTransform(progress, stops, blurs);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <div className={`beat beat--${align}`}>
      <motion.div style={{ opacity, y, filter }}>{children}</motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------
   ScrollSequence — pinned canvas playing an image sequence on scroll
------------------------------------------------------------------ */
export default function ScrollSequence({
  id,
  imagesRef,
  count,
  loaded = 0,
  heightVh = 460,
  theme = "dark",
  navTheme,
  bg = "#050505",
  beats = [],
}) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const lastProgress = useRef(0);
  const reduceMotion = useReducedMotion();

  // Scroll progress across the pinned section (0 → 1)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Spring-smoothed playhead for buttery frame stepping
  const smooth = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    mass: 0.35,
    restDelta: 0.0005,
  });
  const playhead = reduceMotion ? scrollYProgress : smooth;

  const draw = useCallback(
    (p) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      const images = imagesRef.current || [];
      const idx = Math.max(0, Math.min(count - 1, Math.round(p * (count - 1))));
      const img = nearestFrame(images, idx, count);
      if (!img) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih); // cover
      const dw = iw * scale;
      const dh = ih * scale;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    },
    [imagesRef, count]
  );

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = bg; // fallback so frames never flash black
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw(lastProgress.current);
  }, [draw, bg]);

  // Redraw on every scroll-driven change
  useMotionValueEvent(playhead, "change", (v) => {
    lastProgress.current = v;
    draw(v);
  });

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  // Repaint as more frames finish decoding
  useEffect(() => {
    draw(lastProgress.current);
  }, [draw, loaded]);

  return (
    <section
      id={id}
      ref={sectionRef}
      data-immersion="true"
      className={`chapter chapter--${theme === "dark" ? "dark" : "warm"}`}
      style={{ height: `${heightVh}vh` }}
      data-nav={navTheme || (theme === "dark" ? "dark" : "light")}
    >
      <div className="sticky">
        <canvas ref={canvasRef} className="seq-canvas" />
        {loaded < Math.min(24, count) && (
          <div className="seq-loading" aria-hidden="true">
            <i /> Loading footage {Math.round((loaded / count) * 100)}%
          </div>
        )}
        <div className={`vignette vignette--${theme === "dark" ? "dark" : "warm"}`} />
        <div className="beats">
          {beats.map((b, i) => (
            <Beat key={i} progress={scrollYProgress} range={b.range} align={b.align}>
              {b.content}
            </Beat>
          ))}
        </div>
      </div>
    </section>
  );
}
