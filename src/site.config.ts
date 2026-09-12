// 站点全局配置：改这里就能改全站的标题、简介和链接
export const SITE = {
  title: 'spiltVictory Devlog',
  tagline: '游戏开发日志',
  description:
    '一个游戏开发者的开发日志：每周进度、踩过的坑、技术笔记和复盘。记录从想法到能玩的那一天。',
  author: 'Yang Zhao Ji',
  github: 'https://github.com/spiltVictory',
  repo: 'https://github.com/spiltVictory/devlog',
} as const;

// GitHub Pages 项目站点部署在子路径下，所有站内链接都要带上这个前缀
const rawBase = import.meta.env.BASE_URL ?? '/';

export function withBase(path = ''): string {
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
  return `${base}${path.replace(/^\/+/, '')}`;
}
