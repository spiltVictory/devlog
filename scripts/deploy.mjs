#!/usr/bin/env node
/**
 * 本地发布脚本：把构建结果推送到 gh-pages 分支，由 GitHub Pages 直接托管。
 * 用途：当 GitHub Actions 不可用（例如账号计费被锁）时，用它一样能上线。
 *
 *   npm run deploy
 */
import { execSync } from 'node:child_process';
import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const run = (command, options = {}) => execSync(command, { stdio: 'inherit', ...options });

console.log('▶ 1/3 构建站点…');
run('npx astro build');

console.log('▶ 2/3 准备发布目录…');
const stage = join(tmpdir(), 'devlog-deploy');
rmSync(stage, { recursive: true, force: true });
mkdirSync(stage, { recursive: true });
cpSync('dist', stage, { recursive: true });
// 关掉 GitHub Pages 的 Jekyll 处理，否则 _astro/ 目录会被忽略
writeFileSync(join(stage, '.nojekyll'), '');

console.log('▶ 3/3 推送到 gh-pages 分支…');
const remote = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
run('git init -b gh-pages', { cwd: stage });
run('git add -A', { cwd: stage });
run(
  'git -c user.name="spiltVictory" -c user.email="1075305747@qq.com" commit -m "deploy: 更新站点" --allow-empty',
  { cwd: stage },
);
run(`git push --force "${remote}" gh-pages`, { cwd: stage });

console.log('✅ 完成，稍等 1 分钟左右线上就会更新：https://spiltvictory.github.io/devlog/');
