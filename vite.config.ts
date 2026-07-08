import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { resolve } from 'node:path'
import { rmSync } from 'node:fs'

// public/mockups는 디자인 시안 작업물 — 개발 서버에선 서빙하되 배포 산출물에선 제거
const stripMockups = (): Plugin => ({
  name: 'strip-mockups-from-dist',
  apply: 'build',
  closeBundle() {
    rmSync(resolve(__dirname, 'dist/mockups'), { recursive: true, force: true })
  },
})

export default defineConfig({
  plugins: [react(), tailwindcss(), stripMockups()],
  server: process.env.PORT ? { port: Number(process.env.PORT) } : undefined,
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'design-system': resolve(__dirname, 'design-system.html'),
      },
    },
  },
})
