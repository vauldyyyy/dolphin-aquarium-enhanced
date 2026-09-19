"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Icon from "./Icon";
import useOcean from "./useOcean";
import {
  BUSINESS,
  telHref,
  directionsUrl,
  mapEmbedUrl,
  weekdayHours,
  sundayHours,
  openStatus,
} from "../lib/business";

const EASE = [0.22, 0.61, 0.36, 1];
const rise = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};
const group = (gap = 0.1, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});
const inView = { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.25 } };

const mapsSearch = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.mapQuery)}`;

/* Faint botanical line art that sits on the right of each glass card */
function Sprig() {
  return (
    <svg className="vw-sprig" viewBox="0 0 64 96" aria-hidden="true">
      <path d="M32 94V12" />
      <path d="M32 78c-9-3-15-10-17-20M32 78c9-3 15-10 17-20" />
      <path d="M32 60c-8-3-13-9-15-18M32 60c8-3 13-9 15-18" />
      <path d="M32 42c-6-3-10-8-11-15M32 42c6-3 10-8 11-15" />
      <path d="M32 24c-4-2-6-6-7-10M32 24c4-2 6-6 7-10" />
    </svg>
  );
}

/* A soft cluster of tropical leaves for the frame edges */
function Leaves({ className, gid }) {
  const leaf = "M0 0C28-34 88-46 150-18 92-4 40 12 0 0Z";
  return (
    <svg className={className} viewBox="0 0 260 260" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2f7d4f" />
          <stop offset="1" stopColor="#0b3a2a" />
        </linearGradient>
      </defs>
      <g fill={`url(#${gid})`}>
        <path d={leaf} transform="translate(10 40) rotate(28)" />
        <path d={leaf} transform="translate(0 90) rotate(8) scale(1.1)" />
        <path d={leaf} transform="translate(20 150) rotate(-14) scale(.9)" />
        <path d={leaf} transform="translate(-10 10) rotate(52) scale(.8)" />
        <path d={leaf} transform="translate(40 200) rotate(-32) scale(.75)" />
      </g>
    </svg>
  );
}

export default function VisitWorld() {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const activeRef = useRef(true);
  const [status, setStatus] = useState({ text: "", open: null });

  useOcean(rootRef, canvasRef, activeRef, engineRef);

  useEffect(() => {
    const update = () => setStatus(openStatus());
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="vw" id="visit" ref={rootRef} data-nav="light" aria-labelledby="vw-title">
      {/* ---------------- living backdrop ---------------- */}
      <div className="vw-bg" aria-hidden="true">
        <div className="vw-water" />
        <div className="vw-rays" />
        <div className="vw-arch" />
        <div className="vw-scene">
          <img src="/assets/living/aquarium-scene.webp" width="465" height="594" alt="" />
        </div>
        <div className="vw-shade" />
        <img className="vw-reef" src="/assets/living/reef-detail.webp" width="130" height="230" alt="" />
        <Leaves className="vw-leaves vw-leaves--tl" gid="vwLeafTL" />
        <Leaves className="vw-leaves vw-leaves--r" gid="vwLeafR" />
        <canvas ref={canvasRef} className="vw-canvas" />
        <svg className="vw-waves" viewBox="0 0 1600 220" preserveAspectRatio="none">
          <defs>
            <linearGradient id="vwWave" x1="0" x2="1">
              <stop offset="0" stopColor="#8fdcff" stopOpacity="0" />
              <stop offset=".35" stopColor="#8fdcff" stopOpacity=".55" />
              <stop offset=".7" stopColor="#c6ecff" stopOpacity=".35" />
              <stop offset="1" stopColor="#8fdcff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0 150C260 70 520 190 820 118S1330 40 1600 104"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.4, ease: EASE }}
          />
          <motion.path
            d="M0 186C320 120 640 214 960 150S1420 96 1600 150"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.8, delay: 0.3, ease: EASE }}
          />
        </svg>
      </div>

      {/* ---------------- edge labels ---------------- */}
      <p className="vw-side-l" aria-hidden="true">GOA&apos;S PREMIER PET DESTINATION</p>
      <ul className="vw-side-r" aria-hidden="true">
        <li>AQUATIC</li>
        <li>PETS</li>
        <li>PEOPLE</li>
        <li>A BRIGHTER<br />TOMORROW</li>
      </ul>

      <div className="vw-inner">
        <div className="vw-top">
          {/* ---------- copy ---------- */}
          <motion.div className="vw-copy" {...inView} variants={group(0.1, 0.05)}>
            <motion.p className="vw-eyebrow" variants={rise}>
              <Icon name="crown" size={18} />
              EST. EXCELLENCE
            </motion.p>
            <h2 id="vw-title" className="vw-title">
              <motion.span className="vw-line" variants={rise}>More Than Pets.</motion.span>
              <br />
              <motion.span className="vw-line vw-gold" variants={rise}>A Brighter World</motion.span>
              <br />
              <motion.span className="vw-line vw-gold" variants={rise}>Under One Roof.</motion.span>
            </h2>
            <motion.p className="vw-lede" variants={rise}>
              Dolphin Aquarium &amp; Pets is Goa&apos;s premier destination for aquatic life and
              cherished companions, bringing unparalleled quality, expertise and care to every pet
              enthusiast.
            </motion.p>
            <motion.p className="vw-micro" variants={rise}>
              AQUARIUMS <span>/</span> PETS <span>/</span> EXPERTISE <span>/</span> LIFELONG SUPPORT
            </motion.p>
            <motion.div className="vw-actions" variants={rise}>
              <motion.a
                className="vw-btn-gold"
                href="/shop"
                whileHover={{ y: -3, boxShadow: "0 0 40px rgba(236,210,136,.42)" }}
                whileTap={{ scale: 0.97 }}
              >
                <Icon name="paw" size={20} />
                Explore Our World
                <Icon name="arrow" size={20} />
              </motion.a>
              <a className="vw-story" href="#aquatics">
                <motion.span
                  className="vw-play"
                  whileHover={{ scale: 1.08 }}
                  animate={{ boxShadow: ["0 0 0 0 rgba(255,255,255,.28)", "0 0 0 14px rgba(255,255,255,0)"] }}
                  transition={{ boxShadow: { duration: 2.2, repeat: Infinity, ease: "easeOut" } }}
                >
                  <Icon name="play" size={20} />
                </motion.span>
                <span>
                  <strong>Watch Our Story</strong>
                  <small>A glimpse into our passion</small>
                </span>
              </a>
            </motion.div>
          </motion.div>

          {/* ---------- location ---------- */}
          <div className="vw-right">
            <motion.p
              className="vw-script"
              aria-hidden="true"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 2.2, ease: "easeInOut", delay: 0.4 }}
            >
              Inspiring
              <br />
              a kinder
              <br />
              brighter world <span className="vw-heart">♡</span>
            </motion.p>

            <motion.article
              className="vw-location vw-glass"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            >
              <header className="vw-loc-head">
                <span className="vw-loc-title">
                  <Icon name="pin" size={22} />
                  Our Location
                </span>
                <span className="vw-loc-sub">Find us in Margao, Goa</span>
              </header>
              <div className="vw-map">
                <iframe
                  title="Map: Dolphin Aquarium & Pets, Margao, Goa"
                  src={mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <a
                  className="vw-map-expand"
                  href={mapsSearch}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open the map in Google Maps"
                >
                  <Icon name="expand" size={18} />
                </a>
              </div>
              <footer className="vw-loc-foot">
                <div>
                  <strong>{BUSINESS.name}</strong>
                  <p>
                    Shop No G 4, Apollo apt down, Navelim Flyover,
                    <br />
                    Sanscar Society, Madgaon, Shirvodem, Goa 403601
                  </p>
                </div>
                <motion.a
                  className="vw-btn-outline"
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Get Directions <Icon name="arrow" size={17} />
                </motion.a>
              </footer>
            </motion.article>
          </div>
        </div>

        {/* ---------- visit cards ---------- */}
        <motion.div className="vw-cards" {...inView} variants={group(0.12)}>
          <motion.a className="vw-card vw-glass" href={directionsUrl} target="_blank" rel="noopener noreferrer" variants={rise} whileHover={{ y: -5 }}>
            <span className="vw-card-ic"><Icon name="pin" size={24} /></span>
            <div>
              <h3>Visit Our Showroom</h3>
              <p>
                Shop No G 4, Apollo apt down,
                <br />
                Navelim Flyover, Sanscar Society,
                <br />
                Madgaon, Shirvodem, Goa 403601
              </p>
            </div>
            <Sprig />
          </motion.a>

          <motion.div className="vw-card vw-glass" variants={rise} whileHover={{ y: -5 }}>
            <span className="vw-card-ic"><Icon name="clock" size={24} /></span>
            <div>
              <h3>
                Showroom Hours
                {status.text && (
                  <span
                    className={`vw-pill${status.open ? " is-open" : ""}`}
                    title="Based on regular showroom hours in Goa. Holiday hours may differ."
                  >
                    {status.text}
                  </span>
                )}
              </h3>
              <dl className="vw-hours">
                <div><dt>Mon - Sat</dt><dd>{weekdayHours}</dd></div>
                <div><dt>Sun</dt><dd>{sundayHours}</dd></div>
              </dl>
            </div>
            <Sprig />
          </motion.div>

          <motion.a className="vw-card vw-glass" href={telHref} variants={rise} whileHover={{ y: -5 }}>
            <span className="vw-card-ic"><Icon name="phone" size={24} /></span>
            <div>
              <h3>Concierge Service</h3>
              <p>Have a question? We&apos;re here to help.</p>
              <strong className="vw-phone">{BUSINESS.phoneDisplay}</strong>
            </div>
            <Sprig />
          </motion.a>
        </motion.div>

        {/* ---------- feature strip ---------- */}
        <motion.div className="vw-features" {...inView} variants={group(0.1)}>
          {[
            ["fish", "PREMIUM AQUARIUM SETUPS", "Bringing underwater beauty home"],
            ["paw", "A WIDE RANGE OF PETS", "For every kind of companion"],
            ["leaf", "EXPERT GUIDANCE", "From setup to lifelong care"],
            ["heart", "A COMMUNITY OF PET LOVERS", "Because pets make life brighter"],
          ].map(([icon, title, sub]) => (
            <motion.div className="vw-feature" key={title} variants={rise}>
              <Icon name={icon} size={34} strokeWidth={1.2} />
              <div>
                <strong>{title}</strong>
                <span>{sub}</span>
              </div>
            </motion.div>
          ))}
          <motion.div className="vw-goa" variants={rise}>
            <span className="vw-goa-script" aria-hidden="true">Goa</span>
            <span className="vw-goa-line">
              HAPPIER PETS
              <br />
              BRIGHTER PEOPLE
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
