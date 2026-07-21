/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pearl: {
          50: '#FDFDFE',
          100: '#FAFBFD',
          200: '#F1F3F7',
          300: '#E5E8F0',
          400: '#D2D7E5',
          DEFAULT: '#FAFAFC',
        },
        gold: {
          light: '#F7E9C8',
          DEFAULT: '#D4AF37',
          deep: '#B8860B',
          glow: '#FCE762',
          metallic: 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)',
        },
        silver: {
          light: '#F8FAFC',
          DEFAULT: '#CBD5E1',
          dark: '#64748B',
        },
        obsidian: {
          light: '#1E202B',
          DEFAULT: '#0B0C10',
          pure: '#030304',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass-sm': '0 8px 32px 0 rgba(31, 38, 135, 0.05)',
        'glass-md': '0 8px 32px 0 rgba(212, 175, 55, 0.08)',
        'glass-gold': '0 10px 40px -10px rgba(212, 175, 55, 0.25)',
        'gold-glow': '0 0 50px rgba(212, 175, 55, 0.35)',
        'pearl-glow': '0 20px 60px rgba(243, 244, 247, 0.8)',
      },
      backdropBlur: {
        'xs': '2px',
        '2xl': '40px',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(2deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.08)' },
        },
        'shimmer': {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
      }
    },
  },
  plugins: [],
}
