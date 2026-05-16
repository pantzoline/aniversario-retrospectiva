"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface CounterAnimationProps {
  value: string;
  className?: string;
}

export function CounterAnimation({ value, className = "" }: CounterAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.span
        initial={{ y: "100%", opacity: 0 }}
        animate={isInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.2,
        }}
        className="block"
      >
        {value}
      </motion.span>
    </div>
  );
}
