/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        burgundy: {
          50: '#FDF2F4',
          100: '#FBE5E9',
          200: '#F7C1CB',
          300: '#F08FA3',
          400: '#E45274',
          500: '#C9204B',
          600: '#9E1336',
          700: '#750B25',
          800: '#5B0E1D', // Primary Maroon
          900: '#3A0812', // Dark Wine
          950: '#25030A',
        },
        gold: {
          50: '#FAF6EB',
          100: '#F2E8CD',
          200: '#E4CD95',
          300: '#D5B15D',
          400: '#C5902B',
          500: '#A4731C',
          600: '#835914',
          700: '#62410D',
          800: '#422A07',
          900: '#261702',
          950: '#140C00',
          accent: '#D4AF37',  // Metallic Gold
          vintage: '#C5A059', // Vintage Gold
          light: '#E8D5B5',   // Champagne Gold
        },
        cream: {
          50: '#FFFDF9',  // Linen White
          100: '#FAF7F2', // Soft Antique Cream
          200: '#F3EDE0',
          300: '#EBE2CD',
          400: '#DECFAF',
          500: '#CDB78C',
          600: '#B59968',
          700: '#9B7C48',
          800: '#7B6033',
          900: '#513E1E',
          950: '#2E2210',
        },
        charcoal: {
          50: '#F8F8F7',
          100: '#ECECEB',
          200: '#D5D5D3',
          300: '#B4B4B0',
          400: '#8E8E89',
          500: '#70706B',
          600: '#595955',
          700: '#4A4A46',
          800: '#1F1A17', // Main Dark Text
          900: '#151210',
          950: '#0B0908',
        },
        surface: {
          50: '#FAF7F2',
          100: '#F3EDE0',
          200: '#EBE2CD',
          300: '#CDB78C',
        },
        dark: '#1F1A17',
        muted: '#70645C', // Warm Taupe
        success: '#2E7D32',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'serif'],
        sans: ['Montserrat', 'Inter', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'serif'],
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'morph': 'morph 8s ease-in-out infinite',
        'wave': 'wave 10s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.3)' },
          '50%': { boxShadow: '0 0 0 12px rgba(212, 175, 55, 0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        wave: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
