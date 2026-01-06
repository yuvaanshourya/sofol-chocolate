'use client';

import { motion } from 'framer-motion';

export default function HotChocolateLoader() {
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        {/* Hot Chocolate Cup SVG */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cup */}
          <path
            d="M20 30 L25 70 Q25 80 35 80 L65 80 Q75 80 75 70 L80 30 Z"
            fill="#6F5639"
            stroke="#5A452D"
            strokeWidth="2"
          />
          <ellipse cx="50" cy="30" rx="30" ry="8" fill="#8B6F47" />
          <ellipse cx="50" cy="30" rx="25" ry="6" fill="#3D2E1F" opacity="0.6" />
          
          {/* Handle */}
          <path
            d="M80 40 Q95 50 80 60"
            stroke="#6F5639"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Steam */}
          <motion.path
            d="M35 20 Q40 10 35 0"
            stroke="#D4C4B0"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
            animate={{
              opacity: [0.7, 0.3, 0],
              y: [0, -10, -20],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
          <motion.path
            d="M50 20 Q55 10 50 0"
            stroke="#D4C4B0"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
            animate={{
              opacity: [0.7, 0.3, 0],
              y: [0, -10, -20],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.5,
            }}
          />
          <motion.path
            d="M65 20 Q70 10 65 0"
            stroke="#D4C4B0"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
            animate={{
              opacity: [0.7, 0.3, 0],
              y: [0, -10, -20],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 1,
            }}
          />
        </svg>
      </motion.div>
      <motion.p
        className="mt-4 text-chocolate-600 font-medium"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Preparing your order...
      </motion.p>
    </div>
  );
}
