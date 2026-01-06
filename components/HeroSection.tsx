'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { Smartphone, Tablet } from 'lucide-react';

export default function HeroSection() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cream-50 via-cream-100 to-chocolate-50 px-6 py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gold-200 opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-chocolate-300 opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.25, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 1,
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        {/* Logo/Brand Name */}
        <motion.h1
          className="font-serif text-6xl md:text-8xl font-bold text-chocolate-600 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          🍫 Sofol
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-chocolate-600 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Artisan Hot Chocolate
        </motion.p>

        <motion.div
          className="mb-4 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <img 
            src="https://cdn.shopify.com/s/files/1/0250/3894/6349/files/USDA-Organic-Four-Color-Organic-Seal_480x480.jpg?v=1708356533" 
            alt="USDA Organic Certified" 
            className="w-20 h-20 object-contain"
          />
          <div className="text-left">
            <p className="text-green-800 font-bold text-xl">100% ORGANIC</p>
            <p className="text-green-700 text-sm">USDA Certified</p>
          </div>
        </motion.div>

        <motion.p
          className="text-md text-chocolate-500 mb-12 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Craft your perfect cup of warmth and indulgence with all-organic ingredients
        </motion.p>

        {/* Decorative hot chocolate illustration */}
        <motion.div
          className="mb-12 flex justify-center gap-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="text-6xl"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              ☕
            </motion.div>
          ))}
        </motion.div>

        {/* Ordering Options */}
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-chocolate-700 mb-8">Choose How to Order</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* QR Code Option - For Phone */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8 border-2 border-chocolate-200 hover:border-chocolate-400 transition-all"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Smartphone className="w-8 h-8 text-chocolate-600" />
                <h3 className="text-xl font-bold text-chocolate-800">Order on Your Phone</h3>
              </div>
              
              <p className="text-chocolate-600 mb-6">
                Scan the QR code to customize and order from your mobile device
              </p>
              
              <div className="bg-white p-4 rounded-xl border-2 border-chocolate-300 inline-block mb-4">
                <QRCodeSVG 
                  value="https://sofoleats.com/hot-chocolate/customize"
                  size={200}
                  level="H"
                  includeMargin={true}
                  fgColor="#5D4037"
                />
              </div>
              
              <p className="text-sm text-chocolate-500 italic">
                📱 Point your camera at the code above
              </p>
            </motion.div>

            {/* iPad Option - Direct Order */}
            <motion.div
              className="bg-gradient-to-br from-chocolate-600 to-chocolate-700 rounded-2xl shadow-xl p-8 text-white flex flex-col justify-center"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Tablet className="w-8 h-8 text-white" />
                <h3 className="text-xl font-bold">Order on This Device</h3>
              </div>
              
              <p className="text-cream-100 mb-8">
                Use this iPad to build your perfect hot chocolate right here at our shop
              </p>
              
              <motion.button
                onClick={() => router.push('/customize')}
                className="bg-white text-chocolate-700 px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Building Your Drink →
              </motion.button>
              
              <p className="text-cream-100 text-sm mt-4 italic">
                🍫 Perfect for in-shop ordering
              </p>
            </motion.div>
          </div>

          <motion.p
            className="mt-8 text-chocolate-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            ✨ Customized to perfection • Made fresh • Quick pickup
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Steam animation */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 w-2 h-16 bg-gradient-to-t from-chocolate-200 to-transparent opacity-30 rounded-full blur-sm"
            style={{ left: `${20 + i * 15}%` }}
            animate={{
              y: [0, -60],
              opacity: [0.3, 0],
              scaleX: [1, 1.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
}
