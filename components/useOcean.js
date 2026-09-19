"use client";

import { useEffect } from "react";
import { BUSINESS } from "../lib/business";

/* ------------------------------------------------------------------
   Ocean engine — ported from the package's scripts/ocean.js.
   Canvas bubbles, stylised fish, caustic lines, click ripples and
   pointer parallax (via --px/--py). Capped FPS; pauses off-screen,
   when the tab is hidden, and under reduced motion.
------------------------------------------------------------------ */
export default function useOcean(rootRef, canvasRef, activeRef, engineRef) {
  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const cfg = BUSINESS.animation;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerFine = window.matchMedia("(pointer: fine)");
    let width = 0, height = 0, bubbles = [], fishes = [], ripples = [];
    let raf = 0, last = 0, elapsed = 0, inView = true;
    let active = activeRef.current && !reduce.matches;
    let targetX = 0, targetY = 0, px = 0, py = 0;
    const rand = (min, max) => min + Math.random() * (max - min);
    const maxFps = Math.min(60, Math.max(15, Number(cfg.maxFps) || 30));

    function resize() {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      const dpr = Math.min(window.devicePixelRatio || 1, width < 720 ? 1.25 : 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = width < 720 ? cfg.mobileParticles : cfg.desktopParticles;
      bubbles = Array.from({ length: count }, () => ({
        x: rand(0, width), y: rand(0, height), size: rand(0.7, 3.4),
        speed: rand(6, 21), phase: rand(0, 6.28), alpha: rand(0.08, 0.34),
      }));
      fishes = Array.from({ length: width < 720 ? 6 : 13 }, () => ({
        x: rand(-100, width + 100), y: rand(130, Math.min(height - 200, 800)),
        size: rand(5, 15), speed: rand(7, 18), phase: rand(0, 6.28), alpha: rand(0.035, 0.12),
      }));
      draw(0);
    }

    function fish(x, y, size, phase, alpha) {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = `rgba(123,220,235,${alpha})`;
      ctx.beginPath();
      ctx.moveTo(size, 0);
      ctx.bezierCurveTo(3, -size * 0.48, -size * 0.55, -size * 0.45, -size * 0.68, 0);
      ctx.bezierCurveTo(-size * 0.35, size * 0.42, 3, size * 0.48, size, 0);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-size * 0.6, 0);
      ctx.lineTo(-size * 1.1, -size * 0.4 * (0.7 + Math.sin(phase) * 0.3));
      ctx.lineTo(-size * 1.1, size * 0.4 * (0.7 + Math.sin(phase) * 0.3));
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function draw(dt) {
      ctx.clearRect(0, 0, width, height);
      // Slowly travelling light caustics
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        for (let x = 0; x <= width + 16; x += 16) {
          const y = 90 + i * 180 + Math.sin(x / 190 + elapsed * 0.15 + i) * 42 + Math.sin(x / 90 - elapsed * 0.1) * 9;
          if (!x) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(111,221,239,${0.022 + i * 0.003})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      for (const b of bubbles) {
        if (dt) {
          b.y -= b.speed * dt;
          if (b.y < -10) { b.y = height + 10; b.x = rand(0, width); }
        }
        const x = b.x + Math.sin(elapsed * 0.35 + b.phase) * 12;
        ctx.beginPath();
        ctx.arc(x, b.y, b.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(164,235,248,${b.alpha * 0.3})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(178,237,247,${b.alpha})`;
        ctx.lineWidth = 0.65;
        ctx.stroke();
        if (b.size > 2) {
          ctx.beginPath();
          ctx.arc(x - b.size * 0.25, b.y - b.size * 0.28, b.size * 0.18, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(237,255,255,${b.alpha + 0.1})`;
          ctx.fill();
        }
      }
      for (const f of fishes) {
        if (dt) { f.x += f.speed * dt; if (f.x > width + 40) f.x = -40; }
        fish(f.x, f.y + Math.sin(elapsed * 0.6 + f.phase) * 15, f.size, elapsed * 4 + f.phase, f.alpha);
      }
      ripples = ripples.filter((r) => r.age < 2.6);
      for (const r of ripples) {
        r.age += dt;
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, 14 + r.age * 60, 7 + r.age * 30, -0.15, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(154,239,247,${Math.max(0, (1 - r.age / 2.6) * 0.3)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    function tick(now) {
      if (!active || !inView || document.hidden) { raf = 0; return; }
      raf = requestAnimationFrame(tick);
      if (now - last < 1000 / maxFps) return;
      const dt = last ? Math.min((now - last) / 1000, 0.06) : 0.033;
      last = now;
      elapsed += dt;
      px += (targetX - px) * 0.06;
      py += (targetY - py) * 0.06;
      root.style.setProperty("--px", `${px.toFixed(2)}px`);
      root.style.setProperty("--py", `${py.toFixed(2)}px`);
      draw(dt);
    }

    function sync() {
      if (active && inView && !document.hidden && !raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      } else if ((!active || !inView || document.hidden) && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }

    engineRef.current = {
      setActive(value) {
        active = Boolean(value) && !reduce.matches;
        sync();
        if (!active) {
          targetX = 0;
          targetY = 0;
          root.style.setProperty("--px", "0px");
          root.style.setProperty("--py", "0px");
        }
      },
    };

    const onMove = (e) => {
      if (!pointerFine.matches || !active || !inView) return;
      targetX = (e.clientX / window.innerWidth - 0.5) * -17;
      targetY = (e.clientY / window.innerHeight - 0.5) * -10;
    };
    const onLeave = () => { targetX = 0; targetY = 0; };
    const onDown = (e) => {
      if (!active || e.target.closest("a, button, iframe") || ripples.length > 4) return;
      const box = canvas.getBoundingClientRect();
      const y = e.clientY - box.top;
      if (y >= 0 && y < height) ripples.push({ x: e.clientX - box.left, y, age: 0 });
    };

    document.addEventListener("visibilitychange", sync);
    root.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerdown", onDown, { passive: true });
    const io = new IntersectionObserver((entries) => { inView = entries[0].isIntersecting; sync(); }, { threshold: 0 });
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    resize();
    sync();

    return () => {
      cancelAnimationFrame(raf);
      raf = 0;
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerdown", onDown);
      engineRef.current = null;
    };
  }, [rootRef, canvasRef, activeRef, engineRef]);
}
