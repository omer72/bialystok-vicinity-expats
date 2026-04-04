import type { MetadataRoute } from 'next';
import { people } from '@/lib/people';
import { blogPosts } from '@/lib/blog';

const BASE_URL = 'https://www.bialystokvicinityexpatsisrael.org.il';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, changeFrequency: 'monthly' as const, priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/history`, changeFrequency: 'yearly' as const, priority: 0.8 },
    { url: `${BASE_URL}/events`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/people`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/blog`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'yearly' as const, priority: 0.6 },
    { url: `${BASE_URL}/membership`, changeFrequency: 'yearly' as const, priority: 0.7 },
    { url: `${BASE_URL}/maps`, changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${BASE_URL}/museum`, changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${BASE_URL}/archive`, changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${BASE_URL}/videos`, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${BASE_URL}/related-sites`, changeFrequency: 'yearly' as const, priority: 0.4 },
  ];

  const peoplePages = people.map((person) => ({
    url: `${BASE_URL}/people/${person.slug}`,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...peoplePages, ...blogPages].map((entry) => ({
    ...entry,
    lastModified: new Date(),
  }));
}
