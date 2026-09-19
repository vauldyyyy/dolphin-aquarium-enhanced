"use client";

/* Immersion layer:
   1. Bubble cursor trail — a rising trail of tiny bubbles follows the pointer
      over the cinematic chapters. Desktop (fine pointer) only; disabled under
      prefers-reduced-motion.
   2. Ambient soundscape — a gentle, fully synthesized underwater ambience
      (filtered swell + occasional bubble blips) via WebAudio. Off by default;
      the toggle is the user gesture that unlocks audio. */

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

export default function Immersion() {
  const canvasRef = useRef(null);
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef(null);

  /* ---------- Bubble trail ---------- */
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf = 0;
    let bubbles = [];
    let last = 0;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    addEventListener("resize", resize);

    /* Only trail inside the pinned cinematic chapters — find their band on
       the page each frame (cheap: two getBoundingClientRect). */
    const band = () => {
      const els = document.querySelectorAll("[data-immersion]");
      let top = Infinity;
      let bottom = -Infinity;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom > 0 && r.top < innerHeight) {
          top = Math.min(top, r.top);
          bottom = Math.max(bottom, r.bottom);
        }
      });
      return top === Infinity ? null : [Math.max(0, top), Math.min(innerHeight, bottom)];
    };

    let activeBand = null;
    let lastCheck = 0;

    const onMove = (e) => {
      const now = performance.now();
      if (now - last < 34) return; /* ~30fps spawn cap */
      last = now;
      if (now - lastCheck > 400) {
        lastCheck = now;
        activeBand = band();
      }
      if (!activeBand || e.clientY < activeBand[0] || e.clientY > activeBand[1]) return;
      bubbles.push({
        x: e.clientX + (Math.random() - 0.5) * 14,
        y: e.clientY + (Math.random() - 0.5) * 10,
        r: 1.5 + Math.random() * 4,
        vy: 0.5 + Math.random() * 1.1,
        vx: (Math.random() - 0.5) * 0.3,
        life: 1,
      });
      if (bubbles.length > 90) bubbles.splice(0, bubbles.length - 90);
    };
    addEventListener("pointermove", onMove, { passive: true });

    const tick = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      bubbles = bubbles.filter((b) => b.life > 0);
      for (const b of bubbles) {
        b.y -= b.vy;
        b.x += b.vx + Math.sin(b.y * 0.05) * 0.3;
        b.life -= 0.012;
        const a = Math.max(0, b.life) * 0.5;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(158, 231, 240, ${a})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 250, 255, ${a * 0.9})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
      removeEventListener("resize", resize);
    };
  }, []);

  /* ---------- Ambient soundscape (synthesized, no assets) ---------- */
  useEffect(() => {
    if (!soundOn) {
      if (audioRef.current) {
        audioRef.current.gain.gain.linearRampToValueAtTime(0, audioRef.current.ctx.currentTime + 0.6);
        const t = audioRef.current;
        setTimeout(() => t.ctx.close(), 800);
        audioRef.current = null;
      }
      return;
    }
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);
    gain.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 1.5);

    /* Low underwater swell: looping brown-ish noise through a lowpass. */
    const len = ctx.sampleRate * 4;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    let v = 0;
    for (let i = 0; i < len; i++) {
      v = (v + (Math.random() * 2 - 1) * 0.02) * 0.995;
      data[i] = v * 3.2;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    noise.loop = true;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 320;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 140;
    lfo.connect(lfoGain);
    lfoGain.connect(lp.frequency);
    noise.connect(lp);
    lp.connect(gain);
    noise.start();
    lfo.start();

    /* Occasional bubble blips. */
    let blipTimer = 0;
    const blip = () => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      const f0 = 300 + Math.random() * 500;
      o.frequency.setValueAtTime(f0, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(f0 * 1.8, ctx.currentTime + 0.12);
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);
      o.connect(g);
      g.connect(gain);
      o.start();
      o.stop(ctx.currentTime + 0.25);
      blipTimer = setTimeout(blip, 700 + Math.random() * 2600);
    };
    blipTimer = setTimeout(blip, 500);

    audioRef.current = { ctx, gain };
    return () => {
      clearTimeout(blipTimer);
      ctx.close();
      audioRef.current = null;
    };
  }, [soundOn]);

  return (
    <>
      <canvas ref={canvasRef} aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 140, pointerEvents: "none" }} />
      <button
        className={`sound-toggle${soundOn ? " on" : ""}`}
        onClick={() => setSoundOn((s) => !s)}
        aria-pressed={soundOn}
        aria-label={soundOn ? "Mute ambient soundscape" : "Play ambient soundscape"}
        title={soundOn ? "Mute ambience" : "Ocean ambience"}
      >
        <Icon name="wave" size={20} />
      </button>
    </>
  );
}
