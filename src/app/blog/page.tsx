import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import FadeIn from '@/components/FadeIn';
import { blogPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'סיפורי ניצולים',
  description: 'סיפורי ניצולי שואה מקהילת ביאליסטוק — עדויות, זכרונות ותעודות.',
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  return (
    <>
      <PageHeader title="סיפורי ניצולים" subtitle="עדויות אישיות מקהילת ביאליסטוק" />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <FadeIn key={post.slug} delay={(i % 3) * 100}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <article className="bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all h-full flex flex-col overflow-hidden">
                  {post.image && (
                    <div className="relative w-full h-56 overflow-hidden bg-neutral-100">
                      <Image
                        src={`/images/${post.image}`}
                        alt={post.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-label text-neutral-400 mb-2">{post.date}</p>
                    <h3 className="text-heading-sm font-semibold text-primary-900 group-hover:text-primary-700 transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-body-sm text-neutral-500 line-clamp-2 flex-1">{post.excerpt}</p>
                    <span className="mt-4 inline-block text-body-sm text-accent-500 font-medium">
                      קראו עוד &larr;
                    </span>
                  </div>
                </article>
              </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
