import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {cpSync, existsSync, statSync} from 'fs';
import {createReadStream} from 'fs';
import path from 'path';
import type {Plugin} from 'vite';
import {defineConfig} from 'vite';

const assetsDir = path.resolve(__dirname, 'src/assets');

function srcAssetsPlugin(): Plugin {
  return {
    name: 'src-assets-static',
    configureServer(server) {
      server.middlewares.use('/assets', (req, res, next) => {
        const requestPath = decodeURIComponent((req.url ?? '/').split('?')[0]);
        const filePath = path.join(assetsDir, requestPath);

        if (!filePath.startsWith(assetsDir) || !existsSync(filePath) || !statSync(filePath).isFile()) {
          next();
          return;
        }

        createReadStream(filePath).pipe(res);
      });
    },
    closeBundle() {
      cpSync(assetsDir, path.resolve(__dirname, 'dist/assets'), {recursive: true});
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), srcAssetsPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
