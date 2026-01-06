# ☕ Sofol - Artisan Hot Chocolate Ordering App

<div align="center">
  <h3>Premium Hot Chocolate Customization for Pop-Up Stores</h3>
  <p>A beautiful, production-ready ordering app with Apple Pay integration</p>
</div>

---

## 🎯 Features

✨ **Beautiful UI/UX**
- Premium, boutique café aesthetic with warm chocolate tones
- Smooth animations and micro-interactions
- Mobile-first responsive design
- Elegant typography (Playfair Display + Inter)

🎨 **Full Customization**
- Cup sizes (Small, Medium, Large)
- Multiple milk options (Whole, Oat, Almond, Coconut, Soy)
- Sweetness levels
- Premium toppings (Marshmallows, Whipped Cream, Chocolate Shavings, etc.)
- Flavor add-ons (Peppermint, Caramel, Hazelnut, Vanilla, Sea Salt)

🛒 **Smart Cart System**
- Real-time price calculation
- Quantity adjustments
- Persistent state management with Zustand
- Automatic cart merging for identical items

💳 **Apple Pay Integration**
- Stripe-powered secure payments
- One-tap checkout experience
- Beautiful loading states with custom hot chocolate animation
- Success confirmation screen with confetti

⚙️ **Easy Configuration**
- Simple product config file for prices and options
- Toggle availability of items
- Configurable tax rates
- No code changes needed for price updates

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Stripe account (free to sign up)
- Basic familiarity with terminal/command line

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   # Stripe Keys (Get from https://dashboard.stripe.com/apikeys)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
   STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
   
   # Optional: Tax rate (0.08 = 8%)
   NEXT_PUBLIC_TAX_RATE=0.0
   
   # Domain
   NEXT_PUBLIC_DOMAIN=localhost:3000
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Configuration

### Product Settings

Edit `config/products.ts` to customize your offerings:

```typescript
export const productConfig: ProductConfig = {
  basePrice: 5.00, // Base hot chocolate price
  
  sizes: [
    { id: 'small', name: 'Small (8oz)', price: 0, available: true },
    { id: 'medium', name: 'Medium (12oz)', price: 1.50, available: true },
    { id: 'large', name: 'Large (16oz)', price: 2.50, available: true },
  ],
  
  milkTypes: [
    { id: 'whole', name: 'Whole Milk', price: 0, available: true },
    { id: 'oat', name: 'Oat Milk', price: 0.75, available: true },
    // ...
  ],
  
  // ... toppings, flavors, etc.
};
```

**To disable an item:** Set `available: false`

**To change prices:** Update the `price` field (in USD)

### Tax Configuration

Edit `.env.local`:
```bash
# For 8.5% tax rate:
NEXT_PUBLIC_TAX_RATE=0.085

# For no tax:
NEXT_PUBLIC_TAX_RATE=0.0
```

---

## 💳 Stripe & Apple Pay Setup

### 1. Get Stripe Keys

1. Sign up at [stripe.com](https://stripe.com)
2. Go to [API Keys](https://dashboard.stripe.com/apikeys)
3. Copy your **Publishable key** and **Secret key**
4. Paste them into `.env.local`

### 2. Test Mode

The app works in **test mode** by default (keys starting with `pk_test_` and `sk_test_`).

**Test card for development:**
- Card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits

### 3. Production Setup

For your live pop-up:

1. **Activate your Stripe account**
   - Complete business verification in Stripe Dashboard
   - Add your bank account

2. **Switch to live keys**
   - Get your **live** keys (starting with `pk_live_` and `sk_live_`)
   - Update `.env.local` with live keys

3. **Enable Apple Pay** (Optional)
   - In Stripe Dashboard → Settings → Payment Methods
   - Enable Apple Pay
   - Verify your domain

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables from `.env.local`
   - Click Deploy

3. **Done!** Your app will be live at `your-app.vercel.app`

### Alternative Platforms

- **Netlify**: Similar process to Vercel
- **Railway**: Great for full-stack apps
- **Digital Ocean**: For more control

---

## 📱 Using the App

### Customer Flow

1. **Landing Page** (`/`)
   - Welcome screen with "Build Your Perfect Hot Chocolate" CTA

2. **Customization** (`/customize`)
   - Select size, milk type, sweetness
   - Add toppings and flavors
   - Adjust quantity
   - Add to cart

3. **Cart** (`/cart`)
   - Review items
   - Adjust quantities
   - Remove items
   - See price breakdown

4. **Checkout** (`/checkout`)
   - Order summary
   - Apple Pay payment

5. **Confirmation** (`/confirmation`)
   - Success animation
   - Pickup instructions

---

## 🎨 Customization

### Change Colors

Edit `app/globals.css`:

```css
@theme inline {
  /* Chocolate palette */
  --color-chocolate-600: #6F5639; /* Primary color */
  --color-chocolate-700: #5A452D; /* Darker shade */
  
  /* Cream palette */
  --color-cream-100: #FFF9F0; /* Background */
  
  /* Gold accents */
  --color-gold-400: #D4AF37; /* Accent color */
}
```

### Change Fonts

Edit `app/layout.tsx`:

```typescript
import { YourFont, AnotherFont } from "next/font/google";
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Payments**: Stripe
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

---

## 📂 Project Structure

```
sofol-chocolate/
├── app/                    # Next.js app directory
│   ├── api/               # API routes (Stripe)
│   ├── customize/         # Customization page
│   ├── cart/              # Cart page
│   ├── checkout/          # Checkout page
│   ├── confirmation/      # Order confirmation
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── HeroSection.tsx
│   ├── CustomizationPanel.tsx
│   ├── CartItem.tsx
│   ├── ApplePayButton.tsx
│   └── ...
├── config/                # Configuration
│   └── products.ts        # Product settings
├── lib/                   # Utilities
│   ├── utils.ts
│   └── stripe.ts
├── store/                 # State management
│   └── cartStore.ts
└── .env.local            # Environment variables
```

---

## 🐛 Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Stripe errors
- Check that keys are in `.env.local`
- Restart dev server after adding env vars
- Verify keys don't have extra spaces

### Styles not loading
```bash
rm -rf .next
npm run dev
```

### Colors not showing
Make sure `app/globals.css` has the custom color definitions

---

## 📝 To-Do Before Launch

- [ ] Update Stripe keys to **live** mode
- [ ] Set correct tax rate in `.env.local`
- [ ] Test full checkout flow
- [ ] Update product prices in `config/products.ts`
- [ ] Disable unavailable items
- [ ] Test on mobile devices
- [ ] Set up domain (if using custom domain)
- [ ] Train staff on order fulfillment

---

## 📄 License

MIT License - Feel free to use this for your pop-up!

---

## 💬 Support

For issues or questions:
1. Check this README first
2. Review the code comments
3. Check [Next.js docs](https://nextjs.org/docs)
4. Check [Stripe docs](https://stripe.com/docs)

---

<div align="center">
  <p>Made with ☕ for Sofol Pop-Up</p>
  <p><strong>Good luck with your launch!</strong></p>
</div>
