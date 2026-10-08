"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "../../components/Nav";
import SiteFooter from "../../components/SiteFooter";
import WhatsAppFloat from "../../components/WhatsAppFloat";
import { waLink } from "../../lib/business";

const interests = ["Aquarium & fish care", "Pet care & grooming", "Retail & customer service", "Tank design & maintenance", "Other / open application"];

export default function CareersPage() {
  const [status, setStatus] = useState("");
  const [fileName, setFileName] = useState("");

  async function submitApplication(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (key) => String(form.get(key) || "").trim();
    const cv = form.get("cv");

    if (!(cv instanceof File) || cv.size === 0) {
      setStatus("Please choose your CV before continuing.");
      return;
    }
    if (cv.size > 10 * 1024 * 1024) {
      setStatus("Please choose a CV smaller than 10 MB.");
      return;
    }

    const message = [
      "*Careers application — Dolphin Aquarium & Pets*",
      "",
      `Name: ${value("name")}`,
      `Phone: ${value("phone")}`,
      `Email: ${value("email")}`,
      `Interested in: ${value("interest")}`,
      `Experience: ${value("experience")}`,
      value("note") ? `About me: ${value("note")}` : null,
      "",
      "My CV is attached to this chat.",
    ].filter(Boolean).join("\n");

    if (navigator.canShare?.({ files: [cv] }) && navigator.share) {
      try {
        await navigator.share({ files: [cv], text: message, title: "Dolphin Aquarium & Pets careers application" });
        setStatus("Your share sheet opened. Choose WhatsApp and send the message with your CV to +91 99538 58521.");
        return;
      } catch (error) {
        if (error?.name === "AbortError") {
          setStatus("Sharing was cancelled. You can try again when ready.");
          return;
        }
      }
    }

    window.open(waLink(message), "_blank", "noopener,noreferrer");
    setStatus(`WhatsApp opened with your application. Attach ${cv.name} in the chat before you press send.`);
  }

  return (
    <>
      <Nav staticLight />
      <main id="main" className="careers-page">
        <section className="careers-hero" data-nav="dark">
          <div className="wrap careers-hero-grid">
            <div>
              <p className="crumbs"><Link href="/">Home</Link> / Careers</p>
              <p className="eyebrow eyebrow--gold">Join our team</p>
              <h1>Grow with the world of pets and aquatics.</h1>
              <p>Tell us where your interests lie and share your CV. We welcome people who care about animals, enjoy helping customers and want to learn.</p>
              <a href="#apply" className="careers-cta">Apply on WhatsApp <span aria-hidden="true">↗</span></a>
            </div>
            <img src="/assets/aquarium.jpg" alt="Colourful aquarium at Dolphin Aquarium & Pets" />
          </div>
        </section>

        <section className="content content--cream" data-nav="light" id="apply">
          <div className="wrap careers-grid">
            <div className="careers-intro">
              <p className="eyebrow eyebrow--gold">Your application</p>
              <h2 className="sec-title">Introduce yourself</h2>
              <p>Choose an area that interests you. We will review your application and contact you if there is a suitable opportunity.</p>
              <div className="careers-steps">
                <p><strong>01</strong> Fill in your details</p>
                <p><strong>02</strong> Select your CV</p>
                <p><strong>03</strong> Share it with us on WhatsApp</p>
              </div>
              <p className="careers-note">Your details and CV stay on your device until you share them. This form does not store applications on the website.</p>
            </div>
            <form className="careers-form" onSubmit={submitApplication}>
              <h3>Apply to Dolphin</h3>
              <p>All fields marked * are required.</p>
              <div className="careers-fields-two">
                <label>Full name *<input name="name" autoComplete="name" minLength={2} required placeholder="Your name" /></label>
                <label>Phone / WhatsApp *<input name="phone" type="tel" autoComplete="tel" pattern="[+0-9() .-]{7,20}" required placeholder="Your number" /></label>
              </div>
              <label>Email *<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
              <label>Area of interest *<select name="interest" required defaultValue=""><option value="" disabled>Select an area</option>{interests.map((interest) => <option key={interest}>{interest}</option>)}</select></label>
              <label>Experience *<select name="experience" required defaultValue=""><option value="" disabled>Select experience</option><option>New to the field</option><option>Less than 2 years</option><option>2–5 years</option><option>More than 5 years</option></select></label>
              <label>Tell us about yourself<textarea name="note" rows={4} maxLength={1000} placeholder="Your skills, experience or why you would like to join" /></label>
              <label>CV / résumé *<input name="cv" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required onChange={(event) => setFileName(event.target.files?.[0]?.name || "")} /></label>
              <p className="careers-file-help">PDF, DOC or DOCX · up to 10 MB. {fileName && `Selected: ${fileName}`}</p>
              <button type="submit" className="careers-cta">Continue to WhatsApp <span aria-hidden="true">↗</span></button>
              <p className="careers-file-help">On devices without file sharing, attach your CV in the WhatsApp chat before sending. An application is complete only when you send both your details and CV.</p>
              {status && <p className="careers-status" role="status">{status}</p>}
            </form>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
