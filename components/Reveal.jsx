"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 0.61, 0.36, 1];

/** Scroll-into-view reveal used across the content sections. */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  amount = 0.2,
  as: Tag = motion.div,
  ...rest
}) {
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.65, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
