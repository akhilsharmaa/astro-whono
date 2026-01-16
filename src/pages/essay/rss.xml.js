import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const essays = (await getCollection('essay', ({ data }) => data.draft !== true))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Whono · 随笔',
    description: '随笔与杂记更新',
    site: context.site,
    items: essays.map((e) => ({
      title: e.data.title,
      pubDate: e.data.date,
      description: e.data.description,
      link: `/essay/${e.id}/`
    }))
  });
}
