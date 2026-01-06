'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Minus, Plus, ArrowLeft, ChevronDown } from 'lucide-react';
import { productConfig, calculateItemPrice } from '@/config/products';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';

export default function CustomizationPanel() {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const cartTotal = useCartStore((state) => state.getTotalPrice());

  const [size, setSize] = useState(productConfig.sizes[0].id);
  const [milkType, setMilkType] = useState(productConfig.milkTypes[0].id);
  const [sweetness, setSweetness] = useState(productConfig.sweetnessLevels[1].id);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  const currentPrice = calculateItemPrice(size, milkType, selectedToppings, selectedFlavors);

  const toggleTopping = (id: string) => {
    setSelectedToppings(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const toggleFlavor = (id: string) => {
    setSelectedFlavors(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleAddToCart = () => {
    addItem({
      id: Date.now().toString(),
      size,
      milkType,
      sweetness,
      toppings: selectedToppings,
      flavorAddons: selectedFlavors,
      quantity,
      price: currentPrice,
    });
    
    // Reset form
    setQuantity(1);
    setSelectedToppings([]);
    setSelectedFlavors([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-chocolate-50">
      <div className="flex flex-col lg:flex-row lg:h-screen">
        {/* Left Panel - Customization (Scrollable) */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-6 lg:py-8 pb-32">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 lg:mb-8">
              <button
                onClick={() => router.push('/')}
                className="p-2 hover:bg-chocolate-100 rounded-full transition-colors flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6 text-chocolate-700" />
              </button>
              <div className="flex-1 min-w-0 flex items-center gap-2">
                <button
                  onClick={() => router.push('/')}
                  className="text-3xl sm:text-4xl lg:text-5xl hover:scale-110 transition-transform flex-shrink-0"
                  aria-label="Go to homepage"
                >
                  🍫
                </button>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-chocolate-900">
                    Build Your Cup
                  </h1>
                  <p className="text-chocolate-600 text-xs sm:text-sm mt-1">
                    Scroll down to see all options ↓
                  </p>
                </div>
              </div>
            </div>

            {/* Organic Badge */}
            <div className="mb-6 lg:mb-8 p-3 lg:p-4 bg-green-100 border-2 border-green-600 rounded-xl">
              <div className="flex items-center gap-3 lg:gap-4">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0250/3894/6349/files/USDA-Organic-Four-Color-Organic-Seal_480x480.jpg?v=1708356533" 
                  alt="USDA Organic Certified" 
                  className="w-12 h-12 lg:w-16 lg:h-16 flex-shrink-0 object-contain"
                />
                <div className="min-w-0">
                  <p className="text-green-900 font-bold text-sm sm:text-base lg:text-lg">100% ORGANIC INGREDIENTS</p>
                  <p className="text-green-800 text-xs sm:text-sm">All ingredients are USDA Certified Organic</p>
                </div>
              </div>
            </div>

        {/* Cup Size */}
        <Section title="Cup Size">
          <div className="grid grid-cols-3 gap-3">
            {productConfig.sizes.filter(s => s.available).map((s) => (
              <OptionButton
                key={s.id}
                selected={size === s.id}
                onClick={() => setSize(s.id)}
                label={s.name}
                price={s.price}
              />
            ))}
          </div>
        </Section>

        {/* Milk Type */}
        <Section title="Milk Type">
          <div className="grid grid-cols-2 gap-3">
            {productConfig.milkTypes.filter(m => m.available).map((m) => (
              <OptionButton
                key={m.id}
                selected={milkType === m.id}
                onClick={() => setMilkType(m.id)}
                label={m.name}
                price={m.price}
              />
            ))}
          </div>
        </Section>

        {/* Sweetness */}
        <Section title="Sweetness Level">
          <div className="grid grid-cols-3 gap-3">
            {productConfig.sweetnessLevels.map((s) => (
              <OptionButton
                key={s.id}
                selected={sweetness === s.id}
                onClick={() => setSweetness(s.id)}
                label={s.name}
                price={s.price}
              />
            ))}
          </div>
        </Section>

        {/* Toppings */}
        <Section title="Toppings" subtitle="Select as many as you like">
          <div className="grid grid-cols-2 gap-3">
            {productConfig.toppings.filter(t => t.available).map((t) => (
              <ToggleButton
                key={t.id}
                selected={selectedToppings.includes(t.id)}
                onClick={() => toggleTopping(t.id)}
                label={t.name}
                icon={t.icon}
                price={t.price}
              />
            ))}
          </div>
        </Section>

        {/* Flavor Add-ons */}
        <Section title="Flavor Add-ons" subtitle="Make it extra special">
          <div className="grid grid-cols-2 gap-3">
            {productConfig.flavorAddons.filter(f => f.available).map((f) => (
              <ToggleButton
                key={f.id}
                selected={selectedFlavors.includes(f.id)}
                onClick={() => toggleFlavor(f.id)}
                label={f.name}
                icon={f.icon}
                price={f.price}
              />
            ))}
          </div>
        </Section>

            {/* Visual indicator to scroll */}
            <motion.div
              className="flex justify-center mb-6"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6 text-chocolate-400" />
            </motion.div>
          </div>
        </div>

        {/* Right Sidebar - Cart (Fixed) */}
        <div className="w-96 bg-white border-l border-chocolate-200 shadow-2xl overflow-y-auto">
          <div className="sticky top-0 bg-white z-10 border-b border-chocolate-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-serif font-bold text-chocolate-900">Your Order</h2>
              <div className="bg-chocolate-100 rounded-full px-3 py-1">
                <span className="text-chocolate-800 font-semibold">{totalItems} items</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Current Customization */}
            <div className="bg-chocolate-50 rounded-xl p-4 mb-6 border-2 border-chocolate-300">
              <h3 className="font-semibold text-chocolate-900 mb-3 text-sm uppercase tracking-wide">Current Item</h3>
              <div className="space-y-2 text-sm text-chocolate-700">
                <p><strong>Size:</strong> {productConfig.sizes.find(s => s.id === size)?.name}</p>
                <p><strong>Milk:</strong> {productConfig.milkTypes.find(m => m.id === milkType)?.name}</p>
                <p><strong>Sweetness:</strong> {productConfig.sweetnessLevels.find(s => s.id === sweetness)?.name}</p>
                {selectedToppings.length > 0 && (
                  <p><strong>Toppings:</strong> {selectedToppings.length}</p>
                )}
                {selectedFlavors.length > 0 && (
                  <p><strong>Flavors:</strong> {selectedFlavors.length}</p>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-chocolate-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-chocolate-700 font-medium">Quantity</span>
                  <div className="flex items-center gap-3 bg-white rounded-lg p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-chocolate-100 transition-colors"
                    >
                      <Minus className="w-4 h-4 text-chocolate-700" />
                    </button>
                    <span className="w-8 text-center font-semibold text-chocolate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-chocolate-100 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-chocolate-700" />
                    </button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-chocolate-600 to-chocolate-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Add to Cart • {formatPrice(currentPrice * quantity)}
                </motion.button>
              </div>
            </div>

            {/* Cart Items */}
            {items.length > 0 ? (
              <>
                <h3 className="font-semibold text-chocolate-900 mb-3 text-sm uppercase tracking-wide">Cart ({totalItems})</h3>
                <div className="space-y-3 mb-6">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white border border-chocolate-200 rounded-lg p-3 text-sm"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-chocolate-800">Hot Chocolate</span>
                          <span className="font-semibold text-chocolate-900">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                        <p className="text-xs text-chocolate-600">Qty: {item.quantity} • {productConfig.sizes.find(s => s.id === item.size)?.name}</p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="bg-chocolate-100 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center text-lg font-bold text-chocolate-900">
                    <span>Total</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/cart')}
                  className="w-full bg-gold-400 text-chocolate-900 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Go to Cart
                </motion.button>
              </>
            ) : (
              <div className="text-center py-12 text-chocolate-500">
                <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p>Your cart is empty</p>
                <p className="text-sm mt-1">Add items to get started!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-chocolate-800 mb-1">{title}</h2>
      {subtitle && <p className="text-sm text-chocolate-600 mb-3">{subtitle}</p>}
      {children}
    </div>
  );
}

function OptionButton({ selected, onClick, label, price }: { selected: boolean; onClick: () => void; label: string; price: number }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`p-4 rounded-xl border-2 transition-all ${
        selected
          ? 'border-chocolate-600 bg-chocolate-100 shadow-md'
          : 'border-chocolate-200 bg-white hover:border-chocolate-400'
      }`}
    >
      <div className="text-center">
        <p className={`font-semibold ${selected ? 'text-chocolate-900' : 'text-chocolate-700'}`}>
          {label}
        </p>
        {price > 0 && (
          <p className="text-sm text-chocolate-500 mt-1">+{formatPrice(price)}</p>
        )}
      </div>
    </motion.button>
  );
}

function ToggleButton({ selected, onClick, label, icon, price }: { selected: boolean; onClick: () => void; label: string; icon?: string; price: number }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`p-4 rounded-xl border-2 transition-all ${
        selected
          ? 'border-chocolate-600 bg-chocolate-100 shadow-md'
          : 'border-chocolate-200 bg-white hover:border-chocolate-400'
      }`}
    >
      <div className="flex items-center gap-2">
        {icon && <span className="text-2xl">{icon}</span>}
        <div className="flex-1 text-left">
          <p className={`font-medium text-sm ${selected ? 'text-chocolate-900' : 'text-chocolate-700'}`}>
            {label}
          </p>
          <p className="text-xs text-chocolate-500">+{formatPrice(price)}</p>
        </div>
      </div>
    </motion.button>
  );
}
