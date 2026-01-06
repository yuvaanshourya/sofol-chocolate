'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getStripe } from '@/lib/stripe';
import HotChocolateLoader from './HotChocolateLoader';

interface ApplePayButtonProps {
  amount: number;
  onSuccess?: () => void;
}

export default function ApplePayButton({ amount, onSuccess }: ApplePayButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();
      const stripe = await getStripe();

      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      // Simulate successful payment for demo
      // In production, implement proper Apple Pay integration
      setTimeout(() => {
        onSuccess?.();
        router.push('/confirmation');
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'Payment failed');
      setIsProcessing(false);
    }
  };

  if (isProcessing) {
    return (
      <div className="py-8">
        <HotChocolateLoader />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handlePayment}
        className="w-full bg-black text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
      >
        <span className="text-2xl">🍎</span>
        Pay with Apple Pay
      </motion.button>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
        >
          {error}
        </motion.div>
      )}

      <p className="text-xs text-center text-chocolate-500">
        Secure payment powered by Stripe
      </p>
    </div>
  );
}
