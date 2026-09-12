// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // 部署到 GitHub Pages 的项目站点：https://spiltvictory.github.io/devlog/
  site: 'https://spiltvictory.github.io',
  base: '/devlog',
  trailingSlash: 'ignore',
});
