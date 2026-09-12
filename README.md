# spiltVictory Devlog

一个用 Astro 写的游戏开发日志网站，部署在 GitHub Pages 上。

线上地址：https://spiltvictory.github.io/devlog/

## 写一篇新日志

1. 在 `src/content/blog/` 新建一个 Markdown 文件，文件名用 `devlog-002-简短标题.md` 这种格式
2. 开头的 frontmatter 需要这几项：

```markdown
---
title: 第 2 期开发日志 · 标题
description: 一句话摘要，会显示在列表页
pubDate: 2026-09-20
tags: ['开发日志', '进度']
# draft: true   # 加上这行就是草稿，不会被发布
---
```

3. 正文随便写，把图片放进 `public/` 后用 `![说明](/devlog/图片名.png)` 引用

现成的格式模板在 [`docs/写作模板.md`](docs/写作模板.md)。

## 本地预览

```sh
npm install          # 第一次才需要
npm run dev          # 打开 http://localhost:4321/devlog/
```

改文件会自动刷新。`draft: true` 的草稿在本地能看到，发布时会被自动跳过。

## 发布

写完直接提交推送就行，剩下的是自动的：

```sh
git add .
git commit -m "devlog: 第 2 期"
git push
```

推送到 `main` 分支后，GitHub Actions 会自动构建并发布，大约一两分钟后线上就能看到。

## 目录结构

```text
src/
├── content/blog/      # 所有文章（Markdown），你主要改这里
├── components/        # 文章卡片等小组件
├── layouts/           # 页面外围结构（页头、页脚）
├── pages/             # 路由：首页、列表、标签、关于、RSS
├── styles/global.css  # 全站样式
├── site.config.ts     # 站点标题、简介、链接
└── content.config.ts  # 文章的字段定义
```

## 想改外观

- 站点标题、副标题、简介、社交链接：`src/site.config.ts`
- 配色、字体、间距：`src/styles/global.css` 顶部的 CSS 变量（深色模式配色也在里面）
- 首页文案：`src/pages/index.astro`
- 关于页面：`src/pages/about.astro`
