"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import type { QuizSlide } from "@/lib/game-data";
import { FloatingParticles } from "./floating-particles";

interface QuizSlideViewProps {
  slide: QuizSlide;
  onNext: () => void;
}

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function QuizSlideView({ slide, onNext }: QuizSlideViewProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [shakeIdx, setShakeIdx] = useState<number | null>(null);
  const [showCorrectFeedback, setShowCorrectFeedback] = useState(false);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);

    const correct = idx === slide.correctIndex;

    if (correct) {
      setShowCorrectFeedback(true);
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: [slide.accentColor, "#ffffff", "#fbbf24"],
        gravity: 0.8,
      });
      setTimeout(() => onNext(), 1800);
    } else {
      setShakeIdx(idx);
      setTimeout(() => {
        setShakeIdx(null);
        setSelected(null);
        setAnswered(false);
      }, 1200);
    }
  };

  const getOptionBg = (idx: number) => {
    if (!answered || selected === null) {
      return "rgba(255, 255, 255, 0.03)";
    }
    if (idx === selected && idx === slide.correctIndex) {
      return "rgba(30, 215, 96, 0.12)";
    }
    if (idx === selected && idx !== slide.correctIndex) {
      return "rgba(239, 68, 68, 0.12)";
    }
    if (idx === slide.correctIndex) {
      return "rgba(30, 215, 96, 0.06)";
    }
    return "rgba(255, 255, 255, 0.01)";
  };

  const getOptionBorder = (idx: number) => {
    if (!answered || selected === null) {
      return "1px solid rgba(255, 255, 255, 0.06)";
    }
    if (idx === selected && idx === slide.correctIndex) {
      return "1px solid rgba(30, 215, 96, 0.4)";
    }
    if (idx === selected && idx !== slide.correctIndex) {
      return "1px solid rgba(239, 68, 68, 0.4)";
    }
    if (idx === slide.correctIndex) {
      return "1px solid rgba(30, 215, 96, 0.2)";
    }
    return "1px solid rgba(255, 255, 255, 0.03)";
  };

  const getLetterColor = (idx: number) => {
    if (answered && idx === slide.correctIndex) return "#1ed760";
    if (answered && idx === selected) return "#ef4444";
    return "rgba(255,255,255,0.3)";
  };

  return (
    <motion.div
      className={`absolute inset-0 flex flex-col items-center justify-center ${slide.bgClass} noise-overlay overflow-hidden`}
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <FloatingParticles color={slide.accentColor} />

      {/* Ambient blob */}
      <div
        className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none opacity-15 blur-[90px] ambient-drift"
        style={{ background: `radial-gradient(circle, ${slide.accentColor}, transparent)` }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center px-6 max-w-lg mx-auto w-full">
        {/* Category chip - liquid glass */}
        <motion.div variants={fadeUp} className="liquid-glass px-5 py-2 rounded-full mb-10">
          <span
            className="text-[11px] font-sans font-bold tracking-[0.2em] uppercase"
            style={{ color: slide.accentColor }}
          >
            {slide.categoryLabel}
          </span>
        </motion.div>

        {/* Question */}
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-[2.2rem] font-serif italic font-bold text-center text-foreground/90 leading-[1.2] mb-10 text-balance"
        >
          {slide.question}
        </motion.h2>

        {/* Options */}
        <div className="flex flex-col gap-3 w-full">
          {slide.options.map((opt, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.6,
                delay: 0.5 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={!answered ? { x: 6, scale: 1.01 } : {}}
              whileTap={!answered ? { scale: 0.98 } : {}}
              onClick={() => handleSelect(i)}
              disabled={answered}
              className={`w-full text-left px-5 py-4 rounded-xl text-sm md:text-[15px] font-sans transition-colors duration-300 cursor-pointer disabled:cursor-default quiz-option ${
                shakeIdx === i ? "animate-shake" : ""
              }`}
              style={{
                background: getOptionBg(i),
                border: getOptionBorder(i),
                backdropFilter: "blur(12px)",
                opacity: answered && i !== selected && i !== slide.correctIndex ? 0.3 : 1,
              }}
            >
              <span className="flex items-center gap-4">
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors duration-300"
                  style={{
                    background: answered && i === slide.correctIndex
                      ? "rgba(30,215,96,0.15)"
                      : answered && i === selected
                      ? "rgba(239,68,68,0.15)"
                      : "rgba(255,255,255,0.05)",
                    color: getLetterColor(i),
                  }}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span
                  className="transition-colors duration-300"
                  style={{
                    color:
                      answered && i === slide.correctIndex
                        ? "#1ed760"
                        : answered && i === selected
                        ? "#ef4444"
                        : "rgba(255,255,255,0.7)",
                  }}
                >
                  {opt}
                </span>
              </span>
            </motion.button>
          ))}
        </div>

        {/* Correct feedback overlay */}
        <AnimatePresence>
          {showCorrectFeedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            >
              <div className="liquid-glass-strong px-8 py-4 rounded-2xl">
                <p className="text-lg font-sans font-bold text-[#1ed760]">Certinha!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Architecture Sticker Overlay */}
        <AnimatePresence>
          {answered && slide.category === "architecture" && selected !== null && (
            <motion.div
              initial={{ scale: 0, x: 100, rotate: selected === slide.correctIndex ? -5 : 5, y: "-50%" }}
              animate={{ scale: 1, x: 0, rotate: 0, y: "-50%" }}
              exit={{ scale: 0, opacity: 0, x: 100 }}
              transition={{ type: "spring", stiffness: 180, damping: 15 }}
              className="fixed right-4 md:right-[10%] top-[15%] md:top-1/2 z-50 pointer-events-none drop-shadow-2xl opacity-90 md:opacity-100"
            >
              <img 
                src={selected === slide.correctIndex ? slide.happySticker : slide.sadSticker} 
                alt="Sticker de Arquitetura" 
                className="w-32 h-32 md:w-80 md:h-80 object-contain" 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
