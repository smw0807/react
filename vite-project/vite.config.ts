import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import withReactRouter from 'vite-plugin-next-react-router';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    withReactRouter({
      pageDir: 'src/pages',
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      layout: '_layout',
    }),
    tsconfigPaths(),
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL,
      },
    },
  },
});
