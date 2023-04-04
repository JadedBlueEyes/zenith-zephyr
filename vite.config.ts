import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

let build_mode = process.env.BUILD_MODE || 'web-standalone';
let is_tauri = build_mode === 'tauri';

// https://vitejs.dev/config/
// https://tauri.app/v1/guides/getting-started/setup/vite

let env_prefix = is_tauri ? ['VITE_', 'TAURI_'] : undefined;
let target = is_tauri ? (process.env.TAURI_PLATFORM == 'windows' ? 'chrome105' : 'safari13') : 'chrome111,firefox111,safari16,node18';

export default defineConfig({
  clearScreen: false,
  plugins: [svelte()],

  server: {
    strictPort: is_tauri,
  },
  envPrefix: env_prefix,
  build: {
    target,
    outDir: is_tauri ? 'dist-tauri' : 'dist',
  }
})
