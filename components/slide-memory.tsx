"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MemorySlide } from "@/lib/game-data";

interface MemorySlideViewProps {
  slide: MemorySlide;
  onNext: () => void;
}

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export function MemorySlideView({ slide, onNext }: MemorySlideViewProps) {
  const years = [2023, 2024, 2025, 2026];
  const [currentYearIndex, setCurrentYearIndex] = useState(0);

  useEffect(() => {
    // Anima de ano em ano a cada 800ms
    const interval = setInterval(() => {
      setCurrentYearIndex((prev) => {
        if (prev < years.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-background overflow-hidden"
      variants={stagger}
      initial="hidden"
      animate="visible"
      onClick={onNext}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onNext()}
    >
      {/* Subtle background glow based on accent color */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${slide.accentColor}, transparent 60%)`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-6 max-w-lg mx-auto text-center w-full">
        {/* Calendar Animation Section */}
        <div className="relative h-[120px] md:h-[180px] w-full flex items-center justify-center mb-8">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={years[currentYearIndex]}
              initial={{ y: 50, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -50, opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute font-serif italic font-bold tracking-tight text-foreground/90 text-7xl md:text-9xl"
              style={{ textShadow: `0 0 40px ${slide.accentColor}40` }}
            >
              {years[currentYearIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* The beautiful caption text that appears after reaching 2026 */}
        <AnimatePresence>
          {currentYearIndex === years.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <h2 className="text-xl md:text-3xl font-serif italic text-foreground/80 leading-relaxed max-w-sm mb-4">
                mais um ano ao seu lado comemorando o seu nascimento
              </h2>
              <p
                className="text-lg md:text-2xl font-serif italic font-bold"
                style={{ color: slide.accentColor }}
              >
                eu te amo momo
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimalist tap hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: currentYearIndex === years.length - 1 ? 1 : 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute -bottom-24 text-[10px] font-sans text-foreground/15 tracking-[0.2em] uppercase"
        >
          Toque para continuar
        </motion.p>
      </div>
    </motion.div>
  );
}
