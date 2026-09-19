"use client";

import { motion } from "framer-motion";
import Icon from "./Icon";
import { waLink } from "../lib/business";

/** Floating "Say hello" WhatsApp button, from the Living Aquarium package. */
export default function WhatsAppFloat() {
  return (
    <motion.a
      className="wa-float"
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Dolphin Aquarium & Pets on WhatsApp"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.96 }}
    >
      <Icon name="chat" size={23} />
      <span>Say hello</span>
    </motion.a>
  );
}
