"use client";

import { useEffect, useRef, useState } from "react";

export const framePath = (dir, i) =>
  `${dir}/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;

/**
 * Preloads a numbered image sequence into memory.
 * Returns a ref holding the decoded <img> elements plus load progress.
 */
export function useImageSequence(dir, count, enabled = true) {
  const imagesRef = useRef([]);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    const bucket = new Array(count);
    imagesRef.current = bucket;
    let done = 0;

    for (let i = 0; i < count; i++) {
      const img = new Image();
      img.decoding = "async";
      const settle = () => {
        if (cancelled) return;
        if (img.naturalWidth) bucket[i] = img;
        done += 1;
        // Throttle re-renders: update every 6 frames (and on the last one)
        if (done % 6 === 0 || done === count) setLoaded(done);
      };
      img.onload = settle;
      img.onerror = settle;
      img.src = framePath(dir, i);
    }

    return () => {
      cancelled = true;
    };
  }, [dir, count, enabled]);

  return { imagesRef, loaded, done: loaded >= count };
}

/** Nearest already-decoded frame, so playback never stalls mid-load. */
export function nearestFrame(images, i, count) {
  if (images[i]) return images[i];
  for (let d = 1; d < count; d++) {
    if (images[i - d]) return images[i - d];
    if (images[i + d]) return images[i + d];
  }
  return null;
}
