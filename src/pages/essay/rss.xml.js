import rss from '@astrojs/rss';
import { getPublished } from '../../lib/content';
import { site } from '../../../site.config.mjs';

export async function GET(context) {
  const essays = await getPublished('essay', {
    includeDraft: false,
    orderBy: (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  });
  const archiveEssays = essays.filter((entry) => entry.data.archive !== false);

  return rss({
    title: `${site.title} · 随笔`,
    description: '随笔与杂记更新',
    site: context.site,
    items: archiveEssays.map((entry) => ({
      title: entry.data.title,
      pubDate: entry.data.date,
      description: entry.data.description,
      link: `/essay/${entry.data.slug ?? entry.id}/`
    }))
  });
}
