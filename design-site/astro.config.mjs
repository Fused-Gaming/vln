import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'VLN Design System',
      description: 'VLN - Vulnerability Lab Network | Design System, Brand Guidelines & UX Documentation',
      logo: {
        src: './src/assets/vln-logo-dark.svg',
        alt: 'VLN Logo'
      },
      social: {
        github: 'https://github.com/Fused-Gaming/vln',
        discord: 'https://discord.gg/vln'
      },
      customCss: [
        './src/styles/custom.css',
      ],
      sidebar: [
        {
          label: 'Overview',
          autogenerate: { directory: 'overview' },
        },
        {
          label: 'Design Tokens',
          autogenerate: { directory: 'tokens' },
        },
        {
          label: 'Components',
          autogenerate: { directory: 'components' },
        },
        {
          label: 'Pages',
          autogenerate: { directory: 'pages' },
        },
        {
          label: 'UX Flows',
          autogenerate: { directory: 'ux-flows' },
        },
        {
          label: 'Assets & Patterns',
          autogenerate: { directory: 'assets' },
        },
        {
          label: 'Performance',
          autogenerate: { directory: 'performance' },
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/Fused-Gaming/vln/edit/integration/vln/design-site/src/content/docs/',
      },
      lastUpdated: true,
    })
  ],
  output: 'static',
  build: {
    format: 'file'
  }
});
