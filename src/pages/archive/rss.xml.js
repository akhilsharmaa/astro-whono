import rss from '@astrojs/rss';
import { getPublished } from '../../lib/content';
import { site } from '../../../site.config.mjs';

export async function GET(context) {
  const posts = await getPublished('posts', {
    includeDraft: false,
    orderBy: (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  });
  const essays = await getPublished('essay', {
    includeDraft: false,
    orderBy: (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  });

  const merged = [
    ...posts
      .filter((post) => post.data.archive !== false)
      .map((entry) => ({ type: 'posts', entry })),
    ...essays
      .filter((entry) => entry.data.archive !== false)
      .map((entry) => ({ type: 'essay', entry }))
  ].sort((a, b) => b.entry.data.date.valueOf() - a.entry.data.date.valueOf());

  return rss({
    title: `${site.title} · 归档`,
    description: '归档更新',
    site: context.site,
    items: merged.map(({ type, entry }) => {
      const slug = entry.data.slug ?? entry.id;
      return {
        title: entry.data.title,
        pubDate: entry.data.date,
        description: entry.data.description,
        link: type === 'posts' ? `/archive/${slug}/` : `/essay/${slug}/`
      };
    })
  });
}
