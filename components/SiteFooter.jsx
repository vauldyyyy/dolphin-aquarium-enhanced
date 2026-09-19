"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionVideo from "./SectionVideo";
import SceneLayers from "./SceneLayers";

export default function SiteFooter() {
  return (
    <footer className="site-foot" data-nav="dark">
      <SectionVideo name="footer" scrim="dark" scrimStrength={0.6} opacity={0.7} fallback={<SceneLayers preset="footer" />} />
      <div className="wrap">
        <div>
          <div className="logo">DOLPHIN</div>
          <p style={{ maxWidth: 250, marginTop: 10 }}>
            Aquarium &amp; Pets — Goa&apos;s premier aquatic &amp; pet destination since 1992.
          </p>
        </div>
        <div>
          <h5>Explore</h5>
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/care-guides">Care Guides</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <h5>Visit</h5>
          <a href="tel:+919953858521">+91 99538 58521</a>
          <a href="https://wa.me/919953858521" target="_blank" rel="noopener">WhatsApp us</a>
          <a
            href="https://www.google.com/maps?q=Dolphin+Aquarium+and+Pets+Madgaon+Goa"
            target="_blank"
            rel="noopener"
          >
            Madgaon, Goa
          </a>
        </div>
        <div>
          <h5>Follow</h5>
          <motion.a
            href="https://www.instagram.com/dolphinaquariumandpets/"
            target="_blank" rel="noopener"
            whileHover={{ x: 3, color: "#d69a34" }}
          >
            Instagram
          </motion.a>
          <motion.a
            href="https://www.facebook.com/dolphinaquariumandpets"
            target="_blank" rel="noopener"
            whileHover={{ x: 3, color: "#d69a34" }}
          >
            Facebook
          </motion.a>
        </div>
        <div className="fb">
          © {new Date().getFullYear()} Dolphin Aquarium &amp; Pets · Madgaon, Goa · Ethically
          sourced. Lovingly raised.
        </div>
      </div>
    </footer>
  );
}
