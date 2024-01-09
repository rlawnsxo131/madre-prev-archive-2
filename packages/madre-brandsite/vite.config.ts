import { unstable_vitePlugin as remix } from '@remix-run/dev';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type PluginOption, splitVendorChunkPlugin } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    remix(),
    tsconfigPaths(),
    splitVendorChunkPlugin(),
    visualizer({
      filename: './dist/report.html',
      open: true,
      gzipSize: true,
    }) as PluginOption,
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'app'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        compact: true,
        manualChunks: (id) => {
          if (
            id.includes('react-router-dom') ||
            id.includes('@remix-run') ||
            id.includes('react-router')
          ) {
            return 'vendor/@react-router';
          } else if (id.includes('framer-motion')) {
            return 'vendor/@framer';
          } else if (id.includes('react') || id.includes('react-dom')) {
            return 'vendor/@react';
          } else if (id.includes('madre-shared')) {
            return 'vendor/@madre';
          }
        },
      },
    },
  },
});
