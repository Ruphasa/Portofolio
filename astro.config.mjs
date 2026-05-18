import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://ruphasa.github.io',
  base: '/rizqi-fauzan-persona-showcase',
  integrations: [react()],
});
