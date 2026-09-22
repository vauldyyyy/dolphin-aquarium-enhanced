"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Preview alternative to ScrollSequence (/?bg=video): the chapter footage
 * simply loops behind the copy instead of being scrubbed by scroll, and the
 * beats fade through one after another on a timer.
 */
export default function VideoChapter({ id, name, theme = "dark", bg = "#050505", beats = [], hold = 5200 }) {
  const [i, setI] = useState(0);
  const video = useRef(null);

  useEffect(() => {
    if (beats.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % beats.length), hold);
    return () => clearInterval(t);
  }, [beats.length, hold]);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { rootMargin: "50% 0px" }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const beat = beats[i];

  return (
    <section
      id={id}
      data-immersion="true"
      className={`chapter chapter--${theme === "dark" ? "dark" : "warm"} vchapter`}
      data-nav={theme === "dark" ? "dark" : "light"}
      style={{ background: bg }}
    >
      <video
        ref={video}
        className="vchapter-video"
        poster={`/bg/${name}.jpg`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={`/bg/${name}.webm`} type="video/webm" />
        <source src={`/bg/${name}.mp4`} type="video/mp4" />
      </video>
      <div className={`vignette vignette--${theme === "dark" ? "dark" : "warm"}`} />
      {/* the .beat wrapper keeps its CSS centring transform; only the inner layer animates */}
      <div className="beats">
        <div className="beat beat--center">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -22, filter: "blur(5px)" }}
              transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
            >
              {beat?.content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
