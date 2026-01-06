'use client';

import { formatPrice } from '@/lib/utils';

interface CartSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
}

export default function CartSummary({ subtotal, tax, total }: CartSummaryProps) {
  return (
    <div className="bg-chocolate-50 rounded-xl p-6 space-y-3">
      <div className="flex justify-between text-chocolate-700">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      {tax > 0 && (
        <div className="flex justify-between text-chocolate-700">
          <span>Tax</span>
          <span>{formatPrice(tax)}</span>
        </div>
      )}
      <div className="border-t border-chocolate-200 pt-3 flex justify-between text-lg font-bold text-chocolate-900">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}
