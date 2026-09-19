"use client";

import { useEffect, useRef, useState } from "react";

/* Section backgrounds whose video is in public/bg/ (<name>.mp4, .webm, .jpg).
   Add a name here once its files exist; until then the section keeps its
   `fallback` background. `mobile` marks names that also have <name>-mobile.mp4. */
const READY = {};

/**
 * Full-bleed video background for a section. Loads only when the section comes
 * near the viewport, pauses off screen, keeps moving (slower) under reduced
 * motion, and shows just the poster on data-saver / very slow connections.
 * mode "loop" loops; mode "once" plays when 40% visible and holds the last frame.
 */
export default function SectionVideo({
  name,
  fallback = null,
  mode = "loop",
  scrim = "dark",
  scrimStrength = 0.45,
  position = "50% 50%",
  opacity = 1,
}) {
  const wrap = useRef(null);
  const video = useRef(null);
  const [posterOnly, setPosterOnly] = useState(false);
  const [near, setNear] = useState(false);
  const entry = READY[name];

  useEffect(() => {
    if (!entry) return;
    const c = navigator.connection;
    if (c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || ""))) {
      setPosterOnly(true);
      return;
    }
    const v = video.current;
    const el = wrap.current?.parentElement;
    if (!v || !el) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const rate = () => { v.playbackRate = calm.matches ? 0.6 : 1; };
    let loaded = false;
    let played = false;

    const near = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          if (!loaded) { loaded = true; v.load(); rate(); }
          if (mode === "loop") v.play().catch(() => {});
        } else if (loaded) {
          v.pause();
        }
      },
      { rootMargin: "100% 0px" }
    );
    const seen = new IntersectionObserver(
      ([e]) => {
        if (mode === "once" && e.isIntersecting && !played) {
          played = true;
          if (!loaded) { loaded = true; setNear(true); v.load(); rate(); }
          v.play().catch(() => {});
        }
      },
      { threshold: 0.4 }
    );
    near.observe(el);
    seen.observe(el);
    calm.addEventListener?.("change", rate);
    return () => {
      near.disconnect();
      seen.disconnect();
      calm.removeEventListener?.("change", rate);
    };
  }, [entry, mode]);

  if (!entry) return fallback;

  const shade =
    scrim === "dark" ? `rgba(4,16,30,${scrimStrength})` : scrim === "light" ? `rgba(246,241,232,${scrimStrength})` : null;

  return (
    <div ref={wrap} className="sv" aria-hidden="true">
      {posterOnly ? (
        <img className="sv-media" src={`/bg/${name}.jpg`} alt="" loading="lazy" style={{ objectPosition: position, opacity }} />
      ) : (
        <video
          ref={video}
          className="sv-media"
          muted
          playsInline
          loop={mode === "loop"}
          preload="none"
          poster={near ? `/bg/${name}.jpg` : undefined}
          style={{ objectPosition: position, opacity }}
        >
          {entry.mobile && <source src={`/bg/${name}-mobile.mp4`} type="video/mp4" media="(max-aspect-ratio: 3/4)" />}
          <source src={`/bg/${name}.webm`} type="video/webm" />
          <source src={`/bg/${name}.mp4`} type="video/mp4" />
        </video>
      )}
      {shade && <div className="sv-scrim" style={{ background: shade }} />}
    </div>
  );
}
