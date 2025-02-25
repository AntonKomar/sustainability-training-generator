import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
    tailwindcss(),
  ],
  build: {
    outDir: 'build',
  },
  server: {
    host: '0.0.0.0',
    port: 4000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4001',
        changeOrigin: true,
      },
    },
  },
  define: {
    global: 'window',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: [
      '@mui/icons-material',
      '@mui/material',
      '@mui/base',
      '@mui/styles',
      '@mui/system',
      '@mui/utils',
      '@emotion/cache',
      '@emotion/react',
      '@emotion/styled',
      'lodash',
    ],
    exclude: [],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
});
