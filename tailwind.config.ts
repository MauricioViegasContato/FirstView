import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#07080A',
        surface: {
          50: '#181A20',
          100: '#13151A',
          200: '#0F1116',
          300: '#0A0C0F',
        },
        cinema: {
          gold: '#D4AF37',
          'gold-light': '#F3D476',
          'gold-dark': '#A07E1C',
          amber: '#F59E0B',
          red: '#FF3823',
          silver: '#94A3B8',
          subtle: '#64748B',
        },
        fv: {
          red: '#FF3823',
          'red-hover': '#FF523F',
          'red-dark': '#CC2513',
          blue: '#0066FF',
          'blue-light': '#38BDF8',
          'blue-dark': '#0047B3',
          dark: '#050608',
          surface: '#0E1015',
          card: '#13151C',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cinzel)', 'Georgia', 'serif'],
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
        'marquee-reverse': 'marquee-reverse 35s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
