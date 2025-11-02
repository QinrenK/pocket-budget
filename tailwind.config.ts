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
        // Wealthsimple-inspired palette
        'ws-coral': '#FF5A5F',
        'ws-coral-dark': '#E84A4F',
        'ws-coral-light': '#FFE8E9',
        'ws-green': '#00D68F',
        'ws-green-light': '#E6FBF4',
        'ws-yellow': '#FFB800',
        'ws-yellow-light': '#FFF8E6',
        'ws-red': '#FF3B30',
        'ws-red-light': '#FFE8E6',
        'ws-gray': {
          50: '#FAFAFA',
          100: '#F5F5F5',
          300: '#D1D1D1',
          500: '#8A8A8A',
          700: '#4A4A4A',
          900: '#1A1A1A',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        'display': ['56px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h1': ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h2': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['18px', { lineHeight: '1.4', fontWeight: '600' }],
      },
      boxShadow: {
        'ws-sm': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'ws-md': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'ws-lg': '0 8px 32px rgba(0, 0, 0, 0.16)',
        'ws-coral': '0 4px 12px rgba(255, 90, 95, 0.3)',
        'ws-coral-hover': '0 6px 20px rgba(255, 90, 95, 0.4)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 400ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scaleIn 300ms cubic-bezier(0.25, 1, 0.5, 1) both',
        'slide-in-right': 'slideInRight 400ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'shimmer': 'shimmer 2s infinite linear',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(16px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        scaleIn: {
          'from': {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          'to': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        slideInRight: {
          'from': {
            transform: 'translateX(100%)',
            opacity: '0',
          },
          'to': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-1000px 0',
          },
          '100%': {
            backgroundPosition: '1000px 0',
          },
        },
        pulseSoft: {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.7',
          },
        },
      },
      transitionTimingFunction: {
        'expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
    },
  },
  plugins: [],
}

export default config

