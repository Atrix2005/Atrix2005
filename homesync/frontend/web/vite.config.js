import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
var __dirname = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig(function (_a) {
    var mode = _a.mode;
    var env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react()],
        server: {
            port: 5173,
            host: true
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
        define: {
            __APP_NAME__: JSON.stringify('HomeSync Web')
        }
    };
});
