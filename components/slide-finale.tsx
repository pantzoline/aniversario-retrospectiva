"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { FloatingParticles } from "./floating-particles";

interface FinaleSlideViewProps {
  onRestart: () => void;
  onPlayAudio: () => void;
}

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.4 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export function FinaleSlideView({ onRestart, onPlayAudio }: FinaleSlideViewProps) {
  const fired = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const end = Date.now() + 5000;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors: ["#ff4db8", "#a855f7", "#fbbf24", "#1ed760", "#22d3ee"],
        gravity: 0.7,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors: ["#ff4db8", "#a855f7", "#fbbf24", "#1ed760", "#22d3ee"],
        gravity: 0.7,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  const handlePlayClick = () => {
    setIsPlaying(true);
    onPlayAudio();
    // More confetti on play
    confetti({ particleCount: 100, spread: 100, origin: { y: 0.5 }, colors: ["#ff4db8", "#fbbf24", "#a855f7"] });
  };

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-wrapped-finale noise-overlay overflow-hidden"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <FloatingParticles color="#fbbf24" />

      {/* Multi-color ambient blobs */}
      <div
        className="absolute top-[25%] left-[30%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-15 blur-[100px] ambient-drift"
        style={{ background: "radial-gradient(circle, #ff4db8, transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[25%] right-[25%] w-[350px] h-[350px] rounded-full pointer-events-none opacity-12 blur-[90px] ambient-drift-reverse"
        style={{ background: "radial-gradient(circle, #a855f7, transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute top-[50%] left-[60%] w-[250px] h-[250px] rounded-full pointer-events-none opacity-10 blur-[80px] ambient-drift"
        style={{ background: "radial-gradient(circle, #1ed760, transparent)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center px-6 max-w-lg mx-auto text-center">
        {/* Year chip */}
        <motion.div variants={fadeUp} className="liquid-glass px-5 py-2 rounded-full mb-10">
          <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-foreground/50">
            2026
          </span>
        </motion.div>

        {/* Title masked reveal */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-serif italic font-bold text-gradient-finale leading-tight"
          >
            Feliz 21 Anos
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-10">
          <motion.h2
            initial={{ y: "120%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-serif italic font-bold text-gradient-pink leading-[0.85]"
          >
            Manu
          </motion.h2>
        </div>

        {/* Message in glass card */}
        <motion.div variants={fadeUp} className="liquid-glass px-8 py-6 rounded-2xl max-w-sm mb-8">
          <p className="text-[13px] md:text-sm font-sans text-foreground/50 leading-relaxed">
            Voce e feita de luz, forca e muita coragem. Que esse novo ano traga tudo que o seu
            coracao sonha — e mais. O mundo tem muita sorte de ter voce.
          </p>
        </motion.div>

        {/* Glassmorphism Play Audio Button */}
        {!isPlaying && (
          <motion.button
            variants={fadeUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayClick}
            className="group relative px-8 py-4 rounded-full overflow-hidden mb-6 border border-white/20 bg-white/5 backdrop-blur-md transition-colors hover:bg-white/10 flex items-center gap-4 cursor-pointer shadow-[0_0_40px_rgba(255,77,184,0.3)]"
          >
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            </div>
            <span className="font-sans text-[15px] font-bold tracking-widest uppercase text-white/90">
              Ouvir Mensagem Surpresa
            </span>
          </motion.button>
        )}

        {/* Restart button */}
        <motion.button
          variants={fadeUp}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={onRestart}
          className="px-12 py-3 rounded-full font-sans font-medium text-[13px] tracking-wide cursor-pointer text-foreground/40 hover:text-foreground/70 transition-colors"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          Reviver a Jornada
        </motion.button>
      </div>
    </motion.div>
  );
}

