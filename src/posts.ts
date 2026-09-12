import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** 取全部文章：生产构建时过滤草稿，本地预览时保留 */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog');
  return posts
    .filter((post) => (import.meta.env.PROD ? !post.data.draft : true))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** 统计所有标签及其文章数，按数量从多到少排序 */
export function collectTags(posts: Post[]): { tag: string; count: number }[] {
  const counter = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      counter.set(tag, (counter.get(tag) ?? 0) + 1);
    }
  }
  return [...counter.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, 'zh-CN'));
}
