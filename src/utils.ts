/** 用 UTC 格式化日期，保证本地和 CI 构建结果一致 */
export function formatDate(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** 粗估阅读时长（按中文常见阅读速度 400 字/分钟） */
export function readingTime(body = ''): number {
  const chars = body.replace(/\s+/g, '').length;
  return Math.max(1, Math.round(chars / 400));
}

/** 按年份把文章分组，用于列表页 */
export function groupByYear<T extends { data: { pubDate: Date } }>(items: T[]) {
  const map = new Map<number, T[]>();
  for (const item of items) {
    const year = item.data.pubDate.getUTCFullYear();
    const list = map.get(year) ?? [];
    list.push(item);
    map.set(year, list);
  }
  return [...map.entries()].sort((a, b) => b[0] - a[0]);
}
