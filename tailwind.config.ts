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
          bg: 'var(--vln-bg)',
          sage: 'var(--vln-sage)',
          bluegray: 'var(--vln-bluegray)',
          accent: 'var(--vln-accent)',
          glow: 'var(--vln-glow)',
          white: 'var(--vln-white)',
          gray: {
            50: 'var(--vln-gray-50)',
            100: 'var(--vln-gray-100)',
            200: 'var(--vln-gray-200)',
            300: 'var(--vln-gray-300)',
            400: 'var(--vln-gray-400)',
            500: 'var(--vln-gray-500)',
            600: 'var(--vln-gray-600)',
            700: 'var(--vln-gray-700)',
            800: 'var(--vln-gray-800)',
            900: 'var(--vln-gray-900)',
          },
          danger: 'var(--vln-danger)',
          'danger-hover': 'var(--vln-danger-hover)',
          'danger-light': 'var(--vln-danger-light)',
          success: 'var(--vln-success)',
          'success-hover': 'var(--vln-success-hover)',
          'success-light': 'var(--vln-success-light)',
          warning: 'var(--vln-warning)',
          'warning-hover': 'var(--vln-warning-hover)',
          'warning-light': 'var(--vln-warning-light)',
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
