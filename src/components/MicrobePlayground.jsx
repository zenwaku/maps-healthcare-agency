import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion.js";
import { trackEvent, trackMicrobeNeutralized } from "../utils/tracking.js";

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function rounded(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

export default function MicrobePlayground() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const state = {
      width: 0,
      height: 0,
      dpr: 1,
      pathogens: [],
      bursts: [],
      dragging: false,
      interacted: false,
      pill: { x: 150, y: 160, r: 31, vx: 0, vy: 0 },
      raf: 0,
      last: performance.now(),
      lastNeutralized: 0
    };

    const palette = {
      virus: ["#FB7185", "#F97316", "#A855F7"],
      bacteria: ["#14B8A6", "#84CC16", "#FACC15"],
      fungus: ["#F59E0B", "#FB7185", "#38BDF8"],
      parasite: ["#A855F7", "#22C55E", "#F97316"]
    };
    const types = ["virus", "bacteria", "fungus", "parasite"];

    const resetPathogen = (pathogen, fromEdge = false) => {
      const type = types[Math.floor(Math.random() * types.length)];
      const colors = palette[type];
      pathogen.type = type;
      pathogen.x = fromEdge ? Math.random() * state.width : Math.random() * state.width;
      pathogen.y = fromEdge ? -30 - Math.random() * state.height * 0.45 : Math.random() * state.height;
      pathogen.r = 13 + Math.random() * 13;
      pathogen.vx = (Math.random() - 0.5) * 24;
      pathogen.vy = 12 + Math.random() * 24;
      pathogen.rot = Math.random() * Math.PI * 2;
      pathogen.spin = (Math.random() - 0.5) * 1.4;
      pathogen.color = colors[Math.floor(Math.random() * colors.length)];
      pathogen.face = Math.random() > 0.5 ? "worried" : "grumpy";
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      state.dpr = Math.min(2, window.devicePixelRatio || 1);
      state.width = Math.max(320, rect.width);
      state.height = Math.max(340, rect.height);
      canvas.width = Math.floor(state.width * state.dpr);
      canvas.height = Math.floor(state.height * state.dpr);
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
      state.pill.x = clamp(state.pill.x, 44, state.width - 44);
      state.pill.y = clamp(state.pill.y, 52, state.height - 52);

      const targetCount = window.innerWidth < 720 ? 18 : 34;
      while (state.pathogens.length < targetCount) {
        const pathogen = {};
        resetPathogen(pathogen);
        state.pathogens.push(pathogen);
      }
      state.pathogens = state.pathogens.slice(0, targetCount);
    };

    const burst = (x, y, color) => {
      const maxBurst = window.innerWidth < 720 ? 42 : 86;
      for (let i = 0; i < 12 && state.bursts.length < maxBurst; i += 1) {
        state.bursts.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 150,
          vy: (Math.random() - 0.5) * 150,
          life: 1,
          color
        });
      }
    };

    const hitPathogen = (pathogen) => {
      burst(pathogen.x, pathogen.y, pathogen.color);
      resetPathogen(pathogen, true);
      setScore((value) => value + 1);
      trackMicrobeNeutralized(1);
    };

    const pointerPos = (event) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: (event.clientX - rect.left) * (state.width / rect.width),
        y: (event.clientY - rect.top) * (state.height / rect.height)
      };
    };

    const onPointerDown = (event) => {
      const p = pointerPos(event);
      state.dragging = true;
      state.pill.x = clamp(p.x, 38, state.width - 38);
      state.pill.y = clamp(p.y, 38, state.height - 38);
      if (!state.interacted) {
        state.interacted = true;
        trackEvent("hero_canvas_interaction", { type: "tablet_drag_start" });
      }
      canvas.setPointerCapture?.(event.pointerId);
    };

    const onPointerMove = (event) => {
      const p = pointerPos(event);
      if (!state.dragging) return;
      state.pill.vx = (p.x - state.pill.x) * 0.22;
      state.pill.vy = (p.y - state.pill.y) * 0.22;
      state.pill.x = clamp(p.x, 38, state.width - 38);
      state.pill.y = clamp(p.y, 38, state.height - 38);
    };

    const onPointerUp = (event) => {
      state.dragging = false;
      canvas.releasePointerCapture?.(event.pointerId);
    };

    const onSweep = () => {
      trackEvent("hero_canvas_interaction", { type: "tablet_boost" });
      state.pathogens.slice(0, 6).forEach(hitPathogen);
    };

    const drawFace = (r) => {
      ctx.fillStyle = "#071432";
      ctx.beginPath();
      ctx.arc(-r * 0.28, -r * 0.08, 2.4, 0, Math.PI * 2);
      ctx.arc(r * 0.28, -r * 0.08, 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = "#071432";
      ctx.beginPath();
      ctx.arc(0, r * 0.26, r * 0.22, Math.PI * 1.08, Math.PI * 1.92);
      ctx.stroke();
    };

    const drawVirus = (p) => {
      for (let i = 0; i < 12; i += 1) {
        const a = (i / 12) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * p.r, Math.sin(a) * p.r);
        ctx.lineTo(Math.cos(a) * (p.r + 8), Math.sin(a) * (p.r + 8));
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(Math.cos(a) * (p.r + 9), Math.sin(a) * (p.r + 9), 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(0, 0, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      drawFace(p.r);
    };

    const drawBacteria = (p) => {
      rounded(ctx, -p.r * 1.45, -p.r * 0.66, p.r * 2.9, p.r * 1.32, p.r);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,.45)";
      for (let i = 0; i < 3; i += 1) {
        ctx.beginPath();
        ctx.arc(-p.r * 0.55 + i * p.r * 0.55, 0, p.r * 0.15, 0, Math.PI * 2);
        ctx.fill();
      }
      drawFace(p.r);
    };

    const drawFungus = (p) => {
      ctx.beginPath();
      ctx.ellipse(0, -p.r * 0.35, p.r * 0.9, p.r * 0.56, 0, Math.PI, 0);
      ctx.lineTo(p.r * 0.82, -p.r * 0.18);
      ctx.quadraticCurveTo(0, p.r * 0.2, -p.r * 0.82, -p.r * 0.18);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(-p.r * 0.26, -p.r * 0.1, p.r * 0.52, p.r * 0.72);
      ctx.strokeRect(-p.r * 0.26, -p.r * 0.1, p.r * 0.52, p.r * 0.72);
      drawFace(p.r * 0.72);
    };

    const drawParasite = (p) => {
      ctx.beginPath();
      ctx.moveTo(-p.r * 1.2, p.r * 0.18);
      ctx.bezierCurveTo(-p.r * 0.55, -p.r, p.r * 0.45, p.r, p.r * 1.18, -p.r * 0.12);
      ctx.lineWidth = p.r * 0.7;
      ctx.lineCap = "round";
      ctx.strokeStyle = p.color;
      ctx.stroke();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#071432";
      ctx.stroke();
      ctx.translate(p.r * 0.8, -p.r * 0.1);
      drawFace(p.r * 0.7);
    };

    const drawPathogen = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = 0.9;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 16;
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#071432";
      ctx.fillStyle = p.color;
      if (p.type === "virus") drawVirus(p);
      if (p.type === "bacteria") drawBacteria(p);
      if (p.type === "fungus") drawFungus(p);
      if (p.type === "parasite") drawParasite(p);
      ctx.restore();
    };

    const drawPill = () => {
      const pill = state.pill;
      ctx.save();
      ctx.translate(pill.x, pill.y);
      ctx.rotate(Math.atan2(pill.vy, pill.vx || 1) * 0.3 + 0.28);
      ctx.shadowColor = "rgba(20,184,166,.55)";
      ctx.shadowBlur = 26;
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#071432";
      ctx.beginPath();
      ctx.arc(0, 0, pill.r, 0, Math.PI * 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, pill.r - 7, -Math.PI * 0.45, Math.PI * 0.55);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fillStyle = "#14B8A6";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 0, pill.r - 7, Math.PI * 0.55, Math.PI * 1.55);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fillStyle = "#FACC15";
      ctx.fill();
      ctx.restore();
    };

    const tick = (now) => {
      const dt = Math.min(0.04, (now - state.last) / 1000 || 0.016);
      state.last = now;
      ctx.clearRect(0, 0, state.width, state.height);

      const bg = ctx.createLinearGradient(0, 0, state.width, state.height);
      bg.addColorStop(0, "rgba(255,255,255,.78)");
      bg.addColorStop(0.55, "rgba(238,249,246,.72)");
      bg.addColorStop(1, "rgba(255,255,255,.8)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, state.width, state.height);

      state.pill.x = clamp(state.pill.x + state.pill.vx, 36, state.width - 36);
      state.pill.y = clamp(state.pill.y + state.pill.vy, 36, state.height - 36);
      state.pill.vx *= 0.88;
      state.pill.vy *= 0.88;

      if (!state.dragging && !reducedMotion) {
        const target = state.pathogens.reduce((nearest, p) => {
          const d = Math.hypot(p.x - state.pill.x, p.y - state.pill.y);
          return !nearest || d < nearest.d ? { p, d } : nearest;
        }, null);
        if (target?.p) {
          state.pill.vx += (target.p.x - state.pill.x) * 0.0038;
          state.pill.vy += (target.p.y - state.pill.y) * 0.0038;
        }
      }

      state.pathogens.forEach((p) => {
        if (!reducedMotion) {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.rot += p.spin * dt;
        }
        if (p.y > state.height + 48 || p.x < -64 || p.x > state.width + 64) resetPathogen(p, true);
        drawPathogen(p);
        const hitCooldown = state.dragging ? 140 : 900;
        if (
          now - state.lastNeutralized >= hitCooldown &&
          Math.hypot(p.x - state.pill.x, p.y - state.pill.y) < p.r + state.pill.r - 3
        ) {
          state.lastNeutralized = now;
          hitPathogen(p);
        }
      });

      state.bursts = state.bursts.filter((particle) => particle.life > 0);
      state.bursts.forEach((particle) => {
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;
        particle.life -= dt * 1.8;
        ctx.globalAlpha = Math.max(0, particle.life);
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3 + particle.life * 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      drawPill();
      if (!document.hidden) state.raf = requestAnimationFrame(tick);
    };

    const resume = () => {
      if (!document.hidden) {
        cancelAnimationFrame(state.raf);
        state.last = performance.now();
        state.raf = requestAnimationFrame(tick);
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("microbe-panel:sweep", onSweep);
    document.addEventListener("visibilitychange", resume);
    state.raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(state.raf);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("microbe-panel:sweep", onSweep);
      document.removeEventListener("visibilitychange", resume);
    };
  }, [reducedMotion]);

  return (
    <div className="microbe-game-panel">
      <div className="microbe-game-top">
        <strong>Geser tabletnya untuk bantu membersihkan patogen digital satu per satu.</strong>
        <output aria-live="polite">{score} cleaned</output>
      </div>
      <canvas
        ref={canvasRef}
        className="microbe-game-canvas"
        role="img"
        aria-label="Panel interaktif tablet membersihkan virus, bakteri, parasit, dan jamur digital sebagai metafora healthcare marketing yang lebih rapi"
      />
    </div>
  );
}
