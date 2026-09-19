"use client";

/* ReviewsWall — the "Loved across Goa" section as a warm, living backdrop:
   two clotheslines of review cards scrolling in opposite directions, hung on
   a rope with wooden pins, with slow animal silhouettes drifting behind. */

import { motion } from "framer-motion";
import SectionVideo from "./SectionVideo";

const REVIEWS_A = [
  ["SA", "Sarah Alvares", "Extremely happy with the 4ft aquarium tank made by Dolphin Aquarium. From planning the tank to build quality to safe doorstep delivery — everything was handled professionally. Alistair and his dad went the extra mile, sharing filtration and maintenance knowledge. You can trust them for quality work and honest support. 👍🐠"],
  ["DK", "Diksha Kavlekar", "We recently visited and had an amazing experience! The owner was super friendly and knowledgeable, and made sure we found exactly what we needed for our furry friend. Clean, well-organized, and a wide range of products. ❤️"],
  ["KG", "Kanishka Gowda", "The store is clean, well-organized and full of high-quality products. But what truly makes this place special is the owner. He's kind, knowledgeable, very sweet and genuinely passionate about animals. Every visit feels personal. Highly recommended 🐕"],
  ["CV", "Casy Vaz", "The owner and staff are always attentive and assisting, with a beautiful and wide selection of fish, birds and many more beautiful creatures. Great deals too. Once again — highly recommended."],
  ["CD", "Chalsie da Silva", "I recently bought a Doberman puppy from this shop and I'm extremely satisfied. The puppy is very good, active, and cute. The service was excellent and the owner was very friendly, patient, and supportive throughout the process."],
];

const REVIEWS_B = [
  ["LH", "Lionel Hillery Antao", "I would rate it 5/5. Our dachshund pup fell sick with Parvovirus within a day. I contacted Mr. Alistair and he immediately told us to get the pup back. He gave us a new, healthy, vaccinated pup within a few days. So kind and understanding — thank you!"],
  ["DG", "Deirdre Sharon Gomes", "This isn't just a store — it's a haven for pets and their humans. Hands-down the best pet shop I've ever visited. A one-stop shop for all things pet-related, backed by a team that treats you like family and your pet like royalty."],
  ["PH", "Parth Hiremath", "Went in to get a buddy for our lovebird — she lost her mate a few days ago. Allister helped us find the perfect pair, and taught us tons as first-time bird parents. We also got some super cute fish! 💘 Totally recommend them. 💯"],
  ["AM", "Arya Manjrekar", "Went to the pet store today — the shop was amazing and the owner was so sweet, telling us stuff we didn't know. It's rare to find such helpful pet store owners these days. You won't regret it!"],
];

/* Simple animal silhouettes that drift across the backdrop. */
const ANIMALS = [
  { d: "M2 14c4-8 12-10 18-6 2-3 6-3 7 0 3 0 5 2 5 4s-2 3-4 3c-2 4-8 6-14 5L8 24l-2-6c-2 0-4-2-4-4Z", w: 90, top: "12%", dur: 95, delay: 0, flip: false }, // bird
  { d: "M4 26c0-8 4-12 8-12 1-4 4-8 8-8s7 3 7 7c3 1 5 4 5 8v7H18v-4c-3 2-8 2-11 0v4H4v-2Z", w: 110, top: "58%", dur: 120, delay: -40, flip: true }, // deer
  { d: "M4 22c0-6 3-10 8-10 1-3 3-5 6-5 4 0 7 3 7 7 0 1 0 2-1 3 2 1 4 3 4 5H14c-4 0-7 1-10 0Z", w: 70, top: "76%", dur: 105, delay: -70, flip: false }, // rabbit
  { d: "M12 2c3 0 5 2 5 5 0 1 0 2-1 3 2 1 4 3 4 6 0 4-4 8-9 8s-9-4-9-8c0-3 2-5 4-6-1-1-1-2-1-3 0-3 2-5 5-5Z", w: 46, top: "30%", dur: 80, delay: -20, flip: true }, // butterfly-ish
];

function Card({ av, name, quote, tilt }) {
  return (
    <figure className="rwall-card" style={{ rotate: `${tilt}deg` }}>
      <div className="stars">★★★★★</div>
      <p>&ldquo;{quote}&rdquo;</p>
      <figcaption>
        <span className="av">{av}</span>
        {name}
      </figcaption>
    </figure>
  );
}

function Row({ items, reverse }) {
  const doubled = [...items, ...items];
  return (
    <div className="rwall-row">
      <div className="rwall-rope" aria-hidden="true" />
      <div className={`rwall-track${reverse ? " rwall-track--rev" : ""}`}>
        {doubled.map(([av, name, quote], i) => (
          <Card key={`${name}-${i}`} av={av} name={name} quote={quote} tilt={i % 2 ? 1.4 : -1.6} />
        ))}
      </div>
    </div>
  );
}

export default function ReviewsWall() {
  return (
    <section className="rwall" id="reviews" data-nav="light" aria-label="Customer reviews">
      <SectionVideo name="reviews" scrim="light" scrimStrength={0.4} />
      {/* Warm sunlit-forest backdrop with slow-drifting animal silhouettes */}
      <div className="rwall-bg" aria-hidden="true">
        <div className="rwall-sun" />
        {ANIMALS.map((a, i) => (
          <svg
            key={i}
            className="rwall-animal"
            style={{ width: a.w, top: a.top, animationDuration: `${a.dur}s`, animationDelay: `${a.delay}s`, transform: a.flip ? "scaleX(-1)" : undefined }}
            viewBox="0 0 40 30"
          >
            <path d={a.d} fill="currentColor" />
          </svg>
        ))}
      </div>

      <div className="wrap rwall-head">
        <motion.p
          className="eyebrow eyebrow--gold"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Trusted across Goa
        </motion.p>
        <motion.h2
          className="display dark"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.08 }}
        >
          Loved across Goa
        </motion.h2>
        <motion.p
          className="content-lede"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.16 }}
        >
          Real words from real customers — pinned up where everyone can see them.
        </motion.p>
      </div>

      <Row items={REVIEWS_A} />
      <Row items={REVIEWS_B} reverse />
    </section>
  );
}
