'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import CartSummary from '@/components/CartSummary';
import ZelleQRCode from '@/components/ZelleQRCode';
import { calculateTax, formatPrice } from '@/lib/utils';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [customerName, setCustomerName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const { subtotal, tax, total } = useMemo(() => {
    const taxRate = parseFloat(process.env.NEXT_PUBLIC_TAX_RATE || '0');
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = calculateTax(subtotal, taxRate);
    const total = subtotal + tax;
    return { subtotal, tax, total };
  }, [items]);

  // Store total in ref so confirmation screen can access it after cart is cleared
  const [orderTotal, setOrderTotal] = useState(0);

  const createOrder = async () => {
    try {
      const response = await fetch('/hot-chocolate/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          items: items.map(item => ({
            size: item.size,
            milkType: item.milkType,
            sweetness: item.sweetness,
            toppings: item.toppings,
            flavorAddons: item.flavorAddons,
            quantity: item.quantity,
            price: item.price,
          })),
          totalAmount: total,
          paymentMethod: 'cash',
        }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem('lastOrderNumber', data.orderNumber);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to create order:', error);
      return false;
    }
  };

  const handlePlaceOrder = async () => {
    if (!customerName.trim()) {
      setNameError(true);
      return;
    }

    setOrderTotal(total);
    const orderCreated = await createOrder();

    if (orderCreated) {
      clearCart();
      setOrderPlaced(true);
      setTimeout(() => {
        router.push('/');
      }, 15000);
    } else {
      alert('Failed to create order. Please try again.');
    }
  };

  useEffect(() => {
    if (items.length === 0 && !orderPlaced) {
      router.push('/cart');
    }
  }, [items.length, router, orderPlaced]);

  if (orderPlaced) {
    const zellePaymentUrl = 'https://enroll.zellepay.com/qr-codes?data=ewogICJhY3Rpb24iIDogInBheW1lbnQiLAogICJuYW1lIiA6ICJWSVNIQUsiLAogICJ0b2tlbiIgOiAidmlzaGFrbmFnQG1lLmNvbSIKfQ==';
    const venmoUrl = 'https://venmo.com/VishakNag-Ashoka';

    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-chocolate-50 px-4 py-4 flex flex-col items-center justify-center">
        <div className="max-w-sm mx-auto w-full">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center mb-4"
          >
            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-2" />
            <h1 className="text-2xl font-serif font-bold text-chocolate-900 mb-1">Order Placed!</h1>
            <p className="text-3xl font-bold text-chocolate-900">{formatPrice(orderTotal)}</p>
          </motion.div>

          {/* Payment Options */}
          <div className="bg-white rounded-2xl p-5 shadow-lg mb-4">

            <h2 className="text-base font-semibold text-chocolate-800 mb-3 text-center">
              Please pay via Zelle or Venmo
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {/* Zelle */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="4" fill="#6D1ED4"/>
                    <path d="M17.5 6.5H14.5L9.5 15.5H12.5L7 17.5L17.5 6.5Z" fill="white"/>
                  </svg>
                  <span className="font-bold text-sm text-[#6D1ED4]">Zelle</span>
                </div>
                <div className="bg-gray-50 p-2 rounded-xl inline-block">
                  <QRCodeSVG
                    value={zellePaymentUrl}
                    size={100}
                    level="H"
                    includeMargin={true}
                    fgColor="#6D1ED4"
                  />
                </div>
                <p className="text-xs text-chocolate-600 mt-1">
                  vishaknag@me.com
                </p>
              </div>

              {/* Venmo */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="4" fill="#3D95CE"/>
                    <path d="M16.5 5.5C17 6.5 17.2 7.5 17.2 8.8C17.2 12.2 14.5 16.5 12.3 19.5H7.5L5.8 6.5L10 6L11 14.5C12.2 12.5 13.7 9.5 13.7 7.5C13.7 6.8 13.6 6.3 13.4 5.8L16.5 5.5Z" fill="white"/>
                  </svg>
                  <span className="font-bold text-sm text-[#3D95CE]">Venmo</span>
                </div>
                <div className="bg-gray-50 p-2 rounded-xl inline-block">
                  <QRCodeSVG
                    value={venmoUrl}
                    size={100}
                    level="H"
                    includeMargin={true}
                    fgColor="#3D95CE"
                  />
                </div>
                <p className="text-xs text-chocolate-600 mt-1">
                  @VishakNag-Ashoka
                </p>
              </div>
            </div>

            <p className="text-xs text-chocolate-500 mt-3 text-center">
              Send exactly <strong>{formatPrice(orderTotal)}</strong> to complete your payment
            </p>
          </div>

          <p className="text-center text-xs text-chocolate-400">
            Redirecting to homepage shortly...
          </p>
        </div>
      </div>
    );
  }

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

        {/* Customer Name */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-chocolate-800 mb-4">
            Your Information
          </h2>
          <div>
            <label htmlFor="customerName" className="block text-sm font-medium text-chocolate-700 mb-2">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              id="customerName"
              type="text"
              value={customerName}
              onChange={(e) => {
                setCustomerName(e.target.value);
                setNameError(false);
              }}
              placeholder="Enter your name"
              className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                nameError
                  ? 'border-red-500 focus:border-red-600 focus:ring-red-200'
                  : 'border-chocolate-200 focus:border-chocolate-500 focus:ring-chocolate-200'
              } focus:outline-none focus:ring-2`}
            />
            {nameError && (
              <p className="text-red-600 text-sm mt-2">Please enter your name</p>
            )}
            <p className="text-xs text-chocolate-500 mt-2">
              We&apos;ll call your name when your order is ready
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-chocolate-800 mb-4">
            Order Summary
          </h2>
          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-chocolate-700">
                <span>
                  {item.quantity}x Hot Chocolate ({item.size})
                </span>
              </div>
            ))}
          </div>
          <CartSummary subtotal={subtotal} tax={tax} total={total} />
        </div>

        {/* Place Order Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePlaceOrder}
          className="w-full bg-gradient-to-r from-chocolate-600 to-chocolate-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
        >
          Place Order
        </motion.button>
      </div>
    </div>
  );
}
