import { unstable_vitePlugin as remix } from '@remix-run/dev';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [remix(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'app'),
    },
  },
});
