import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import path from 'path';
import fs from 'fs';
import PageHeader from '@/components/PageHeader';
import { blogPosts } from '@/lib/blog';

/** Resolve the directory that holds scraped markdown files. */
const contentDir = path.resolve(process.cwd(), '..', 'content', 'blog-posts');

/**
 * Parse a scraped blog-post markdown file and return the cleaned body text.
 *
 * Steps:
 * 1. Strip YAML front-matter (everything between leading --- fences).
 * 2. Strip the leading H1 (duplicate of the title).
 * 3. Strip Wix navigation boilerplate lines.
 * 4. Strip the "## Images" section with wixstatic URLs.
 * 5. Strip footer boilerplate (recent posts list, comments, copyright).
 * 6. Return an array of non-empty paragraph strings.
 */
function parseMarkdown(raw: string): string[] {
  let body = raw;

  // 1. Strip YAML front-matter
  body = body.replace(/^---[\s\S]*?---\n*/m, '');

  // 2. Strip leading H1
  body = body.replace(/^# .+\n*/m, '');

  // 3. Strip the ## Images section and everything after it
  body = body.replace(/## Images[\s\S]*$/m, '');

  // 4. Strip navigation boilerplate lines
  const boilerplatePatterns = [
    /^צור קשר$/m,
    /^אתרים קשורים$/m,
    /^All Posts$/m,
    /^חיפוש$/m,
    /^Omer Etrog$/m,
    /^ron-london$/m,
    /^זמן קריאה \d+ דקות$/m,
    /^עודכן:$/m,
    /^\d+ ב\S+ \d{4}$/m,  // date lines like "5 בינו׳ 2023"
    /^פוסטים אחרונים$/m,
    /^הצג הכול$/m,
    /^תגובות$/m,
    /^כתיבת תגובה\.\.\.$/m,
    /^Post: Blog2_Post$/m,
    /^©\d{4} by .+$/m,
    /^הורידו את PDF.*$/m,
    /^יצחק ברוידה$/m,
    /^ילדי ביאליסטוק$/m,
    /^הסופר מרדכי דנין$/m,
    /^מספר כתבות על ביאליסטוק שפירסם.*$/m,
  ];

  for (const pattern of boilerplatePatterns) {
    body = body.replace(new RegExp(pattern.source, 'gm'), '');
  }

  // 5. Strip any remaining wixstatic URLs
  body = body.replace(/https?:\/\/static\.wixstatic\.com\S*/g, '');

  // 6. Strip markdown image syntax
  body = body.replace(/!\[.*?\]\(.*?\)/g, '');

  // 7. Split into paragraphs, trim, and filter empties
  const paragraphs = body
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return paragraphs;
}

function loadPostContent(slug: string): string[] | null {
  const filePath = path.join(contentDir, `${slug}.md`);
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return parseMarkdown(raw);
  } catch {
    return null;
  }
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt, alternates: { canonical: `/blog/${slug}` } };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const paragraphs = loadPostContent(slug);
  const hasContent = paragraphs && paragraphs.length > 0;

  return (
    <>
      <PageHeader title={post.title} />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          {/* Featured image */}
          {post.image && (
            <div className="mb-8 overflow-hidden rounded-xl">
              <Image
                src={`/images/${post.image}`}
                alt={post.title}
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Date & author */}
          <div className="mb-6 flex items-center gap-4 text-neutral-400">
            <p className="text-label">{post.date}</p>
          </div>

          {/* Excerpt */}
          <p className="text-body-lg text-neutral-700 leading-relaxed font-semibold mb-8">
            {post.excerpt}
          </p>

          {/* Full body content */}
          {hasContent ? (
            <div className="prose prose-lg max-w-none text-neutral-700 leading-relaxed space-y-4" dir="rtl">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          ) : (
            <p className="text-body text-neutral-400 italic">
              תוכן מלא יתווסף בקרוב.
            </p>
          )}

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-neutral-200">
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
