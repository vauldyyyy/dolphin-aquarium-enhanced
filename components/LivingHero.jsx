"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Icon from "./Icon";
import {
  BUSINESS,
  telHref,
  waLink,
  directionsUrl,
  mapEmbedUrl,
  weekdayHours,
  sundayHours,
  openStatus,
} from "../lib/business";

const EASE = [0.22, 0.61, 0.36, 1];
const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};
const stagger = (gap = 0.09, delay = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

const store = {
  get(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch { /* storage is optional */ }
  },
};

/* ------------------------------------------------------------------
   Ocean engine — ported from the package's scripts/ocean.js.
   Canvas bubbles, stylised fish, caustic lines, click ripples and
   pointer parallax (via --px/--py). Capped FPS; pauses off-screen,
   when the tab is hidden, and under reduced motion.
------------------------------------------------------------------ */
function useOcean(rootRef, canvasRef, activeRef, engineRef) {
  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const cfg = BUSINESS.animation;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerFine = window.matchMedia("(pointer: fine)");
    let width = 0, height = 0, bubbles = [], fishes = [], ripples = [];
    let raf = 0, last = 0, elapsed = 0, inView = true;
    let active = activeRef.current && !reduce.matches;
    let targetX = 0, targetY = 0, px = 0, py = 0;
    const rand = (min, max) => min + Math.random() * (max - min);
    const maxFps = Math.min(60, Math.max(15, Number(cfg.maxFps) || 30));

    function resize() {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      const dpr = Math.min(window.devicePixelRatio || 1, width < 720 ? 1.25 : 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = width < 720 ? cfg.mobileParticles : cfg.desktopParticles;
      bubbles = Array.from({ length: count }, () => ({
        x: rand(0, width), y: rand(0, height), size: rand(0.7, 3.4),
        speed: rand(6, 21), phase: rand(0, 6.28), alpha: rand(0.08, 0.34),
      }));
      fishes = Array.from({ length: width < 720 ? 6 : 13 }, () => ({
        x: rand(-100, width + 100), y: rand(130, Math.min(height - 200, 800)),
        size: rand(5, 15), speed: rand(7, 18), phase: rand(0, 6.28), alpha: rand(0.035, 0.12),
      }));
      draw(0);
    }

    function fish(x, y, size, phase, alpha) {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = `rgba(123,220,235,${alpha})`;
      ctx.beginPath();
      ctx.moveTo(size, 0);
      ctx.bezierCurveTo(3, -size * 0.48, -size * 0.55, -size * 0.45, -size * 0.68, 0);
      ctx.bezierCurveTo(-size * 0.35, size * 0.42, 3, size * 0.48, size, 0);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-size * 0.6, 0);
      ctx.lineTo(-size * 1.1, -size * 0.4 * (0.7 + Math.sin(phase) * 0.3));
      ctx.lineTo(-size * 1.1, size * 0.4 * (0.7 + Math.sin(phase) * 0.3));
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function draw(dt) {
      ctx.clearRect(0, 0, width, height);
      // Slowly travelling light caustics
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        for (let x = 0; x <= width + 16; x += 16) {
          const y = 90 + i * 180 + Math.sin(x / 190 + elapsed * 0.15 + i) * 42 + Math.sin(x / 90 - elapsed * 0.1) * 9;
          if (!x) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(111,221,239,${0.022 + i * 0.003})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      for (const b of bubbles) {
        if (dt) {
          b.y -= b.speed * dt;
          if (b.y < -10) { b.y = height + 10; b.x = rand(0, width); }
        }
        const x = b.x + Math.sin(elapsed * 0.35 + b.phase) * 12;
        ctx.beginPath();
        ctx.arc(x, b.y, b.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(164,235,248,${b.alpha * 0.3})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(178,237,247,${b.alpha})`;
        ctx.lineWidth = 0.65;
        ctx.stroke();
        if (b.size > 2) {
          ctx.beginPath();
          ctx.arc(x - b.size * 0.25, b.y - b.size * 0.28, b.size * 0.18, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(237,255,255,${b.alpha + 0.1})`;
          ctx.fill();
        }
      }
      for (const f of fishes) {
        if (dt) { f.x += f.speed * dt; if (f.x > width + 40) f.x = -40; }
        fish(f.x, f.y + Math.sin(elapsed * 0.6 + f.phase) * 15, f.size, elapsed * 4 + f.phase, f.alpha);
      }
      ripples = ripples.filter((r) => r.age < 2.6);
      for (const r of ripples) {
        r.age += dt;
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, 14 + r.age * 60, 7 + r.age * 30, -0.15, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(154,239,247,${Math.max(0, (1 - r.age / 2.6) * 0.3)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    function tick(now) {
      if (!active || !inView || document.hidden) { raf = 0; return; }
      raf = requestAnimationFrame(tick);
      if (now - last < 1000 / maxFps) return;
      const dt = last ? Math.min((now - last) / 1000, 0.06) : 0.033;
      last = now;
      elapsed += dt;
      px += (targetX - px) * 0.06;
      py += (targetY - py) * 0.06;
      root.style.setProperty("--px", `${px.toFixed(2)}px`);
      root.style.setProperty("--py", `${py.toFixed(2)}px`);
      draw(dt);
    }

    function sync() {
      if (active && inView && !document.hidden && !raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      } else if ((!active || !inView || document.hidden) && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }

    engineRef.current = {
      setActive(value) {
        active = Boolean(value) && !reduce.matches;
        sync();
        if (!active) {
          targetX = 0;
          targetY = 0;
          root.style.setProperty("--px", "0px");
          root.style.setProperty("--py", "0px");
        }
      },
    };

    const onMove = (e) => {
      if (!pointerFine.matches || !active || !inView) return;
      targetX = (e.clientX / window.innerWidth - 0.5) * -17;
      targetY = (e.clientY / window.innerHeight - 0.5) * -10;
    };
    const onLeave = () => { targetX = 0; targetY = 0; };
    const onDown = (e) => {
      if (!active || e.target.closest("a, button, iframe") || ripples.length > 4) return;
      const box = canvas.getBoundingClientRect();
      const y = e.clientY - box.top;
      if (y >= 0 && y < height) ripples.push({ x: e.clientX - box.left, y, age: 0 });
    };

    document.addEventListener("visibilitychange", sync);
    root.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerdown", onDown, { passive: true });
    const io = new IntersectionObserver((entries) => { inView = entries[0].isIntersecting; sync(); }, { threshold: 0 });
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    resize();
    sync();

    return () => {
      cancelAnimationFrame(raf);
      raf = 0;
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerdown", onDown);
      engineRef.current = null;
    };
  }, [rootRef, canvasRef, activeRef, engineRef]);
}

/* ------------------------------------------------------------------ */
export default function LivingHero() {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const activeRef = useRef(true);
  const mapFrameRef = useRef(null);

  const [motionWanted, setMotionWanted] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [moonlit, setMoonlit] = useState(false);
  const [mapOn, setMapOn] = useState(false);
  const [status, setStatus] = useState({ text: "Showroom hours", open: null });

  useOcean(rootRef, canvasRef, activeRef, engineRef);

  // Restore saved preferences + follow the OS reduced-motion setting (client only)
  useEffect(() => {
    if (store.get("dolphin-motion") === "off") setMotionWanted(false);
    if (store.get("dolphin-light") === "moonlight") setMoonlit(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const active = motionWanted && !reduced;
  useEffect(() => {
    activeRef.current = active;
    engineRef.current?.setActive(active);
  }, [active]);

  // Live open/closed badge, evaluated in Goa time, refreshed each minute
  useEffect(() => {
    const update = () => setStatus(openStatus());
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (mapOn) mapFrameRef.current?.focus();
  }, [mapOn]);

  const toggleMotion = () => {
    const next = !motionWanted;
    setMotionWanted(next);
    store.set("dolphin-motion", next ? "on" : "off");
  };
  const toggleLight = () => {
    const next = !moonlit;
    setMoonlit(next);
    store.set("dolphin-light", next ? "moonlight" : "daylight");
  };

  const rootClass = `dolphin-site${active ? "" : " is-still"}${moonlit ? " is-moonlit" : ""}`;

  return (
    <div className={rootClass} ref={rootRef} data-nav="dark">
      {/* ---------- Living background ---------- */}
      <div className="aquarium" aria-hidden="true">
        <div className="water-color" />
        <div className="sun-rays" />
        <div className="scene-position">
          <img className="scene-art" src="/assets/living/aquarium-scene.webp" width="465" height="594" alt="" fetchPriority="high" />
        </div>
        <div className="reef-position">
          <img className="reef-art" src="/assets/living/reef-detail.webp" width="130" height="230" alt="" />
        </div>
        {/* the ported stylesheet positions the canvas by this id */}
        <canvas id="ocean-canvas" ref={canvasRef} />
        <div className="water-shade" />
        <div className="water-grain" />
      </div>

      {/* clears the fixed site nav, matching the package's 100px header */}
      <div className="living-top" aria-hidden="true" />

      {/* ---------- Hero ---------- */}
      <section className="hero wrap" id="home" aria-labelledby="hero-title">
        <div className="side-caption" aria-hidden="true">A LITTLE CLOSER TO WONDER</div>

        <motion.div className="hero-copy" initial="hidden" animate="show" variants={stagger(0.1, 0.15)}>
          <motion.p className="eyebrow" variants={rise}>
            <Icon name="crown" />
            YOUR AQUATIC ESCAPE · GOA
          </motion.p>
          <h1 id="hero-title">
            <motion.span className="h1-line" variants={rise}>More than pets.</motion.span>
            <br />
            <motion.span className="h1-line h1-gold" variants={rise}>A brighter world</motion.span>
            <br />
            <motion.span className="h1-line h1-em" variants={rise}>under one roof.</motion.span>
          </h1>
          <motion.p className="hero-description" variants={rise}>
            Some places sell the ordinary.
            <br />
            Step into a little wonder — beautiful aquariums,
            <br className="desktop-break" /> cherished companions, and care that stays with you.
          </motion.p>
          <motion.p className="micro-label" variants={rise}>
            AQUARIUMS <span>/</span> PETS <span>/</span> PEOPLE
          </motion.p>
          <motion.div className="hero-actions" variants={rise}>
            <a className="button button-gold" href="#our-world">
              <Icon name="paw" />
              Explore our world
              <Icon name="arrow" className="icon arrow" />
            </a>
            <a className="text-link" href={waLink()} target="_blank" rel="noopener noreferrer">
              <span className="round-icon"><Icon name="chat" /></span>
              <span>
                Let&apos;s talk
                <span className="link-caption">A real person. A little guidance.</span>
              </span>
            </a>
          </motion.div>
          <motion.div className="hero-note" variants={rise}>
            <span className="little-line" />
            Big on wonder. Even bigger on care.
          </motion.div>
        </motion.div>

        <motion.div
          className="scene-note"
          aria-hidden="true"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.9, ease: EASE }}
        >
          The extraordinary
          <br />
          is closer than you think.<span>✧</span>
        </motion.div>

        <motion.article
          className="location-card glass"
          id="visit"
          aria-labelledby="visit-title"
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
        >
          <div className="location-heading">
            <span className="eyebrow">YOUR NEXT LITTLE ADVENTURE</span>
            <Icon name="pin" />
          </div>
          <h2 id="visit-title">
            Find your way
            <br />
            to <em>wonder.</em>
          </h2>
          <div className="map-frame">
            {mapOn ? (
              <iframe
                ref={mapFrameRef}
                title="Google Maps: Dolphin Aquarium & Pets, Margao, Goa"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                src={mapEmbedUrl}
              />
            ) : (
              <button
                className="map-preview"
                type="button"
                onClick={() => setMapOn(true)}
                aria-label="Load interactive Google Maps. Connects to Google."
              >
                <span className="map-line line-one" />
                <span className="map-line line-two" />
                <span className="map-line line-three" />
                <span className="map-dot"><Icon name="pin" /></span>
                <span className="map-city">MARGAO, GOA</span>
                <span className="map-load">Load Google Maps <span>↗</span></span>
              </button>
            )}
          </div>
          <div className="location-footer">
            <div>
              <strong>{BUSINESS.name}</strong>
              <p>Navelim Flyover · Margao, Goa</p>
            </div>
            <a className="round-link" href={directionsUrl} target="_blank" rel="noopener noreferrer" aria-label="Get directions to Dolphin Aquarium & Pets">
              <Icon name="arrow" />
            </a>
          </div>
          <p className="map-privacy">
            {mapOn ? "Map unavailable? Use the directions arrow above." : "Interactive map loads only when you choose."}
          </p>
        </motion.article>

        <div className="ambient-toolbar">
          <span className="live-dot" />
          <span>A LITTLE CALM, ON DEMAND</span>
          <div className="ambient-buttons">
            <button
              type="button"
              onClick={toggleMotion}
              disabled={reduced}
              aria-pressed={active}
              aria-label={active ? "Pause ambient animation" : "Resume ambient animation"}
              title={reduced ? "Your device preference has disabled animation." : "Pause or resume the living background"}
            >
              <Icon name={active ? "pause" : "play"} />
              <span>{reduced ? "Reduced motion" : active ? "Motion on" : "Motion off"}</span>
            </button>
            <button
              type="button"
              onClick={toggleLight}
              aria-pressed={moonlit}
              aria-label={moonlit ? "Switch to daylight theme" : "Enable moonlight theme"}
            >
              <Icon name={moonlit ? "sun" : "moon"} />
              <span>{moonlit ? "Daylight" : "Moonlight"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ---------- Plan your visit ---------- */}
      <motion.section
        className="contact-strip wrap"
        aria-label="Plan your visit"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger(0.12, 0)}
      >
        <motion.div className="card-shell" variants={rise}>
          <a className="info-card glass" href={directionsUrl} target="_blank" rel="noopener noreferrer">
            <span className="info-icon"><Icon name="pin" /></span>
            <div>
              <h2>Come say hello.</h2>
              <p>
                Shop No G 4, Apollo apt down, Navelim Flyover,
                <br />
                Sanscar Society, Madgaon, Shirvodem, Goa 403601
              </p>
              <span className="card-link">Get directions <span>↗</span></span>
            </div>
          </a>
        </motion.div>
        <motion.div className="card-shell" variants={rise}>
          <div className="info-card glass">
            <span className="info-icon"><Icon name="clock" /></span>
            <div>
              <div className="hours-heading">
                <h2>A little time for wonder.</h2>
                <span
                  className={`status-pill${status.open ? " is-open" : ""}`}
                  title="Based on regular showroom hours in Goa. Holiday hours may differ."
                  aria-label={`${status.text}, based on regular Goa showroom hours. Holiday hours may differ.`}
                >
                  {status.text}
                </span>
              </div>
              <dl className="hours-list">
                <div><dt>Monday – Saturday</dt><dd>{weekdayHours}</dd></div>
                <div><dt>Sunday</dt><dd>{sundayHours}</dd></div>
              </dl>
            </div>
          </div>
        </motion.div>
        <motion.div className="card-shell" variants={rise}>
          <a className="info-card glass" href={telHref}>
            <span className="info-icon"><Icon name="phone" /></span>
            <div>
              <h2>Good care starts with hello.</h2>
              <p>Questions, ideas, or your very first aquarium.</p>
              <strong className="contact-number">{BUSINESS.phoneDisplay}</strong>
            </div>
          </a>
        </motion.div>
      </motion.section>

      {/* ---------- Find your kind of wonder ---------- */}
      <section className="world-section wrap" id="our-world" aria-labelledby="world-title">
        <motion.div
          className="section-heading"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={stagger(0.1, 0)}
        >
          <motion.div variants={rise}>
            <p className="eyebrow">SMALL WORLDS. ENDLESS POSSIBILITY.</p>
            <h2 id="world-title">Find your kind of <em>wonder.</em></h2>
          </motion.div>
          <motion.p variants={rise}>
            From the first little spark of an idea
            <br />
            to something you&apos;ll love coming home to.
          </motion.p>
        </motion.div>

        <motion.div
          className="world-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger(0.13, 0)}
        >
          {[
            {
              n: "01 / AQUATIC", art: "art-aquatic", icon: "fish", orbits: 3,
              h: ["Bring a little", "ocean home."],
              p: "Discover aquariums, beautiful aquatic life, and the joy of your own underwater world.",
              cta: "Let's plan your aquarium",
              msg: "Hi! I would love some help planning an aquarium.",
            },
            {
              n: "02 / COMPANIONS", art: "art-pets", icon: "paw", orbits: 2,
              h: ["A little friend.", "A whole lot of love."],
              p: "Thoughtful essentials and a friendly conversation about caring for your companion.",
              cta: "Talk pets with us",
              msg: "Hi! I would like to ask about your pets and pet-care essentials.",
            },
            {
              n: "03 / CARE & CONNECTION", art: "art-care", icon: "leaf", orbits: 2,
              h: ["The right start.", "A caring hand."],
              p: "Not sure where to begin? Tell us what you're dreaming of. We'll start there.",
              cta: "Ask us a question",
              msg: "Hi! I have a question about aquarium or pet care. Could you help?",
            },
          ].map((c) => (
            <motion.div className="card-shell" key={c.n} variants={rise}>
              <a className="world-card" href={waLink(c.msg)} target="_blank" rel="noopener noreferrer">
                <span className="world-number">{c.n}</span>
                <span className={`world-art ${c.art}`}>
                  <Icon name={c.icon} className="world-icon" />
                  <span className="orbit orbit-one" />
                  <span className="orbit orbit-two" />
                  {c.orbits > 2 && <span className="orbit orbit-three" />}
                </span>
                <div className="world-card-copy">
                  <h3>
                    {c.h[0]}
                    <br />
                    {c.h[1]}
                  </h3>
                  <p>{c.p}</p>
                  <span className="card-link">
                    {c.cta} <Icon name="arrow" />
                  </span>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
