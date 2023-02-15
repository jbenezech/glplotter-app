import {rmSync} from 'node:fs';
import path from 'node:path';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-electron-plugin';
import {loadViteEnv} from 'vite-electron-plugin/plugin';
import renderer from 'vite-plugin-electron-renderer';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({command}) => {
  rmSync('dist-electron', {recursive: true, force: true});

  const sourcemap = command === 'serve';

  return {
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
      react(),
      tsconfigPaths(),
      electron({
        include: ['src/main'],
        transformOptions: {
          sourcemap,
        },
        plugins: [
          // Allow use `import.meta.env.VITE_SOME_KEY` in Electron-Main
          loadViteEnv(),
        ],
      }),
      // Use Node.js API in the Renderer-process
      renderer({
        nodeIntegration: true,
      }),
    ],
    clearScreen: false,
  };
});
