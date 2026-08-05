import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      // Import from the library *source* (root barrel) so component edits hot-reload
      // without a rollup build. Import only from '@appica/ui-react' here - subpaths
      // resolve to dist/ and would need a packed build.
      {
        find: /^@appica\/ui-react$/,
        replacement: fileURLToPath(new URL('../../packages/react/src/index.ts', import.meta.url)),
      },
    ],
  },
})
