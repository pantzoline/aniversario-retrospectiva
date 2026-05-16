"use client";

import { motion } from "framer-motion";
import type { RevealSlide } from "@/lib/game-data";
import { FloatingParticles } from "./floating-particles";

interface RevealSlideViewProps {
  slide: RevealSlide;
  onNext: () => void;
}

export function RevealSlideView({ slide, onNext }: RevealSlideViewProps) {
  return (
    <motion.div
      className={`absolute inset-0 flex flex-col items-center justify-center ${slide.bgClass} noise-overlay overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onNext}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onNext()}
    >
      <FloatingParticles color={slide.accentColor} />

      {/* Multiple ambient blobs for a richer feel */}
      <div
        className="absolute top-[45%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none pulse-glow blur-[100px]"
        style={{ background: `radial-gradient(circle, ${slide.accentColor}30, transparent)` }}
        aria-hidden="true"
      />
      <div
        className="absolute top-[60%] left-[25%] w-[250px] h-[250px] rounded-full pointer-events-none opacity-20 blur-[70px] ambient-drift"
        style={{ background: `radial-gradient(circle, ${slide.accentColor}50, transparent)` }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center px-6 max-w-xl mx-auto text-center">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="liquid-glass-subtle px-6 py-3 rounded-2xl mb-10 max-w-xs"
        >
          <p className="text-[13px] font-sans font-medium text-foreground/40 leading-relaxed">
            {slide.preTitle}
          </p>
        </motion.div>

        {/* Big reveal lines - masked */}
        {slide.lines.map((line, i) => (
          <div key={i} className="overflow-hidden">
            <motion.h1
              initial={{ y: "120%", rotateX: 30 }}
              animate={{ y: "0%", rotateX: 0 }}
              transition={{
                duration: 1,
                delay: 0.6 + i * 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`text-6xl md:text-[6.5rem] font-serif italic font-bold ${slide.gradientClass} leading-[0.9]`}
            >
              {line}
            </motion.h1>
          </div>
        ))}

        {/* Tap hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-16 text-[10px] font-sans text-foreground/15 tracking-[0.2em] uppercase"
        >
          Toque para continuar
        </motion.p>
      </div>
    </motion.div>
  );
}
