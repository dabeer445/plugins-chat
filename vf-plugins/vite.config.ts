/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '',
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    outDir: 'build',
    lib: {
      // entry: path.resolve(__dirname, 'src/main.ts'),
      entry: path.resolve(__dirname, 'src/main.jsx'),
      name: 'voiceflow-webchat-plugin',
      fileName: 'bundle',
      formats: ['es'],
    },
  },
  plugins: [
    react(),
  ],
});
