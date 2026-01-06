'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { Smartphone, Tablet } from 'lucide-react';

export default function HeroSection() {
  const router = useRouter();

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-cream-100 to-chocolate-50 px-4 lg:px-8 py-4 lg:py-8 relative overflow-hidden">
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
        className="w-full max-w-7xl z-10"
      >
        {/* Header Section - Compact */}
        <div className="text-center mb-6 lg:mb-4">
          <motion.h1
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-chocolate-600 mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            🍫 Sofol
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-chocolate-600 mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Artisan Hot Chocolate
          </motion.p>

          <motion.div
            className="mb-3 flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <img 
              src="https://cdn.shopify.com/s/files/1/0250/3894/6349/files/USDA-Organic-Four-Color-Organic-Seal_480x480.jpg?v=1708356533" 
              alt="USDA Organic Certified" 
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
            />
            <div className="text-left">
              <p className="text-green-800 font-bold text-sm sm:text-lg">100% ORGANIC</p>
              <p className="text-green-700 text-xs sm:text-sm">USDA Certified</p>
            </div>
          </motion.div>
        </div>

        {/* Ordering Options - Main Content */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-chocolate-700 mb-4 lg:mb-6 text-center">Choose How to Order</h2>
          
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
            {/* QR Code Option - For Phone */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border-2 border-chocolate-200 hover:border-chocolate-400 transition-all"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-chocolate-600" />
                <h3 className="text-lg sm:text-xl font-bold text-chocolate-800">Order on Your Phone</h3>
              </div>
              
              <p className="text-chocolate-600 mb-4 text-sm sm:text-base">
                Scan the QR code to customize and order from your mobile device
              </p>
              
              <div className="flex justify-center mb-3">
                <div className="bg-white p-3 rounded-xl border-2 border-chocolate-300 inline-block">
                  <QRCodeSVG 
                    value="https://sofoleats.com/hot-chocolate/customize"
                    size={150}
                    level="H"
                    includeMargin={true}
                    fgColor="#5D4037"
                  />
                </div>
              </div>
              
              <p className="text-xs sm:text-sm text-chocolate-500 italic text-center">
                📱 Point your camera at the code above
              </p>
            </motion.div>

            {/* iPad Option - Direct Order */}
            <motion.div
              className="bg-gradient-to-br from-chocolate-600 to-chocolate-700 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 text-white flex flex-col justify-center"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Tablet className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                <h3 className="text-lg sm:text-xl font-bold">Order on This Device</h3>
              </div>
              
              <p className="text-cream-100 mb-6 text-sm sm:text-base">
                Use this iPad to build your perfect hot chocolate right here at our shop
              </p>
              
              <motion.button
                onClick={() => router.push('/customize')}
                className="bg-white text-chocolate-700 px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-bold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Building Your Drink →
              </motion.button>
              
              <p className="text-cream-100 text-xs sm:text-sm mt-3 italic text-center sm:text-left">
                🍫 Perfect for in-shop ordering
              </p>
            </motion.div>
          </div>

          <motion.p
            className="mt-4 lg:mt-6 text-chocolate-500 text-xs sm:text-sm text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            ✨ Customized to perfection • Made fresh • Quick pickup
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}
