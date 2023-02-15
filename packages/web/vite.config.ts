import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  publicDir: './public',
  base: './',
  resolve: {
    alias: [
      {
        find: '@glplotter-app/common',
        replacement: path.resolve(__dirname, '../common/src/index.ts'),
      },
      {
        // this is required for the SCSS modules
        find: /^~(.*)$/,
        replacement: '$1',
      },
    ],
  },
  plugins: [
    // …
    react({
      // Use React plugin in all *.jsx and *.tsx files
      include: '**/*.{jsx,tsx}',
    }),

    tsconfigPaths(),
  ],
});
