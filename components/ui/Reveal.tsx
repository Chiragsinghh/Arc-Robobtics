"use client";
import { motion } from "framer-motion";

export default function Reveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
      transition={{ 
        duration: 0.8, 
        delay: delay / 1000,
        ease: [0.4, 0, 0.2, 1] 
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}