import {build} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import renderer from 'vite-plugin-electron-renderer';

function buildMain() {
  return build({
    configFile: 'vite.config.ts',
  });
}

//Build worker separately as its root will be different
function buildWorker() {
  return build({
    root: 'src/worker',
    configFile: 'vite.config.ts',
    plugins: [
      tsconfigPaths(),
      renderer({
        nodeIntegration: true,
      }),
    ],
    build: {
      rollupOptions: {
        output: {
          dir: 'dist/worker',
        },
      },
    },
  });
}

await buildMain();
await buildWorker();
