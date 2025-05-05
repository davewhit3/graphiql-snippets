import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import type { PluginOptions as ReactCompilerConfig } from 'babel-plugin-react-compiler';
import packageJSON from './package.json' with { type: 'json' };
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';

const IS_UMD = true;

export const reactCompilerConfig: Partial<ReactCompilerConfig> = {
  target: '18',
  sources(filename) {
    if (filename.includes('__tests__')) {
      return false;
    }
    return filename.includes('/graphiql-snippets/');
  },
};

export const plugins: PluginOption[] = [
  react({
    babel: {
      plugins: [['babel-plugin-react-compiler', reactCompilerConfig]],
    },
  }),
  svgr({
    include: "**/*.svg",
  }),
  dts({
    include: ['src/**', 'custom.d.ts'],
    exclude: ['**/*.spec.{ts,tsx}', '**/__tests__/'],
  })
];

export default defineConfig({
  plugins,
  css: {
    transformer: 'lightningcss',
  },
  build: {
    minify: false,
    sourcemap: true,
    lib: {
      entry: 'src/index.tsx',
      fileName(_format, entryName) {
        const filePath = entryName.replace(/\.svg$/, '');
        return `${filePath}.js`;
      },
      formats: ['es'],
      cssFileName: 'style',
    },
    rollupOptions: {
      external: [
        'react/jsx-runtime',
        // Exclude peer dependencies and dependencies from bundle
        ...Object.keys(packageJSON.peerDependencies),
        ...Object.keys(packageJSON.dependencies),
      ],
      output: {
        preserveModules: true,
      },
    },
    commonjsOptions: {
      esmExternals: true,
      requireReturnsDefault: 'auto',
    },
  },
});