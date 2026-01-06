'use client';

import { useState, useEffect, useMemo, memo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Copy } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import CartSummary from '@/components/CartSummary';
import ApplePayButton from '@/components/ApplePayButton';
import ZelleQRCode from '@/components/ZelleQRCode';
import { calculateTax, formatPrice } from '@/lib/utils';
import { motion } from 'framer-motion';

type PaymentMethod = 'zelle' | 'applepay';

export default function CheckoutPage() {
  // Debug: Log every render
  console.log('CheckoutPage rendered at:', new Date().toISOString());
  
  const router = useRouter();
  // Only subscribe to specific parts of the store to prevent re-renders
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('zelle');
  const [copied, setCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Memoize calculations to prevent re-computation on every render
  const { subtotal, tax, total } = useMemo(() => {
    const taxRate = parseFloat(process.env.NEXT_PUBLIC_TAX_RATE || '0');
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = calculateTax(subtotal, taxRate);
    const total = subtotal + tax;
    return { subtotal, tax, total };
  }, [items]);


  const handlePaymentSuccess = () => {
    clearCart();
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(total.toFixed(2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleZellePayment = () => {
    // Mark as pending and navigate to confirmation
    router.push('/confirmation?payment=zelle');
    clearCart();
  };

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items.length, router]);


  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-chocolate-50 px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <button
            onClick={() => router.push('/cart')}
            className="p-2 hover:bg-chocolate-100 rounded-full transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-chocolate-700" />
          </button>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-chocolate-900">
            Checkout
          </h1>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-chocolate-800 mb-4">
            Order Summary
          </h2>
          <div className="space-y-2 mb-4">
            {items.map((item, index) => (
              <div key={item.id} className="flex justify-between text-sm text-chocolate-700">
                <span>
                  {item.quantity}x Hot Chocolate ({item.size})
                </span>
              </div>
            ))}
          </div>
          <CartSummary subtotal={subtotal} tax={tax} total={total} />
        </div>

        {/* Payment Method Tabs */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-chocolate-800 mb-4">
            Payment Method
          </h2>
          
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setPaymentMethod('zelle')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                paymentMethod === 'zelle'
                  ? 'bg-chocolate-700 text-white shadow-lg'
                  : 'bg-chocolate-100 text-chocolate-700 hover:bg-chocolate-200'
              }`}
            >
              Zelle
            </button>
            <button
              onClick={() => setPaymentMethod('applepay')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                paymentMethod === 'applepay'
                  ? 'bg-chocolate-700 text-white shadow-lg'
                  : 'bg-chocolate-100 text-chocolate-700 hover:bg-chocolate-200'
              }`}
            >
              Apple Pay
            </button>
          </div>

          {/* Payment Content */}
          <div className={paymentMethod === 'zelle' ? 'block space-y-4' : 'hidden'}>
              {/* QR Code */}
              <ZelleQRCode />

              {/* Amount to Send */}
              <div className="bg-gold-50 border-2 border-gold-300 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-chocolate-600 mb-1">Amount to Send</p>
                    <p className="text-2xl font-bold text-chocolate-900">{formatPrice(total)}</p>
                  </div>
                  <button
                    onClick={handleCopyAmount}
                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg hover:bg-chocolate-50 transition-colors"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5 text-chocolate-700" />
                        <span className="text-sm font-medium text-chocolate-700">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-900 font-semibold mb-2">📱 Instructions:</p>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                  <li>Open your Zelle app</li>
                  <li>Scan the QR code above</li>
                  <li>Send the exact amount: <strong>{formatPrice(total)}</strong></li>
                  <li>Click "I've Sent Payment" below</li>
                </ol>
              </div>

              {/* Confirm Payment Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleZellePayment}
                className="w-full bg-gradient-to-r from-chocolate-600 to-chocolate-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                I've Sent Payment via Zelle
              </motion.button>
          </div>
          
          <div className={paymentMethod === 'applepay' ? 'block' : 'hidden'}>
            <ApplePayButton amount={total} onSuccess={handlePaymentSuccess} />
          </div>
        </div>

        <p className="text-center text-sm text-chocolate-500 mt-6">
          🔒 Your payment information is secure and encrypted
        </p>
      </div>
    </div>
  );
}
