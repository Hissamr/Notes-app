import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'frontend',
  publicDir: 'public',
  build: {
    outDir: '../dist'
  },
  server: {
    port: 8080
  }
});
