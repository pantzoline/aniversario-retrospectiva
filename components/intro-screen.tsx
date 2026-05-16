"use client";

import { motion } from "framer-motion";
import { FloatingParticles } from "./floating-particles";

interface IntroScreenProps {
  onStart: () => void;
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-wrapped-intro noise-overlay overflow-hidden"
    >
      <FloatingParticles color="#a855f7" />

      {/* Ambient blobs */}
      <div
        className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-15 blur-[100px] ambient-drift"
        style={{ background: "radial-gradient(circle, #ff4db8, transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[20%] right-[20%] w-[300px] h-[300px] rounded-full pointer-events-none opacity-10 blur-[80px] ambient-drift-reverse"
        style={{ background: "radial-gradient(circle, #a855f7, transparent)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center px-6 max-w-lg mx-auto text-center">
        {/* Year chip - liquid glass */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="liquid-glass px-5 py-2 rounded-full mb-12"
        >
          <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-foreground/60">
            Retrospectiva 2026
          </span>
        </motion.div>

        {/* Pre-title */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm font-sans font-medium tracking-wide uppercase text-foreground/40 mb-5"
        >
          Presente especial para
        </motion.p>

        {/* Name with mask reveal */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-8xl md:text-[11rem] font-serif italic font-bold text-gradient-pink leading-[0.85]"
          >
            Manu
          </motion.h1>
        </div>

        {/* Subtitle - staggered words */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 mt-4 mb-14"
        >
          {["Uma", "jornada", "pelos", "seus", "21", "anos", "mais", "incriveis."].map(
            (word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1.4 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`text-base md:text-lg font-sans leading-relaxed ${
                  word === "21" ? "font-bold text-foreground/80" : "text-foreground/40"
                }`}
              >
                {word}
              </motion.span>
            )
          )}
        </motion.div>

        {/* CTA - liquid glass button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.0 }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="relative px-12 py-4 rounded-full font-sans font-bold text-[15px] tracking-wide cursor-pointer overflow-hidden group"
          style={{ background: "#fff", color: "#000" }}
        >
          <span className="relative z-10">Comecar Jornada</span>
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(135deg, #ff4db8 0%, #a855f7 50%, #ff4db8 100%)",
              backgroundSize: "200% 200%",
            }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <span className="relative z-10 group-hover:text-white transition-colors duration-500">
            Comecar Jornada
          </span>
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2.8, duration: 1 }}
          className="mt-14"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-foreground/15 flex items-start justify-center pt-2"
          >
            <motion.div
              animate={{ height: [4, 8, 4], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-[2px] rounded-full bg-foreground/40"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
