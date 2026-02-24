/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/@astrojs/starlight/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        vln: {
          charcoal: '#0f0f0f',
          sage: '#a6c3a7',
          'blue-gray': '#aab7c8',
          white: '#f5f5f5',
          success: '#4ade80',
          warning: '#facc15',
          error: '#ef4444',
          info: '#60a5fa',
        },
      },
      borderRadius: {
        vln: '12px',
      },
      boxShadow: {
        'vln-glow': '0 0 8px rgba(166, 195, 167, 0.15)',
      },
    },
  },
};

export default config;
