import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        vln: {
          bg: '#0f0f0f',
          sage: '#a6c3a7',
          bluegray: '#aab7c8',
          accent: '#a6c3a7',
          glow: '#a6c3a7',
        },
      },
      borderRadius: {
        vln: '12px',
      },
      boxShadow: {
        'vln-glow': '0 0 8px #a6c3a7',
        'vln-glow-lg': '0 0 16px #a6c3a7',
        'vln-lift': '0 4px 12px rgba(0, 0, 0, 0.4)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
