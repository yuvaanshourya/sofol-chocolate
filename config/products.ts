export interface Topping {
  id: string;
  name: string;
  price: number;
  available: boolean;
  icon?: string;
}

export interface FlavorAddon {
  id: string;
  name: string;
  price: number;
  available: boolean;
  icon?: string;
}

export interface MilkType {
  id: string;
  name: string;
  price: number;
  available: boolean;
}

export interface CupSize {
  id: string;
  name: string;
  price: number;
  available: boolean;
}

export interface SweetnessLevel {
  id: string;
  name: string;
  price: number;
}

export interface ProductConfig {
  basePrice: number;
  sizes: CupSize[];
  milkTypes: MilkType[];
  sweetnessLevels: SweetnessLevel[];
  toppings: Topping[];
  flavorAddons: FlavorAddon[];
}

export interface CartItem {
  id: string;
  size: string;
  milkType: string;
  sweetness: string;
  toppings: string[];
  flavorAddons: string[];
  quantity: number;
  price: number;
}

// EASY CONFIGURATION - Update these values for your pop-up
export const productConfig: ProductConfig = {
  basePrice: 3.50, // Base hot chocolate price
  
  sizes: [
    { id: '6oz', name: '6oz', price: -0.50, available: true },
    { id: '8oz', name: '8oz', price: 0, available: true },
    { id: '10oz', name: '10oz', price: 0.50, available: true },
  ],
  
  milkTypes: [
    { id: 'whole', name: 'Whole Milk', price: 0, available: true },
    { id: 'oat', name: 'Oat Milk', price: 0, available: true },
  ],
  
  sweetnessLevels: [
    { id: 'less', name: 'Less Sweet', price: 0 },
    { id: 'regular', name: 'Regular', price: 0 },
    { id: 'extra', name: 'Extra Sweet', price: 0 },
  ],
  
  toppings: [
    { id: 'marshmallows', name: 'Marshmallows', price: 0.25, available: true, icon: '☁️' },
    { id: 'whipped-cream', name: 'Whipped Cream', price: 0.25, available: true, icon: '🍦' },
    { id: 'chocolate-shavings', name: 'Chocolate Shavings', price: 0.25, available: true, icon: '🍫' },
    { id: 'cinnamon', name: 'Cinnamon', price: 0, available: true, icon: '✨' },
    { id: 'caramel-drizzle', name: 'Caramel Drizzle', price: 0.25, available: true, icon: '🍯' },
  ],
  
  flavorAddons: [
    { id: 'peppermint', name: 'Peppermint', price: 0.25, available: true, icon: '🌿' },
    { id: 'vanilla', name: 'Vanilla', price: 0.25, available: true, icon: '🤍' },
    { id: 'sea-salt', name: 'Sea Salt', price: 0.25, available: true, icon: '🧂' },
  ],
};

// Helper function to calculate price
export function calculateItemPrice(
  size: string,
  milkType: string,
  toppings: string[],
  flavorAddons: string[]
): number {
  let price = productConfig.basePrice;
  
  const selectedSize = productConfig.sizes.find(s => s.id === size);
  if (selectedSize) price += selectedSize.price;
  
  const selectedMilk = productConfig.milkTypes.find(m => m.id === milkType);
  if (selectedMilk) price += selectedMilk.price;
  
  toppings.forEach(toppingId => {
    const topping = productConfig.toppings.find(t => t.id === toppingId);
    if (topping) price += topping.price;
  });
  
  flavorAddons.forEach(addonId => {
    const addon = productConfig.flavorAddons.find(a => a.id === addonId);
    if (addon) price += addon.price;
  });
  
  return price;
}
