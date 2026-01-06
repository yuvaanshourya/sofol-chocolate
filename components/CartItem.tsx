'use client';

import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/config/products';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { productConfig } from '@/config/products';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const sizeName = productConfig.sizes.find(s => s.id === item.size)?.name || item.size;
  const milkName = productConfig.milkTypes.find(m => m.id === item.milkType)?.name || item.milkType;
  const sweetnessName = productConfig.sweetnessLevels.find(s => s.id === item.sweetness)?.name || item.sweetness;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="bg-white rounded-xl p-4 shadow-sm border border-chocolate-100"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-chocolate-800 mb-1">
            Hot Chocolate
          </h3>
          <div className="text-sm text-chocolate-600 space-y-0.5">
            <p>{sizeName} • {milkName} • {sweetnessName}</p>
            {item.toppings.length > 0 && (
              <p className="flex flex-wrap gap-1">
                <span className="font-medium">Toppings:</span>
                {item.toppings.map(id => {
                  const topping = productConfig.toppings.find(t => t.id === id);
                  return topping ? (
                    <span key={id} className="inline-flex items-center">
                      {topping.icon} {topping.name}
                    </span>
                  ) : null;
                }).reduce((prev, curr) => prev === null ? [curr] : [...prev, ', ', curr], null as any)}
              </p>
            )}
            {item.flavorAddons.length > 0 && (
              <p className="flex flex-wrap gap-1">
                <span className="font-medium">Flavors:</span>
                {item.flavorAddons.map(id => {
                  const addon = productConfig.flavorAddons.find(a => a.id === id);
                  return addon ? (
                    <span key={id} className="inline-flex items-center">
                      {addon.icon} {addon.name}
                    </span>
                  ) : null;
                }).reduce((prev, curr) => prev === null ? [curr] : [...prev, ', ', curr], null as any)}
              </p>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold text-chocolate-800">
            {formatPrice(item.price * item.quantity)}
          </p>
          <p className="text-xs text-chocolate-500">
            {formatPrice(item.price)} each
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 bg-chocolate-50 rounded-lg p-1">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-8 h-8 flex items-center justify-center rounded-md bg-white hover:bg-chocolate-100 transition-colors"
            disabled={item.quantity <= 1}
          >
            <Minus className="w-4 h-4 text-chocolate-700" />
          </button>
          <span className="w-8 text-center font-semibold text-chocolate-800">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center rounded-md bg-white hover:bg-chocolate-100 transition-colors"
          >
            <Plus className="w-4 h-4 text-chocolate-700" />
          </button>
        </div>

        <button
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:text-red-700 transition-colors p-2"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
