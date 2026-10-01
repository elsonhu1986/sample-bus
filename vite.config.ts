import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

function apiDevMiddleware(): Plugin {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        const parsedUrl = new URL(req.url, 'http://localhost:3000');
        const query: Record<string, string> = {};
        parsedUrl.searchParams.forEach((val, key) => {
          query[key] = val;
        });

        const reqMock: any = {
          method: req.method,
          query,
          headers: req.headers,
        };

        const resMock: any = {
          setHeader: (name: string, val: string) => res.setHeader(name, val),
          status: (code: number) => {
            res.statusCode = code;
            return resMock;
          },
          json: (data: any) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
          },
          end: (data?: any) => res.end(data),
        };

        try {
          if (parsedUrl.pathname === '/api/health') {
            const { default: handler } = await import('./api/health.js');
            return handler(reqMock, resMock);
          } else if (
            parsedUrl.pathname === '/api/bus-arrival' ||
            parsedUrl.pathname === '/api/BusArrival'
          ) {
            const { default: handler } = await import('./api/bus-arrival.js');
            return handler(reqMock, resMock);
          }
        } catch (err) {
          console.error('API middleware error:', err);
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiDevMiddleware()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
