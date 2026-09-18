"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Nav from "../../components/Nav";
import Reveal from "../../components/Reveal";
import SiteFooter from "../../components/SiteFooter";
import LiveBackground from "../../components/LiveBackground";
import { ScrollProgress, Words, Magnetic } from "../../components/motionKit";

export default function Contact() {
  const [status, setStatus] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const g = (k) => (f.get(k) || "").toString().trim();
    const subject = `Website enquiry: ${g("topic")}${g("name") ? " — " + g("name") : ""}`;
    const body = `Name: ${g("name")}\nEmail: ${g("email")}\nPhone: ${g("phone")}\nTopic: ${g("topic")}\n\n${g("msg")}`;
    window.location.href = `mailto:info@dolphinaquariumandpets.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setStatus("Opening your email app… If nothing happens, WhatsApp us at +91 99538 58521.");
  };

  return (
    <>
      <ScrollProgress />
      <Nav staticLight />
      <main>
        <section className="page-top has-live-bg">
          <LiveBackground variant="forest" density={0.8} />
          <Reveal className="wrap">
            <p className="crumbs">
              <a href="/">Home</a> / Contact
            </p>
            <p className="eyebrow eyebrow--gold">Get in touch</p>
            <Words className="display" text="Visit Us in Madgaon, Goa" as={motion.h1} />
            <p className="content-lede">
              Come meet our fish and pets in person, or reach out — we&apos;re happy to help with
              advice, custom builds and availability.
            </p>
          </Reveal>
        </section>

        <section className="content content--cream">
          <div className="wrap contact-grid">
            <Reveal>
              <h2 className="sec-title" style={{ marginBottom: 16 }}>
                Send an Enquiry
              </h2>
              <form className="form2" onSubmit={onSubmit}>
                <div className="f2-row">
                  <div className="f2">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" autoComplete="name" required />
                  </div>
                  <div className="f2">
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" />
                  </div>
                </div>
                <div className="f2">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" autoComplete="email" required />
                </div>
                <div className="f2">
                  <label htmlFor="topic">Topic</label>
                  <select id="topic" name="topic" defaultValue="General enquiry">
                    <option>General enquiry</option>
                    <option>Custom aquarium build</option>
                    <option>Buying a pet</option>
                    <option>Fish / livestock availability</option>
                    <option>Grooming appointment</option>
                    <option>Vaccination / microchipping</option>
                  </select>
                </div>
                <div className="f2">
                  <label htmlFor="msg">Message</label>
                  <textarea id="msg" name="msg" rows={5} placeholder="Tell us what you're looking for…" />
                </div>
                <motion.button
                  className="btn btn--grad"
                  type="submit"
                  whileHover={{ y: -2, boxShadow: "0 18px 40px rgba(63,166,91,.45)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Send enquiry
                </motion.button>
                {status && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ fontSize: ".86rem", color: "rgba(42,33,24,.7)" }}
                  >
                    {status}
                  </motion.p>
                )}
                <p style={{ fontSize: ".86rem", color: "rgba(42,33,24,.6)" }}>
                  Prefer to chat?{" "}
                  <a
                    href="https://wa.me/919953858521"
                    target="_blank"
                    rel="noopener"
                    style={{ color: "var(--leaf)", fontWeight: 600 }}
                  >
                    Message us on WhatsApp →
                  </a>
                </p>
              </form>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="visit-details" style={{ marginTop: 0, gridTemplateColumns: "1fr", textAlign: "left" }}>
                <div className="vd">
                  <span className="vd-k">Showroom</span>
                  <span className="vd-v">
                    Shop No G-4, Apollo Apt, Navelim Flyover, Sanscar Society, Madgaon, Shirvodem,
                    Goa 403601
                  </span>
                </div>
                <div className="vd">
                  <span className="vd-k">Hours</span>
                  <span className="vd-v">Mon–Sat 9:00 AM – 9:00 PM · Sun 9:30 AM – 2:00 PM</span>
                </div>
                <div className="vd">
                  <span className="vd-k">Call / WhatsApp</span>
                  <span className="vd-v">
                    <a href="tel:+919953858521">+91 99538 58521</a>
                  </span>
                </div>
              </div>
              <iframe
                className="cmap"
                style={{ marginTop: 18 }}
                title="Map to Dolphin Aquarium & Pets, Madgaon, Goa"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Dolphin+Aquarium+and+Pets+Madgaon+Goa&output=embed"
              />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
