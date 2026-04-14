"use client";

import { useState, useEffect } from "react";

const CHARACTERS = "ABCDEFGHIKLMNOPQRSTVXYZ0123456789-/_";

interface DecryptTextProps {
  text: string;
  delay?: number;
  className?: string;
  duration?: number;
}

export default function DecryptText({ text, delay = 0, className = "", duration = 1500 }: DecryptTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let frameId: number;

    timeout = setTimeout(() => {
      setIsAnimating(true);
      const startTime = Date.now();

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Calculate how many characters are "fixed"
        const fixedCount = Math.floor(progress * text.length);

        const currentText = text
          .split("")
          .map((char, index) => {
            if (index < fixedCount) return char;
            if (progress === 1) return char;
            // Randomly flash the target char occasionally for "ghosting" effect
            return Math.random() > 0.9 ? char : CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join("");

        setDisplayText(currentText);

        if (progress < 1) {
          frameId = requestAnimationFrame(animate);
        }
      };

      frameId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameId);
    };
  }, [text, delay, duration]);

  return <span className={className}>{displayText || (isAnimating ? "" : " ")}</span>;
}
