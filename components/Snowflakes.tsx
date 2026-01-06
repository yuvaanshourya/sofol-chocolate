'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  char: string;
}

export default function Snowflakes() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const snowflakeChars = ['❄', '❅', '❆', '✻', '✼', '❉'];
    const flakes: Snowflake[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 20 + 15,
      duration: Math.random() * 5 + 8,
      delay: Math.random() * 5,
      char: snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)],
    }));
    setSnowflakes(flakes);
  }, []);

  if (snowflakes.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50" style={{ width: '100vw', height: '100vh' }}>
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute select-none"
          style={{
            left: `${flake.x}%`,
            fontSize: `${flake.size}px`,
            top: -40,
            color: flake.id % 3 === 0 
              ? 'rgba(139, 111, 71, 0.6)'
              : flake.id % 3 === 1
              ? 'rgba(212, 175, 55, 0.7)'
              : 'rgba(184, 160, 137, 0.65)',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
          animate={{
            y: [0, 1000],
            x: [0, Math.sin(flake.id) * 50],
            opacity: [0, 0.8, 0.8, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {flake.char}
        </motion.div>
      ))}
    </div>
  );
}
