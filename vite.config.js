import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        shop: resolve(__dirname, 'shop.html'),
        about: resolve(__dirname, 'about.html'),
        '404': resolve(__dirname, '404.html')
      }
    }
  }
});
