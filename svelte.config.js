import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  compilerOptions: {
    runes: false  // ← das hier ergänzen
  },
  kit: {
    adapter: adapter()
  }
};

export default config;