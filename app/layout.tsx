import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "🍫 Sofol - Artisan Hot Chocolate",
  description: "Craft your perfect cup of warmth and indulgence with all-organic ingredients. 100% USDA Certified Organic hot chocolate customized just for you.",
  keywords: ["hot chocolate", "artisan", "organic", "USDA certified", "custom drinks", "pop-up"],
  authors: [{ name: "Sofol" }],
  
  // Open Graph meta tags (for WhatsApp, Facebook, LinkedIn)
  openGraph: {
    title: "🍫 Sofol - Artisan Hot Chocolate",
    description: "Craft your perfect cup of warmth and indulgence with all-organic ingredients. 100% USDA Certified Organic.",
    url: "https://sofoleats.com/hot-chocolate",
    siteName: "Sofol",
    locale: "en_US",
    type: "website",
  },
  
  // Twitter Card meta tags
  twitter: {
    card: "summary_large_image",
    title: "🍫 Sofol - Artisan Hot Chocolate",
    description: "Craft your perfect cup of warmth and indulgence with all-organic ingredients. 100% USDA Certified Organic.",
  },
  
  // Additional meta tags
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
