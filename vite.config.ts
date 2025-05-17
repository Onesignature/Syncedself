import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        }
      },
    },
    define: {
      'process.env.VITE_TOGETHER_API_KEY': JSON.stringify(env.TOGETHER_API_KEY),
    }
  }
});