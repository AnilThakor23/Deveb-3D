import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  base: '/Deveb-3D/',
  plugins: [glsl()],
});
