"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const LINKS = [
  { href: "/#aquatics", label: "Aquatics" },
  { href: "/#companions", label: "Companions" },
  { href: "/#services", label: "Services" },
  { href: "/#founders", label: "Founders" },
  { href: "/shop", label: "Shop" },
  { href: "/care-guides", label: "Care Guides" },
  { href: "/#visit", label: "Contact" },
];

const EASE = [0.22, 0.61, 0.36, 1];

export default function Nav({ staticLight = false, watchId = "companions" }) {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(staticLight);
  const [light, setLight] = useState(staticLight);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    if (staticLight) return;
    setSolid(v > 40);
    const el = document.getElementById(watchId);
    if (el) setLight(el.getBoundingClientRect().top <= window.innerHeight * 0.5);
  });

  const ink = light ? "rgba(42,33,24,.62)" : "rgba(255,255,255,.62)";
  const inkStrong = light ? "#2a2118" : "#ffffff";

  return (
    <>
      <motion.header
        className="nav"
        initial={false}
        animate={{
          backgroundColor: solid
            ? light
              ? "rgba(246,241,232,0.72)"
              : "rgba(5,5,5,0.6)"
            : "rgba(5,5,5,0)",
          borderBottomColor: solid
            ? light
              ? "rgba(42,33,24,0.1)"
              : "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0)",
          backdropFilter: solid ? "blur(14px) saturate(140%)" : "blur(0px)",
        }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="nav-inner">
          <motion.div animate={{ color: inkStrong }} transition={{ duration: 0.5, ease: EASE }}>
            <Link className="nav-logo" href="/">
              DOLPHIN
            </Link>
          </motion.div>

          <motion.nav
            className="nav-links"
            aria-label="Primary"
            animate={{ color: ink }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {LINKS.map((l) => (
              <motion.span key={l.href} whileHover={{ color: inkStrong, y: -1 }}>
                <Link href={l.href}>{l.label}</Link>
              </motion.span>
            ))}
          </motion.nav>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <motion.a
              className="nav-cta"
              href="https://wa.me/919953858521"
              target="_blank"
              rel="noopener"
              animate={{
                background: light
                  ? "linear-gradient(120deg,#d69a34,#3fa65b)"
                  : "linear-gradient(120deg,#ff3d43,#ff9a3d)",
              }}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              Visit the store
            </motion.a>

            <motion.button
              className="burger"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              animate={{ color: inkStrong }}
              whileTap={{ scale: 0.92 }}
            >
              <motion.svg width="20" height="14" viewBox="0 0 20 14">
                <motion.rect
                  width="20" height="2" rx="1" fill="currentColor"
                  animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
                  style={{ originX: 0.5, originY: 0.5 }}
                  transition={{ duration: 0.3, ease: EASE }}
                />
                <motion.rect
                  y="6" width="20" height="2" rx="1" fill="currentColor"
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.rect
                  y="12" width="20" height="2" rx="1" fill="currentColor"
                  animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
                  style={{ originX: 0.5, originY: 0.5 }}
                  transition={{ duration: 0.3, ease: EASE }}
                />
              </motion.svg>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.32, ease: EASE }}
          >
            {LINKS.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i, duration: 0.3, ease: EASE }}
              >
                <Link href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
