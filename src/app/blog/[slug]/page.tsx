import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { blogPosts } from '@/lib/blog';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <PageHeader title={post.title} />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <p className="text-label text-neutral-400 mb-4">{post.date}</p>
          <p className="text-body-lg text-neutral-700 leading-relaxed">{post.excerpt}</p>

          <div className="mt-8">
            <Link
              href="/blog"
              className="text-primary-700 font-semibold hover:text-primary-900 transition-colors"
            >
              &rarr; חזרה לכל הסיפורים
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
