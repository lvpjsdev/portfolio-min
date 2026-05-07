import { defineConfig } from '@terrazzo/cli';
import pluginCSS from '@terrazzo/plugin-css';

export default defineConfig({
  tokens: [
    './tokens/primitives.tokens.json',
    './tokens/semantic.tokens.json',
    './tokens/design-md.tokens.json',
    './tokens/light/tokens.json',
    './tokens/dark/tokens.json',
  ],
  outDir: './src/styles/',
  plugins: [
    pluginCSS({
      filename: 'tokens.css',
      baseSelector: ':root',
    }),
  ],
});