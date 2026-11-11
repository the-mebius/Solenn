import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  root: '.',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        shop: resolve(__dirname, 'shop.html'),
        about: resolve(__dirname, 'about.html'),
        journal: resolve(__dirname, 'journal.html'),
        archive: resolve(__dirname, 'archive.html'),
        '404': resolve(__dirname, '404.html')
      }
    }
  }
});
