import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import withReactRouter from 'vite-plugin-next-react-router';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), withReactRouter()],
  server: {
    port: 3000,
  },
});
