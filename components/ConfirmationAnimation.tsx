'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function ConfirmationAnimation() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-chocolate-50 p-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="relative"
      >
        {/* Success Circle */}
        <motion.div
          className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-2xl"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <Check className="w-16 h-16 text-white" strokeWidth={3} />
        </motion.div>

        {/* Confetti Effect */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
            style={{
              background: `hsl(${i * 30}, 70%, 60%)`,
            }}
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{
              scale: [0, 1, 0],
              x: Math.cos(i * 30 * (Math.PI / 180)) * 100,
              y: Math.sin(i * 30 * (Math.PI / 180)) * 100,
            }}
            transition={{
              duration: 1,
              delay: 0.3,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-chocolate-800 mb-3">
          Order Confirmed!
        </h1>
        <p className="text-lg text-chocolate-600 mb-2">
          Thank you for your order
        </p>
        <motion.p
          className="text-md text-chocolate-500"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Your delicious hot chocolate will be ready shortly...
        </motion.p>
      </motion.div>

      {/* Decorative hot chocolate cups */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 flex gap-4"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            className="text-4xl"
          >
            ☕
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-12 p-6 bg-white/50 backdrop-blur rounded-2xl border border-chocolate-200 max-w-md"
      >
        <p className="text-chocolate-700 text-center text-sm">
          Please wait at the pickup counter. We'll call you when your order is ready!
        </p>
      </motion.div>
    </div>
  );
}
