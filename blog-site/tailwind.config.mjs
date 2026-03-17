/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'vln-bg': '#0f0f0f',
        'vln-sage': '#a6c3a7',
        'vln-bluegray': '#aab7c8',
        'vln-white': '#f5f5f5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        vln: '12px',
      },
    },
  },
  plugins: [],
};
