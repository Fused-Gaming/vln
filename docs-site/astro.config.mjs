import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://docs.vln.gg',
  integrations: [
    starlight({
      title: 'VLN Documentation',
      description: 'VLN - Vulnerability Lab Network | iGaming Security & Smart Contract Intelligence',
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
          label: 'Documentation',
          autogenerate: { directory: 'getting-started' },
        },
        {
          label: 'Design System',
          autogenerate: { directory: 'design' },
        },
        {
          label: 'Architecture',
          autogenerate: { directory: 'architecture' },
        },
        {
          label: 'DevOps & CI/CD',
          autogenerate: { directory: 'devops' },
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/Fused-Gaming/vln/edit/integration/vln/docs-site/src/content/docs/',
      },
      lastUpdated: true,
    })
  ],
  output: 'static',
  build: {
    format: 'file'
  }
});
