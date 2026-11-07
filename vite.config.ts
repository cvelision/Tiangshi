import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

function persistentGiftImagesPlugin(): Plugin {
  return {
    name: 'persistent-gift-images-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/save-gift-image' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const { giftId, dataUrl } = JSON.parse(body);
              if (giftId && dataUrl) {
                const giftsDir = path.resolve(__dirname, 'public/assets/gifts');
                if (!fs.existsSync(giftsDir)) {
                  fs.mkdirSync(giftsDir, { recursive: true });
                }

                let finalUrl = dataUrl;
                // If it's a base64 data url, write the binary file to disk
                const match = dataUrl.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
                if (match) {
                  const rawExt = match[1].toLowerCase();
                  const ext = rawExt.includes('jpeg') ? 'jpg' : rawExt.includes('png') ? 'png' : rawExt.includes('webp') ? 'webp' : 'jpg';
                  const buffer = Buffer.from(match[2], 'base64');
                  const fileName = `gift_${giftId}.${ext}`;
                  const filePath = path.join(giftsDir, fileName);
                  fs.writeFileSync(filePath, buffer);
                  finalUrl = `/assets/gifts/${fileName}`;
                }

                // Update public/gift_images.json
                const jsonPath = path.resolve(__dirname, 'public/gift_images.json');
                let current: Record<string, string> = {};
                try {
                  if (fs.existsSync(jsonPath)) {
                    current = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
                  }
                } catch {
                  current = {};
                }
                current[String(giftId)] = finalUrl;
                fs.writeFileSync(jsonPath, JSON.stringify(current, null, 2), 'utf-8');

                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, url: finalUrl }));
                return;
              }
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Missing giftId or dataUrl' }));
              return;
            } catch (err) {
              console.error('Error saving gift image:', err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: String(err) }));
              return;
            }
          });
        } else if (req.url === '/api/get-gift-images' && req.method === 'GET') {
          const jsonPath = path.resolve(__dirname, 'public/gift_images.json');
          if (fs.existsSync(jsonPath)) {
            const data = fs.readFileSync(jsonPath, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
            return;
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({}));
          return;
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), persistentGiftImagesPlugin()],
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
