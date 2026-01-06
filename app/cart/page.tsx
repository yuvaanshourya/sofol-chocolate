'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import CartItem from '@/components/CartItem';
import CartSummary from '@/components/CartSummary';
import { calculateTax } from '@/lib/utils';

export default function CartPage() {
  const router = useRouter();
  const { items, getTotalPrice, getTotalItems } = useCartStore();
  
  const taxRate = parseFloat(process.env.NEXT_PUBLIC_TAX_RATE || '0');
  const subtotal = getTotalPrice();
  const tax = calculateTax(subtotal, taxRate);
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-chocolate-50 flex items-center justify-center px-6">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-chocolate-300 mx-auto mb-6" />
          <h1 className="text-3xl font-serif font-bold text-chocolate-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-chocolate-600 mb-8">
            Add some delicious hot chocolate to get started!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/customize')}
            className="bg-gradient-to-r from-chocolate-600 to-chocolate-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg"
          >
            Start Customizing
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-chocolate-50 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <button
            onClick={() => router.push('/customize')}
            className="p-2 hover:bg-chocolate-100 rounded-full transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-chocolate-700" />
          </button>
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-chocolate-900">
              Your Cart
            </h1>
            <p className="text-sm sm:text-base text-chocolate-600">
              {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>

        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Summary */}
        <CartSummary subtotal={subtotal} tax={tax} total={total} />

        {/* Checkout Buttons */}
        <div className="mt-6 space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/checkout')}
            className="w-full bg-gradient-to-r from-chocolate-600 to-chocolate-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg"
          >
            Proceed to Checkout
          </motion.button>
          
          <button
            onClick={() => router.push('/customize')}
            className="w-full text-chocolate-700 py-3 rounded-xl font-medium hover:bg-chocolate-100 transition-colors"
          >
            Add More Items
          </button>
        </div>
      </div>
    </div>
  );
}
