import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts', ({ data }) => data.draft !== true);
  const essays = await getCollection('essay', ({ data }) => data.draft !== true);

  const merged = [
    ...posts.map((entry) => ({ type: 'posts', entry })),
    ...essays.map((entry) => ({ type: 'essay', entry }))
  ].sort((a, b) => b.entry.data.date.valueOf() - a.entry.data.date.valueOf());

  return rss({
    title: 'Whono',
    description: 'Latest posts + essay',
    site: context.site,
    items: merged.map(({ type, entry }) => ({
      title: entry.data.title,
      pubDate: entry.data.date,
      description: entry.data.description,
      link: type === 'posts' ? `/posts/${entry.id}/` : `/essay/${entry.id}/`
    }))
  });
}
