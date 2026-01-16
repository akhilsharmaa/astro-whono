import { defineConfig } from 'astro/config';

export default defineConfig({
  // Required for RSS generation. Replace with your real domain.
  site: 'https://example.com',
  trailingSlash: 'always',
  markdown: {
    shikiConfig: {
      theme: 'github-light'
    }
  }
});
