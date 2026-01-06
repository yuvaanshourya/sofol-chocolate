import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        chocolate: {
          50: '#FAF8F5',
          100: '#F5F0EA',
          200: '#E8DED0',
          300: '#D4C4B0',
          400: '#B8A089',
          500: '#8B6F47',
          600: '#6F5639',
          700: '#5A452D',
          800: '#3D2E1F',
          900: '#2B1F15',
        },
        cream: {
          50: '#FFFEFB',
          100: '#FFF9F0',
          200: '#FFF3E0',
          300: '#FFE7C7',
          400: '#FFD7A3',
        },
        gold: {
          50: '#FFFBF0',
          100: '#FFF4D6',
          200: '#FFE8AD',
          300: '#FFD984',
          400: '#D4AF37',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      animation: {
        'steam': 'steam 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        steam: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.7' },
          '50%': { transform: 'translateY(-20px) scale(1.1)', opacity: '0.4' },
          '100%': { transform: 'translateY(-40px) scale(1.2)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
