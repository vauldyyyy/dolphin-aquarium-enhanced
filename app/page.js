"use client";

import { motion, AnimatePresence } from "framer-motion";
import Nav from "../components/Nav";
import Reveal from "../components/Reveal";
import ScrollSequence from "../components/ScrollSequence";
import VisitWorld from "../components/VisitWorld";
import HeartSection from "../components/HeartSection";
import SiteFooter from "../components/SiteFooter";
import WhatsAppFloat from "../components/WhatsAppFloat";
import LiveBackground from "../components/LiveBackground";
import GardenBackground from "../components/GardenBackground";
import CompanionsGallery from "../components/CompanionsGallery";
import Immersion from "../components/Immersion";
import { useImageSequence } from "../components/useImageSequence";
import {
  ScrollProgress,
  CountUp,
  lakhFormat,
  Words,
  Marquee,
} from "../components/motionKit";

const EASE = [0.22, 0.61, 0.36, 1];
const AQUATIC_COUNT = 240;
const GARDEN_COUNT = 300;

/* ----------------------------- Beats ----------------------------- */
const aquaticBeats = [
  {
    align: "center",
    range: [0, 0.2],
    content: (
      <>
        <p className="eyebrow eyebrow--aqua">DOLPHIN · AQUARIUM &amp; PETS · SINCE 1992</p>
        <h1 className="display grad-aqua">
          Living art,
          <br />
          in motion.
        </h1>
        <p className="lede">
          Meet the chili red arowana — the crowned centrepiece of our aquatic collection.
        </p>
        <div className="scroll-hint">
          <motion.i
            animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: EASE }}
            style={{ originY: 0 }}
          />
          Scroll
        </div>
      </>
    ),
  },
  {
    align: "left",
    range: [0.24, 0.5],
    content: (
      <>
        <h2 className="display">Bred for brilliance.</h2>
        <p className="body">
          Every scale graded by hand for depth of red, symmetry and shine. Only a rare few reach
          the intensity we display.
        </p>
      </>
    ),
  },
  {
    align: "right",
    range: [0.54, 0.8],
    content: (
      <>
        <h2 className="display">Obsessive care.</h2>
        <p className="body">
          Precision-tuned water, a specialist diet and full provenance for every fish.
        </p>
      </>
    ),
  },
  {
    align: "center",
    range: [0.84, 1.001],
    content: <h2 className="display display--xl grad-aqua">A companion worth the wait.</h2>,
  },
];

const gardenBeats = [
  {
    align: "center",
    range: [0, 0.2],
    content: (
      <>
        <p className="eyebrow eyebrow--gold">DOLPHIN · COMPANIONS</p>
        <h2 className="display grad-forest">Meet the whole family.</h2>
        <p className="lede lede--dark">
          Dogs, cats, birds and everything in between — ethically raised, socialised and ready for
          home.
        </p>
      </>
    ),
  },
  {
    align: "left",
    range: [0.24, 0.5],
    content: (
      <>
        <h2 className="display dark">
          Dogs &amp; cats,
          <br />
          full of character.
        </h2>
        <p className="body body--dark">
          Hand-socialised from day one — confident, healthy and bonded, so they settle into your
          home with ease.
        </p>
      </>
    ),
  },
  {
    align: "right",
    range: [0.54, 0.78],
    content: (
      <>
        <h2 className="display dark">
          Birds that bring
          <br />a home to life.
        </h2>
        <p className="body body--dark">
          Bright, curious and full of song — companions that fill quiet rooms with colour and sound.
        </p>
      </>
    ),
  },
  {
    align: "center",
    range: [0.82, 1.001],
    content: <h2 className="display display--xl grad-forest">Fins, fur &amp; feathers.</h2>,
  },
];

/* ----------------------------- Page ----------------------------- */
export default function Home() {
  const aquatic = useImageSequence("/frames/aquatic", AQUATIC_COUNT, true);
  // Garden starts loading once the aquatic chapter has fully arrived
  const garden = useImageSequence("/frames/garden", GARDEN_COUNT, aquatic.done);

  // Brief intro while the opening frames buffer; the sequence falls back to the
  // nearest decoded frame, so the remainder streams in behind it.
  const BUFFER = 30;
  const ready = aquatic.loaded >= BUFFER || aquatic.done;
  const pct = Math.min(100, Math.round((aquatic.loaded / BUFFER) * 100));

  return (
    <>
      <AnimatePresence>
        {!ready && (
          <motion.div
            className="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="loader-inner">
              <img className="loader-logo" src="/assets/logo-white.png" alt="Dolphin Aquarium & Pets" />
              <div className="loader-sub">Since 1992 · Madgaon, Goa</div>
              <div className="loader-bar">
                <motion.i animate={{ width: `${pct}%` }} transition={{ ease: EASE }} />
              </div>
              <div className="loader-pct">{pct}%</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollProgress />
      <Nav />

      <main id="main">
        {/* ---------- Chapter 1 — Aquatic ---------- */}
        <ScrollSequence
          id="aquatics"
          imagesRef={aquatic.imagesRef}
          count={AQUATIC_COUNT}
          loaded={aquatic.loaded}
          heightVh={460}
          theme="dark"
          bg="#050505"
          beats={aquaticBeats}
        />

        {/* ---------- Interlude ---------- */}
        <section className="interlude has-live-bg" id="care" data-nav="dark">
          <LiveBackground variant="aqua" density={1.1} />
          <div className="wrap">
            <Reveal>
              <p className="interlude-eyebrow">A LIVING COLLECTION, CARED FOR SINCE 1992</p>
            </Reveal>
            <div className="interlude-grid">
              {[
                [<CountUp key="a" to={30} suffix="+" />, "years perfecting living displays"],
                [<CountUp key="b" to={100} suffix="%" />, "certified provenance"],
                ["24/7", "monitored life-support systems"],
              ].map(([n, label], i) => (
                <Reveal className="s" key={label} delay={i * 0.1}>
                  <b>{n}</b>
                  <span>{label}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Transition ---------- */}
        <section className="transition" data-nav="dark">
          <Reveal>
            <p className="transition-line">
              But a home isn&apos;t complete with fins alone.
              <br />
              <em>Some companions walk beside you, some sing from the branches.</em>
            </p>
          </Reveal>
        </section>

        {/* ---------- Chapter 2 — Garden ---------- */}
        <ScrollSequence
          id="companions"
          imagesRef={garden.imagesRef}
          count={GARDEN_COUNT}
          loaded={garden.loaded}
          heightVh={520}
          theme="warm"
          bg="#f6f1e8"
          beats={gardenBeats}
        />

        {/* ---------- Companions gallery ---------- */}
        <CompanionsGallery />

        {/* ---------- Services ---------- */}
        <section className="content content--cream has-live-bg" id="services" data-nav="light">
          <GardenBackground leaves={6} paws={3} pollen={0.8} />
          <div className="wrap">
            <Reveal className="center">
              <p className="eyebrow eyebrow--gold">What we offer</p>
              <Words className="display dark" text="Products & Services" />
              <p className="content-lede">
                Comprehensive solutions for all your aquatic and pet care needs — the same care
                behind everything you just saw.
              </p>
            </Reveal>
            <div className="cards-3">
              {[
                {
                  t: "Aquatics & Aquascaping",
                  img: "/assets/aquarium.jpg",
                  items: [
                    "Designer & custom-built aquariums",
                    "Exotic, ornamental & edible fish",
                    "Live seafood solutions",
                    "Indoor & outdoor filtration systems",
                    "Waterfalls & water features",
                  ],
                },
                {
                  t: "Pets & Lifestyle",
                  img: "/assets/pet-lifestyle.jpg",
                  items: [
                    "Domestic & aided animals",
                    "Premium pet food & nutrition",
                    "Luxury pet accessories",
                    "Walk-in aviaries (design & execution)",
                    "Pet grooming",
                  ],
                },
                {
                  t: "Care, Safety & Compliance",
                  img: "/assets/care-safety.jpg",
                  items: [
                    "DNA testing & microchipping",
                    "Pet vaccinations",
                    "Basic animal first aid",
                    "Preventive care",
                  ],
                },
              ].map((c, i) => (
                <Reveal
                  className="ccard"
                  key={c.t}
                  delay={i * 0.12}
                  whileHover={{ y: -6, boxShadow: "0 24px 54px rgba(42,33,24,.14)" }}
                >
                  <img className="svc-banner" src={c.img} alt={c.t} loading="lazy" />
                  <h3>{c.t}</h3>
                  <ul className="tick">
                    {c.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Why us ---------- */}
        <section className="content content--espresso has-live-bg" id="why" data-nav="dark">
          <LiveBackground variant="aqua" density={1.25} />
          <div className="wrap">
            <Reveal className="center">
              <p className="eyebrow eyebrow--gold">Why us</p>
              <Words className="display" text="Why Dolphin Aquarium & Pets?" />
              <p className="content-lede muted">
                Redefining pet wellness in Goa since 1992 — over three decades of expertise and the
                trust of more than 2 lakh customers.
              </p>
            </Reveal>
            <div className="stat-row">
              {[
                [<CountUp key="y" to={30} suffix="+" />, "Years of expertise"],
                [<CountUp key="c" to={200000} format={lakhFormat} suffix="+" />, "Happy customers"],
                [<CountUp key="r" to={5} suffix="×" />, "Top retailer recognition"],
                [<CountUp key="h" to={100} suffix="%" />, "Health guarantee"],
              ].map(([n, l], i) => (
                <Reveal className="s" key={l} delay={i * 0.08}>
                  <b>{n}</b>
                  <span>{l}</span>
                </Reveal>
              ))}
            </div>
            <div className="feat-row">
              {[
                ["Quality guarantee", "Every fish and pet comes with a comprehensive health guarantee and certification."],
                ["Goa's most trusted name", "Recognised as a top aquarium retailer for five consecutive years by industry experts."],
                ["Ethical & sustainable", "Committed to ethical sourcing and environmentally responsible operations."],
              ].map(([h, p], i) => (
                <Reveal className="feat" key={h} delay={i * 0.1}>
                  <h4>{h}</h4>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Founders ---------- */}
        <section className="content content--cream has-live-bg" id="founders" data-nav="light">
          <GardenBackground leaves={5} paws={3} pollen={0.7} />
          <div className="wrap">
            <Reveal className="center">
              <p className="eyebrow eyebrow--gold">Leadership</p>
              <Words className="display dark" text="Meet Our Founders" />
              <p className="content-lede">
                Visionary leaders who combined their passion for aquatic life and pet care into an
                unparalleled experience.
              </p>
            </Reveal>
            <div className="cards-3">
              {[
                {
                  m: "BD",
                  img: "/assets/bernard.jpg",
                  n: "Mr. Bernard Dominic Dias",
                  r: "Founder & Chairman",
                  b: "A former Airport Manager, Mr. Dias turned his lifelong passion for aquatics and animals into Dolphin Aquarium & Pets. His vision and discipline laid the foundation for Goa's most trusted pet brand.",
                },
                {
                  m: "CD",
                  img: "/assets/celine.jpg",
                  n: "Ms. Celine Felecia Dias",
                  r: "Co-Founder & Vice Chairman",
                  b: "A former Director at Volga Engineers, Bethora, Ms. Dias professionally scaled the brand. Her leadership and operational excellence propelled it to industry recognition.",
                },
                {
                  m: "AD",
                  img: "/assets/alistair.jpg",
                  n: "Mr. Alistair Dias",
                  r: "Managing Director",
                  b: "With international experience across aviation and luxury hospitality — SpiceJet, Marriott, Virgin Voyages, Radisson, Qatar Airways and Seabourn — Alistair brings world-class service standards to every vertical he leads.",
                },
              ].map((f, i) => (
                <Reveal className="founder" key={f.m} delay={i * 0.12} whileHover={{ y: -6 }}>
                  <img className="founder-photo" src={f.img} alt={f.n} loading="lazy" />
                  <h3>{f.n}</h3>
                  <p className="role">{f.r}</p>
                  <p>{f.b}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Testimonials ---------- */}
        <section className="content content--sand has-live-bg" id="reviews" data-nav="light">
          <GardenBackground leaves={6} paws={4} pollen={0.7} />
          <div className="wrap">
            <Reveal className="center">
              <p className="eyebrow eyebrow--gold">Trusted by industry leaders</p>
              <Words className="display dark" text="Loved across Goa" />
            </Reveal>
            <Marquee
              items={[
                "Custom aquariums",
                "Exotic fish",
                "Pet grooming",
                "Vaccinations",
                "Aquascaping",
                "Walk-in aviaries",
                "Microchipping",
                "Premium nutrition",
              ]}
              className="marquee--reviews"
            />
            <div className="clients-row">
              {[
                ["/assets/client1.png", "St. Regis Goa Resort"],
                ["/assets/client2.png", "Fisherman's Wharf"],
                ["/assets/client3.png", "Radisson Blu Resort Goa"],
              ].map(([src, name], i) => (
                <Reveal className="client-logo" key={name} delay={i * 0.08} whileHover={{ y: -3 }}>
                  <img src={src} alt={name} loading="lazy" />
                </Reveal>
              ))}
            </div>
            <div className="tcols">
              {[
                ["SA", "Sarah Alvares", "Extremely happy with the 4ft aquarium tank made by Dolphin Aquarium. From planning the tank to build quality to safe doorstep delivery — everything was handled professionally. Alistair and his dad went the extra mile, sharing filtration and maintenance knowledge. You can trust them for quality work and honest support. 👍🐠"],
                ["DK", "Diksha Kavlekar", "We recently visited and had an amazing experience! The owner was super friendly and knowledgeable, and made sure we found exactly what we needed for our furry friend. Clean, well-organized, and a wide range of products. ❤️"],
                ["KG", "Kanishka Gowda", "The store is clean, well-organized and full of high-quality products. But what truly makes this place special is the owner. He's kind, knowledgeable, very sweet and genuinely passionate about animals. Every visit feels personal. Highly recommended 🐕"],
                ["CV", "Casy Vaz", "The owner and staff are always attentive and assisting, with a beautiful and wide selection of fish, birds and many more beautiful creatures. Great deals too. Once again — highly recommended."],
                ["CD", "Chalsie da Silva", "I recently bought a Doberman puppy from this shop and I'm extremely satisfied. The puppy is very good, active, and cute. The service was excellent and the owner was very friendly, patient, and supportive throughout the process."],
                ["LH", "Lionel Hillery Antao", "I would rate it 5/5. Our dachshund pup fell sick with Parvovirus within a day. I contacted Mr. Alistair and he immediately told us to get the pup back. He gave us a new, healthy, vaccinated pup within a few days. So kind and understanding — thank you!"],
                ["DG", "Deirdre Sharon Gomes", "This isn't just a store — it's a haven for pets and their humans. Hands-down the best pet shop I've ever visited. A one-stop shop for all things pet-related, backed by a team that treats you like family and your pet like royalty."],
                ["PH", "Parth Hiremath", "Went in to get a buddy for our lovebird — she lost her mate a few days ago. Allister helped us find the perfect pair, and taught us tons as first-time bird parents. We also got some super cute fish! 💘 Totally recommend them. 💯"],
                ["AM", "Arya Manjrekar", "Went to the pet store today — the shop was amazing and the owner was so sweet, telling us stuff we didn't know. It's rare to find such helpful pet store owners these days. You won't regret it!"],
              ].map(([av, name, quote], i) => (
                <Reveal as={motion.figure} className="tcard" key={name} delay={(i % 3) * 0.08}>
                  <div className="stars">★★★★★</div>
                  <p>&ldquo;{quote}&rdquo;</p>
                  <figcaption>
                    <span className="av">{av}</span>
                    {name}
                  </figcaption>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <HeartSection />
        <VisitWorld />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
      <Immersion />
    </>
  );
}
