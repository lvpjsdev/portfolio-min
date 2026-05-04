import { defineConfig } from '@terrazzo/cli';
import pluginCSS from '@terrazzo/plugin-css';

export default defineConfig({
  tokens: ['./tokens/**/*.json'],
  outDir: './src/styles/',
  plugins: [
    pluginCSS({
      filename: 'tokens.css',
      modeSelectors: [
        { mode: 'light', selectors: [':root', "[data-theme='light']"] },
        { mode: 'dark', selectors: ["[data-theme='dark']", '@media (prefers-color-scheme: dark)'] },
      ],
    }),
  ],
});