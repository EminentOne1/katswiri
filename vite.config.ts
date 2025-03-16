import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-router-dom/server': path.resolve(__dirname, 'node_modules/react-router-dom/server.js'),
    },
  },
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: 'dist/server',
  },
  ssr: {
    noExternal: true,
  },
});
