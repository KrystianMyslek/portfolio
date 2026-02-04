import { defineConfig } from 'vite'
import inject from "@rollup/plugin-inject";
import tailwindcss from '@tailwindcss/vite'
import usePHP from 'vite-plugin-php';

export default defineConfig({
  plugins: [
    inject({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    tailwindcss(),
    usePHP({
      entry: ['server/message.php'],
    })
  ],
  server: {
    open: '/server/message.php'
  }
})