import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function syncOfflineAssets() {
  function syncContent() {
    const srcContent = path.resolve(__dirname, 'content');
    const pubContent = path.resolve(__dirname, 'public', 'content');
    if (fs.existsSync(srcContent)) {
      fs.cpSync(srcContent, pubContent, { recursive: true });
    }
    const swSrc = path.resolve(__dirname, 'sw.js');
    const swPub = path.resolve(__dirname, 'public', 'sw.js');
    if (fs.existsSync(swSrc)) {
      fs.copyFileSync(swSrc, swPub);
    }
  }

  return {
    name: 'sync-offline-assets',
    buildStart() {
      syncContent();
    },
    configureServer(server) {
      syncContent();
    },
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const distAssetsDir = path.join(distDir, 'assets');
      const distContentDir = path.join(distDir, 'content');
      const distSw = path.join(distDir, 'sw.js');
      if (fs.existsSync(distSw)) {
        const prodAssets = [
          '/',
          '/index.html',
          '/manifest.webmanifest',
          '/favicon.svg'
        ];
        if (fs.existsSync(distAssetsDir)) {
          fs.readdirSync(distAssetsDir).forEach(f => {
            prodAssets.push(`/assets/${f}`);
          });
        }
        if (fs.existsSync(distContentDir)) {
          fs.readdirSync(distContentDir).forEach(f => {
            if (f.endsWith('.json')) {
              prodAssets.push(`/content/${f}`);
            }
          });
        }
        const precacheCode = `const PRECACHE_ASSETS = [\n${prodAssets.map(a => `  '${a}'`).join(',\n')}\n];`;
        let swContent = fs.readFileSync(distSw, 'utf8');
        swContent = swContent.replace(/const PRECACHE_ASSETS = \[[\s\S]*?\];/, precacheCode);
        fs.writeFileSync(distSw, swContent, 'utf8');
      }
    }
  };
}

export default defineConfig({
  root: '.',
  publicDir: 'public',
  plugins: [syncOfflineAssets()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2022',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  server: {
    port: 3000,
    host: true
  }
});
