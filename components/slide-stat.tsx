"use client";

import { motion } from "framer-motion";
import type { StatSlide } from "@/lib/game-data";

interface StatSlideViewProps {
  slide: StatSlide;
  onNext: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

export function StatSlideView({ slide, onNext }: StatSlideViewProps) {
  // If the number is just "∞", we treat it as an aura/text-only slide, not a data stat.
  const isInfinity = slide.bigNumber === "∞";

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
      {/* =========================================
          INTERACTIVE AURA BACKGROUND
          ========================================= */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            borderRadius: ["40%", "60%", "40%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] mix-blend-screen"
          style={{
            background: `radial-gradient(circle, ${slide.accentColor} 0%, transparent 70%)`,
            filter: "blur(80px)",
          }}
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
            borderRadius: ["60%", "40%", "60%"],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] mix-blend-screen opacity-70"
          style={{
            background: `radial-gradient(circle, #ffffff 0%, transparent 60%)`,
            filter: "blur(60px)",
            transform: "translate(10%, -10%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-4xl mx-auto text-center">
        {/* Pre-title */}
        <motion.p
          variants={fadeUp}
          className="text-[10px] md:text-xs font-sans tracking-[0.3em] uppercase text-foreground/40 mb-10"
        >
          {slide.preTitle}
        </motion.p>

        {/* Dynamic Display based on content */}
        {!isInfinity && (
          <div className="overflow-hidden mb-6">
            <motion.h2
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl lg:text-[10rem] font-serif italic font-bold tracking-tight leading-[0.9] text-foreground/90"
            >
              {slide.bigNumber}
            </motion.h2>
          </div>
        )}

        {/* Title */}
        {slide.title && (
          <motion.h3
            variants={fadeUp}
            className={`text-3xl md:text-5xl lg:text-6xl font-serif italic text-foreground/90 leading-tight mb-8 max-w-2xl ${
              isInfinity ? "mt-4" : ""
            }`}
          >
            {slide.title}
          </motion.h3>
        )}

        {/* Elegant Subtitle */}
        {slide.subtitle && (
          <motion.p
            variants={fadeUp}
            className="text-sm md:text-lg font-sans text-foreground/60 font-light max-w-lg leading-relaxed mt-2"
          >
            {slide.subtitle}
          </motion.p>
        )}

        {/* Subtle tap hint */}
        <motion.p
          variants={fadeUp}
          className="absolute -bottom-24 text-[10px] font-sans text-foreground/20 tracking-[0.2em] uppercase"
        >
          Toque para continuar
        </motion.p>
      </div>
    </motion.div>
  );
}
