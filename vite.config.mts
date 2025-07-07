import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import packageJSON from './package.json' with { type: 'json' };
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import copy from 'rollup-plugin-copy';

const umdOutDir = 'public/libs';

const deps = Object.keys(packageJSON.dependencies || {}).filter((pkg) => {
  return pkg !== 'pako'
})

export default defineConfig({
  plugins: [
    react(),
    svgr({ include: '**/*.svg' }),
    dts({
      include: ['src/**', 'custom.d.ts'],
      exclude: ['**/*.spec.{ts,tsx}', '**/__tests__/'],
    }),
    copy({
      targets: [{ src: 'dist/index.umd.js', dest: umdOutDir }],
      hook: 'writeBundle',
      verbose: true,
    }) as PluginOption,
  ],
  resolve: {
    alias: {
      'graphiql-snippets': path.resolve(__dirname, 'dist/index.esm.js'),
    },
  },
  build: {
    minify: false,
    sourcemap: true,
    target: 'es2022',
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'snippetPlugin',
      fileName: (format) => (format !== 'es' ? `index.${format}.js` : 'index.esm.js'),
      formats: ['es', 'umd', 'cjs'],
      cssFileName: 'style.css',
    },

    rollupOptions: {
      external: [
        '@graphiql/react',
        ...Object.keys(packageJSON.peerDependencies || {}),
        ...deps,
      ],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@graphiql/react': 'GraphiQLReact',
          graphiql: 'GraphiQL',
        },
      },
    }
  },
});
