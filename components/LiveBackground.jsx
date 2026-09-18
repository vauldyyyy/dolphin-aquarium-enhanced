"use client";

import { useEffect, useRef } from "react";

/**
 * Canvas-driven living background.
 *   variant="aqua"   → deep water, caustic light shafts, rising bubbles, plankton
 *   variant="forest" → warm sunlight, drifting pollen motes, soft light shafts
 * Pauses automatically when scrolled out of view and respects reduced motion.
 */
export default function LiveBackground({ variant = "aqua", density = 1, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, dpr = 1, t = 0, raf = 0;
    let bits = [];
    let shafts = [];
    let visible = true;

    const rand = (a, b) => a + Math.random() * (b - a);
    const isAqua = variant === "aqua";

    function seed() {
      const target = Math.round(((W * H) / 24000) * density);
      const n = Math.max(14, Math.min(target, 95));
      bits = Array.from({ length: n }, () =>
        isAqua
          ? {
              x: rand(0, W),
              y: rand(0, H),
              r: rand(1.2, 7),
              vy: rand(0.12, 0.5),
              ph: rand(0, Math.PI * 2),
              ps: rand(0.006, 0.018),
              amp: rand(4, 18),
              a: rand(0.1, 0.42),
            }
          : {
              x: rand(0, W),
              y: rand(0, H),
              r: rand(0.9, 3.2),
              vy: rand(-0.14, -0.02),
              vx: rand(-0.16, 0.16),
              ph: rand(0, Math.PI * 2),
              ps: rand(0.004, 0.012),
              amp: rand(8, 26),
              a: rand(0.18, 0.55),
            }
      );
      shafts = Array.from({ length: 4 }, () => ({
        x: rand(-0.15, 1.1),
        w: rand(0.05, 0.16),
        a: rand(0.025, 0.075),
        s: rand(0.00004, 0.00013),
        ph: rand(0, Math.PI * 2),
      }));
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      if (!W || !H) return;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      render();
    }

    function paintShafts() {
      shafts.forEach((s) => {
        const drift = Math.sin(t * s.s * 1000 + s.ph) * 0.05;
        const cx = (s.x + drift) * W;
        const g = ctx.createLinearGradient(cx, 0, cx + W * 0.12, H);
        const tint = isAqua ? "255,255,255" : "255,226,160";
        g.addColorStop(0, `rgba(${tint},${s.a})`);
        g.addColorStop(1, `rgba(${tint},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(cx, 0);
        ctx.lineTo(cx + s.w * W, 0);
        ctx.lineTo(cx + s.w * W + W * 0.18, H);
        ctx.lineTo(cx + W * 0.18, H);
        ctx.closePath();
        ctx.fill();
      });
    }

    function render() {
      if (!W || !H) return;

      // --- base wash -------------------------------------------------
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      if (isAqua) {
        bg.addColorStop(0, "#06243d");
        bg.addColorStop(0.55, "#04182a");
        bg.addColorStop(1, "#020d18");
      } else {
        bg.addColorStop(0, "#f8f3ea");
        bg.addColorStop(1, "#ece0cd");
      }
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // --- ambient glow ---------------------------------------------
      const gx = W * (0.5 + Math.sin(t * 0.00018) * 0.18);
      const glow = ctx.createRadialGradient(gx, H * 0.05, 0, gx, H * 0.05, Math.max(W, H) * 0.85);
      glow.addColorStop(0, isAqua ? "rgba(24,104,176,0.30)" : "rgba(255,206,120,0.42)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      paintShafts();

      // --- particles -------------------------------------------------
      bits.forEach((p) => {
        const wob = Math.sin(t * p.ps + p.ph) * p.amp;
        const x = p.x + wob;
        const y = p.y;

        if (isAqua) {
          ctx.beginPath();
          ctx.arc(x, y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(190,230,255,${p.a * 0.45})`;
          ctx.fill();
          ctx.lineWidth = 1;
          ctx.strokeStyle = `rgba(230,248,255,${p.a})`;
          ctx.stroke();
          // rim highlight
          ctx.beginPath();
          ctx.arc(x - p.r * 0.3, y - p.r * 0.3, Math.max(p.r * 0.22, 0.6), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${p.a * 1.1})`;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(x, y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(214,154,52,${p.a})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x, y, p.r * 2.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,214,140,${p.a * 0.16})`;
          ctx.fill();
        }
      });
    }

    function step() {
      if (!visible) {
        raf = requestAnimationFrame(step);
        return;
      }
      t += 16;
      bits.forEach((p) => {
        p.y -= p.vy;
        if (p.vx) p.x += p.vx;
        if (isAqua) {
          if (p.y + p.r < -10) {
            p.y = H + p.r + 10;
            p.x = rand(0, W);
          }
        } else {
          if (p.y + p.r < -10) { p.y = H + 10; p.x = rand(0, W); }
          if (p.x < -20) p.x = W + 20;
          if (p.x > W + 20) p.x = -20;
        }
      });
      render();
      raf = requestAnimationFrame(step);
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const io = new IntersectionObserver(
      ([e]) => { visible = e.isIntersecting; },
      { rootMargin: "120px" }
    );
    io.observe(canvas);

    if (!reduce) raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [variant, density]);

  return <canvas ref={ref} className={`live-bg ${className}`} aria-hidden="true" />;
}
