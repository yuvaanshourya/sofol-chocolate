import { create } from 'zustand';
import { CartItem } from '@/config/products';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addItem: (item) => set((state) => {
    // Check if similar item exists
    const existingIndex = state.items.findIndex(
      (i) =>
        i.size === item.size &&
        i.milkType === item.milkType &&
        i.sweetness === item.sweetness &&
        JSON.stringify(i.toppings.sort()) === JSON.stringify(item.toppings.sort()) &&
        JSON.stringify(i.flavorAddons.sort()) === JSON.stringify(item.flavorAddons.sort())
    );
    
    if (existingIndex >= 0) {
      const newItems = [...state.items];
      newItems[existingIndex].quantity += item.quantity;
      return { items: newItems };
    }
    
    return { items: [...state.items, { ...item, id: Date.now().toString() }] };
  }),
  
  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id),
  })),
  
  updateQuantity: (id, quantity) => set((state) => ({
    items: state.items.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    ),
  })),
  
  clearCart: () => set({ items: [] }),
  
  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
  
  getTotalItems: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.quantity, 0);
  },
}));
