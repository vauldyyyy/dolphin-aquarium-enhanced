"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "../../components/Nav";
import Icon from "../../components/Icon";
import SiteFooter from "../../components/SiteFooter";
import WhatsAppFloat from "../../components/WhatsAppFloat";
import { BUSINESS, telHref, waLink } from "../../lib/business";

const services = [
  {
    title: "Grooming & hygiene",
    image: "/assets/products/grooming.jpg",
    imageAlt: "Pet grooming products and accessories",
    category: "LOOK & FEEL",
    description: "A little extra care to help your companion feel comfortable and look their best.",
    details: ["Coat and skin care", "Bathing and tidy-ups", "Species-appropriate advice"],
  },
  {
    title: "Health & treatment enquiry",
    image: "/assets/care-safety.jpg",
    imageAlt: "Animal care and safety",
    category: "HEALTH & CARE",
    description: "Tell us what is going on. We will discuss the next suitable step for your animal.",
    details: ["Care concerns", "Treatment enquiries", "First-aid guidance"],
  },
  {
    title: "Preventive care",
    image: "/assets/pet-lifestyle.jpg",
    imageAlt: "Companion animal in a home setting",
    category: "STAY WELL",
    description: "Plan ahead for routine care and the essentials that support long-term wellbeing.",
    details: ["Vaccination enquiries", "Microchipping", "Nutrition and care advice"],
  },
  {
    title: "Aquatic & habitat care",
    image: "/assets/aquarium.jpg",
    imageAlt: "Aquarium with aquatic plants and fish",
    category: "FINS & HABITATS",
    description: "Support for fish, aquariums and the systems that keep a habitat healthy.",
    details: ["Fish care concerns", "Water and filtration", "Aquarium maintenance"],
  },
];

const animalTypes = ["Dog", "Cat", "Fish", "Bird", "Small pet", "Other animal"];

const todayInGoa = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: BUSINESS.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

export default function AppointmentPage() {
  const [service, setService] = useState(services[0].title);
  const [phoneError, setPhoneError] = useState("");

  function submitRequest(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (key) => String(form.get(key) || "").trim();
    const phone = value("phone");

    const digits = phone.replace(/\D/g, "");
    if (!/^[+\d\s()-]{7,20}$/.test(phone) || digits.length < 7 || digits.length > 15) {
      setPhoneError("Please enter a phone number we can contact you on.");
      event.currentTarget.elements.phone.focus();
      return;
    }
    setPhoneError("");

    const message = [
      "*Appointment request — Dolphin Aquarium & Pets*",
      "",
      `Name: ${value("name")}`,
      `Phone: ${phone}`,
      `Animal: ${value("animal")}`,
      value("petName") ? `Pet's name: ${value("petName")}` : null,
      `Service: ${service}`,
      `Preferred date: ${value("date")}`,
      `Preferred time: ${value("time")}`,
      value("notes") ? `Details: ${value("notes")}` : null,
      "",
      "Please let me know what is available and confirm the appointment.",
    ].filter((line) => line !== null).join("\n");

    window.location.href = waLink(message);
  }

  return (
    <>
      <Nav />
      <main id="main" className="appointment-page">
        <section className="appointment-hero" data-nav="dark">
          <div className="appointment-hero-inner wrap">
            <div className="appointment-hero-copy">
              <p className="appointment-crumbs"><Link href="/">Home</Link><span>/</span> Book Your Appointment</p>
              <p className="appointment-kicker">CARE FOR EVERY COMPANION</p>
              <h1>Good care begins with a conversation.</h1>
              <p className="appointment-lede">
                From grooming and routine care to treatment questions and aquatic wellbeing,
                tell us what your animal needs. Our team will help you plan the next step.
              </p>
              <div className="appointment-hero-actions">
                <a className="appointment-button appointment-button--gold" href="#booking">
                  Book Your Appointment <Icon name="arrow" size={18} />
                </a>
                <a className="appointment-text-link" href={telHref}>
                  <Icon name="phone" size={18} /> Call {BUSINESS.phoneDisplay}
                </a>
              </div>
              <p className="appointment-hero-note">Dogs · Cats · Fish · Birds · Small pets · Other animals</p>
            </div>
            <div className="appointment-hero-image">
              <img className="appointment-hero-primary" src="/assets/pet-lifestyle.jpg" alt="Golden retriever resting comfortably at home" />
              <div className="appointment-hero-minis">
                <img src="/assets/persian-cat.jpg" alt="Persian cat" />
                <img src="/assets/aquarium.jpg" alt="Aquarium with fish" />
              </div>
              <div className="appointment-hero-badge"><Icon name="heart" size={19} /> Thoughtful care since 1992</div>
            </div>
          </div>
        </section>

        <section className="appointment-services" data-nav="light" aria-labelledby="appointment-services-heading">
          <div className="wrap">
            <div className="appointment-section-heading">
              <div>
                <p className="appointment-kicker">HOW WE CAN HELP</p>
                <h2 id="appointment-services-heading">Care that meets them where they are.</h2>
              </div>
              <p>Choose a service below to start your request. We will confirm availability and the right care for your animal.</p>
            </div>
            <div className="appointment-service-grid">
              {services.map((item) => (
                <article className="appointment-service-card" key={item.title}>
                  <img src={item.image} alt={item.imageAlt} loading="lazy" />
                  <div className="appointment-service-content">
                    <p className="appointment-card-kicker">{item.category}</p>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                    <a href="#booking" onClick={() => setService(item.title)}>
                      Request this service <Icon name="arrow" size={17} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <p className="appointment-service-note">Have a different animal or need something else? Choose “Other animal” in the form and tell us a little more.</p>
          </div>
        </section>

        <section className="appointment-booking" id="booking" data-nav="light" aria-labelledby="appointment-booking-heading">
          <div className="wrap appointment-booking-grid">
            <div className="appointment-booking-intro">
              <p className="appointment-kicker">YOUR VISIT STARTS HERE</p>
              <h2 id="appointment-booking-heading">Book Your Appointment</h2>
              <p>Share a few details and we will reply on WhatsApp to confirm a suitable appointment. Your preferred date and time are a request until we confirm them.</p>
              <div className="appointment-steps" aria-label="How booking works">
                <div><span>01</span><p><strong>Tell us about your animal</strong><br />Pick the care you are looking for.</p></div>
                <div><span>02</span><p><strong>Choose a preferred time</strong><br />Let us know what works for you.</p></div>
                <div><span>03</span><p><strong>Confirm with our team</strong><br />Send the prepared request on WhatsApp.</p></div>
              </div>
              <div className="appointment-urgent">
                <Icon name="phone" size={19} />
                <p>Concerned about an urgent illness or injury? <a href={telHref}>Call us directly.</a></p>
              </div>
            </div>

            <form className="appointment-form" onSubmit={submitRequest}>
              <div className="appointment-form-header">
                <span><Icon name="paw" size={22} /></span>
                <div><h3>Tell us about your companion</h3><p>Fields marked * are required.</p></div>
              </div>
              <div className="appointment-field-row">
                <div className="appointment-field">
                  <label htmlFor="booking-name">Your name *</label>
                  <input id="booking-name" name="name" autoComplete="name" required minLength={2} placeholder="Your full name" />
                </div>
                <div className="appointment-field">
                  <label htmlFor="booking-phone">Phone / WhatsApp *</label>
                  <input id="booking-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required placeholder="Your phone number" aria-invalid={!!phoneError} aria-describedby={phoneError ? "booking-phone-error" : undefined} onChange={() => phoneError && setPhoneError("")} />
                  {phoneError && <p className="appointment-error" id="booking-phone-error">{phoneError}</p>}
                </div>
              </div>
              <div className="appointment-field-row">
                <div className="appointment-field">
                  <label htmlFor="booking-animal">Animal *</label>
                  <select id="booking-animal" name="animal" required defaultValue="">
                    <option value="" disabled>Select an animal</option>
                    {animalTypes.map((animal) => <option key={animal}>{animal}</option>)}
                  </select>
                </div>
                <div className="appointment-field">
                  <label htmlFor="booking-pet-name">Pet&apos;s name</label>
                  <input id="booking-pet-name" name="petName" placeholder="If they have one" />
                </div>
              </div>
              <div className="appointment-field">
                <label htmlFor="booking-service">What do you need help with? *</label>
                <select id="booking-service" name="service" value={service} onChange={(event) => setService(event.target.value)} required>
                  {services.map((item) => <option key={item.title}>{item.title}</option>)}
                  <option>Something else</option>
                </select>
              </div>
              <div className="appointment-field-row">
                <div className="appointment-field">
                  <label htmlFor="booking-date">Preferred date *</label>
                  <input id="booking-date" name="date" type="date" min={todayInGoa()} required />
                </div>
                <div className="appointment-field">
                  <label htmlFor="booking-time">Preferred time *</label>
                  <select id="booking-time" name="time" required defaultValue="">
                    <option value="" disabled>Select a time</option>
                    <option>Morning</option><option>Afternoon</option><option>Evening</option><option>Flexible</option>
                  </select>
                </div>
              </div>
              <div className="appointment-field">
                <label htmlFor="booking-notes">Anything we should know?</label>
                <textarea id="booking-notes" name="notes" rows={4} placeholder="Symptoms, grooming needs, species, or anything that helps us prepare" />
              </div>
              <button className="appointment-button appointment-button--submit" type="submit">
                Continue to WhatsApp <Icon name="arrow" size={18} />
              </button>
              <p className="appointment-form-footnote">We will prepare your message; please press send in WhatsApp. Your appointment is confirmed only after our team replies.</p>
            </form>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
