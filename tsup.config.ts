import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // Generate declaration file
  splitting: false,
  sourcemap: true,
  clean: true,
});
