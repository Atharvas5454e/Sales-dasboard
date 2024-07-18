import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://your-api-server.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        timeout: 10000,
        onProxyReq: (proxyReq, req, res) => {
          console.log(`Proxying request ${req.method} ${req.url} to ${proxyReq.getHeader('host')}`);
        },
        onProxyRes: (proxyRes, req, res) => {
          console.log(`Received response ${proxyRes.statusCode} for ${req.method} ${req.url}`);
        },
      }
      },
    },
  },
});
