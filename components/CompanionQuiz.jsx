"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "./Icon";
import { waLink } from "../lib/business";

const EASE = [0.22, 0.61, 0.36, 1];

const QUESTIONS = [
  {
    q: "Where do you live?",
    a: [
      { t: "An apartment", v: { fish: 2, bird: 1, cat: 2, small: 2, dog: -1 } },
      { t: "A house with a yard", v: { dog: 2, bird: 1, cat: 1, fish: 1, small: 0 } },
      { t: "Plenty of open space", v: { dog: 3, bird: 1, fish: 0, cat: 0, small: -1 } },
    ],
  },
  {
    q: "How much time can you give each day?",
    a: [
      { t: "Just a little", v: { fish: 3, small: 2, cat: 1, bird: -1, dog: -2 } },
      { t: "A couple of hours", v: { cat: 2, bird: 2, fish: 1, dog: 1, small: 1 } },
      { t: "I'm around most of the day", v: { dog: 3, bird: 2, cat: 1, small: 1, fish: 0 } },
    ],
  },
  {
    q: "How much experience do you have?",
    a: [
      { t: "First pet ever", v: { fish: 2, small: 1, cat: 1, dog: 0, bird: -1 } },
      { t: "I've had a pet or two", v: { cat: 2, dog: 1, bird: 1, fish: 1, small: 1 } },
      { t: "Confident with animals", v: { dog: 2, bird: 2, cat: 1, fish: 1, small: 0 } },
    ],
  },
  {
    q: "What pulls at your heart?",
    a: [
      { t: "Fins, scales & shimmering water", v: { fish: 4 } },
      { t: "Feathers & song", v: { bird: 4 } },
      { t: "Warm fur & wet noses", v: { dog: 2, cat: 2, small: 1 } },
    ],
  },
];

const RESULTS = {
  fish: {
    title: "An aquarium — living art in your home",
    body: "A designer setup with hardy, colourful fish is perfect for you. Start with a nano cube or a 2ft planted tank — we'll cycle it, stock it and teach you the care routine.",
    wa: "Hi! I took your companion quiz and it pointed me to an aquarium setup. I'd love advice on where to start.",
  },
  bird: {
    title: "A songbird — colour and music in the house",
    body: "Lovebirds, cockatiels and budgies match your rhythm. Our walk-in aviary team will help you pick a hand-raised, socialised bird and everything it needs.",
    wa: "Hi! I took your companion quiz and it pointed me to a pet bird. Can you tell me about the birds you have?",
  },
  dog: {
    title: "A dog — a loyal shadow for your days",
    body: "You have the space and the time a dog dreams of. Come meet our ethically raised, vaccinated puppies — from gentle goldens to spirited huskies — and find your match.",
    wa: "Hi! I took your companion quiz and it says I'm ready for a dog. I'd love to meet the puppies you have.",
  },
  cat: {
    title: "A cat — quiet company with character",
    body: "Independent, affectionate on their own terms — a British Shorthair or Persian would slot beautifully into your life. All ours are socialised and health-checked.",
    wa: "Hi! I took your companion quiz and it pointed me to a cat. What kittens do you have right now?",
  },
  small: {
    title: "A small companion — big personality, small footprint",
    body: "Hamsters and other small pets are a wonderful first step — low maintenance, endlessly entertaining, and we'll set you up with the right habitat and diet.",
    wa: "Hi! I took your companion quiz and it suggested a small pet. What do you have, and what do they need?",
  },
};

const KIND_LABEL = { fish: "Aquatics", bird: "Bird", dog: "Dog", cat: "Cat", small: "Small pet" };

export default function CompanionQuiz({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({});
  const [mounted, setMounted] = useState(false);

  /* Portal target only exists in the browser — never render it during SSR */
  useEffect(() => setMounted(true), []);

  const pick = (v) => {
    const next = { ...scores };
    for (const [k, d] of Object.entries(v)) next[k] = (next[k] || 0) + d;
    setScores(next);
    setStep((s) => s + 1);
  };

  const winner = useMemo(() => {
    const entries = Object.entries(scores);
    if (!entries.length) return null;
    return entries.sort((a, b) => b[1] - a[1])[0][0];
  }, [scores]);

  const restart = () => {
    setScores({});
    setStep(0);
  };

  const done = step >= QUESTIONS.length && winner;

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="quiz-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Find my companion quiz"
        >
          <motion.div
            className="quiz-card"
            initial={{ y: 60, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="quiz-close" onClick={onClose} aria-label="Close quiz">
              <Icon name="close" size={18} />
            </button>

            {!done ? (
              <>
                <div className="quiz-progress" aria-hidden="true">
                  {QUESTIONS.map((_, i) => (
                    <i key={i} className={i < step ? "on" : ""} />
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <p className="quiz-step">Question {step + 1} of {QUESTIONS.length}</p>
                    <h3 className="quiz-q">{QUESTIONS[step].q}</h3>
                    <div className="quiz-opts">
                      {QUESTIONS[step].a.map((a) => (
                        <motion.button
                          key={a.t}
                          className="quiz-opt"
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => pick(a.v)}
                        >
                          {a.t}
                          <Icon name="arrow" size={16} />
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="quiz-result"
              >
                <p className="quiz-step">Your match · {KIND_LABEL[winner]}</p>
                <h3 className="quiz-q">{RESULTS[winner].title}</h3>
                <p className="quiz-body">{RESULTS[winner].body}</p>
                <div className="quiz-actions">
                  <motion.a
                    className="btn btn--grad"
                    href={waLink(RESULTS[winner].wa)}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.97 }}
                  >
                    Ask us on WhatsApp <Icon name="arrow" size={16} />
                  </motion.a>
                  <button className="quiz-again" onClick={restart}>
                    Retake the quiz
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
