"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const isInfinity = slide.bigNumber === "∞";
  const isLoveSlide = isInfinity && slide.preTitle.toLowerCase().includes("amor");
  
  const isTop5 = slide.bigNumber === "Top 5%";
  const is1000 = slide.bigNumber === "1.000+";
  
  const [count, setCount] = useState(isTop5 ? 25 : is1000 ? 0 : 0);

  // Love meter states
  const [meterProgress, setMeterProgress] = useState(0);
  const [meterPhase, setMeterPhase] = useState<"filling" | "overflow" | "error" | "reveal">("filling");

  useEffect(() => {
    if (isTop5) {
      let current = 25;
      const t = setInterval(() => {
        current -= 1;
        setCount(current);
        if (current <= 5) clearInterval(t);
      }, 60);
      return () => clearInterval(t);
    } else if (is1000) {
      let current = 0;
      const t = setInterval(() => {
        current += 34;
        if (current >= 1000) {
          setCount(1000);
          clearInterval(t);
        } else {
          setCount(current);
        }
      }, 30);
      return () => clearInterval(t);
    }
  }, [isTop5, is1000]);

  // Love meter animation sequence
  useEffect(() => {
    if (!isLoveSlide) return;
    
    let current = 0;
    const fillInterval = setInterval(() => {
      current += 3;
      if (current >= 100) {
        current = 100;
        setMeterProgress(100);
        clearInterval(fillInterval);
        setTimeout(() => setMeterPhase("overflow"), 400);
        setTimeout(() => setMeterPhase("error"), 1800);
        setTimeout(() => setMeterPhase("reveal"), 3200);
      } else {
        setMeterProgress(current);
      }
    }, 40);
    
    return () => clearInterval(fillInterval);
  }, [isLoveSlide]);

  let renderedBigNumber = slide.bigNumber;
  if (isTop5) renderedBigNumber = `Top ${count}%`;
  if (is1000) renderedBigNumber = `${count}+`;

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
      {/* INTERACTIVE AURA BACKGROUND */}
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

        {/* ===== LOVE METER ANIMATION ===== */}
        {isLoveSlide && meterPhase !== "reveal" && (
          <motion.div 
            className="w-full max-w-sm mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* Percentage display */}
            <motion.p 
              className="text-4xl md:text-6xl font-serif italic font-bold mb-4 tabular-nums"
              animate={
                meterPhase === "overflow" 
                  ? { x: [0, -4, 4, -4, 4, 0], color: ["#ffffff", "#ff4444", "#ffffff", "#ff4444", "#ffffff"] }
                  : meterPhase === "error"
                  ? { opacity: 0 }
                  : {}
              }
              transition={
                meterPhase === "overflow"
                  ? { duration: 0.4, repeat: Infinity }
                  : { duration: 0.3 }
              }
              style={{ color: meterProgress >= 100 ? "#ff4db8" : "rgba(255,255,255,0.9)" }}
            >
              {meterPhase === "overflow" ? "999%+" : `${meterProgress}%`}
            </motion.p>

            {/* Progress bar */}
            <div className="relative h-3 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: meterPhase === "overflow" 
                    ? "linear-gradient(90deg, #ff4db8, #ff0000, #ff4db8)" 
                    : `linear-gradient(90deg, ${slide.accentColor}, #ffffff)`,
                  width: `${meterProgress}%`,
                }}
                animate={
                  meterPhase === "overflow"
                    ? { opacity: [1, 0.5, 1], scaleX: [1, 1.02, 1] }
                    : meterPhase === "error"
                    ? { opacity: 0, scaleY: 0 }
                    : {}
                }
                transition={
                  meterPhase === "overflow" 
                    ? { duration: 0.2, repeat: Infinity } 
                    : { duration: 0.5 }
                }
              />
            </div>

            {/* Status label */}
            <motion.p 
              className="text-[10px] md:text-xs font-sans tracking-widest uppercase mt-3"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {meterPhase === "filling" && "Calculando..."}
              {meterPhase === "overflow" && (
                <motion.span 
                  animate={{ opacity: [1, 0, 1] }} 
                  transition={{ duration: 0.3, repeat: Infinity }}
                  style={{ color: "#ff4444" }}
                >
                  ⚠ SOBRECARGA NO SISTEMA
                </motion.span>
              )}
            </motion.p>
          </motion.div>
        )}

        {/* ERROR MESSAGE */}
        <AnimatePresence>
          {isLoveSlide && meterPhase === "error" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mb-8 px-6 py-4 rounded-2xl border border-red-500/30 bg-red-500/10 backdrop-blur-sm"
            >
              <p className="text-red-400 font-mono text-sm md:text-base font-bold tracking-wide">
                ERRO: não é possível medir
              </p>
              <p className="text-red-300/60 font-mono text-xs mt-1">
                valor excede todos os limites conhecidos
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* REVEALED CONTENT (love slide after meter animation) */}
        <AnimatePresence>
          {isLoveSlide && meterPhase === "reveal" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-serif italic text-foreground/90 leading-tight mb-6">
                {slide.title}
              </h3>
              {slide.subtitle && (
                <p className="text-sm md:text-lg font-sans text-foreground/60 font-light max-w-lg leading-relaxed mt-2 mx-auto">
                  {slide.subtitle}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* NON-LOVE SLIDES: Normal display */}
        {!isLoveSlide && (
          <>
            {!isInfinity && (
              <div className="overflow-hidden mb-6">
                <motion.h2
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-6xl md:text-8xl lg:text-[10rem] font-serif italic font-bold tracking-tight leading-[0.9] text-foreground/90"
                >
                  {renderedBigNumber}
                </motion.h2>
              </div>
            )}

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

            {slide.subtitle && (
              <motion.p
                variants={fadeUp}
                className="text-sm md:text-lg font-sans text-foreground/60 font-light max-w-lg leading-relaxed mt-2"
              >
                {slide.subtitle}
              </motion.p>
            )}
          </>
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
