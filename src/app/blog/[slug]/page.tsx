import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import path from 'path';
import fs from 'fs';
import PageHeader from '@/components/PageHeader';
import ImageGallery from '@/components/ImageGallery';
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

function extractFrontmatterField(raw: string, field: string): string | undefined {
  if (!raw.startsWith('---')) return undefined;
  const endIndex = raw.indexOf('---', 3);
  if (endIndex === -1) return undefined;
  const fmBlock = raw.slice(3, endIndex);
  for (const line of fmBlock.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    if (key === field) {
      let value = line.slice(colonIdx + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      return value || undefined;
    }
  }
  return undefined;
}

function extractFrontmatterImages(raw: string): string[] {
  if (!raw.startsWith('---')) return [];
  const endIndex = raw.indexOf('---', 3);
  if (endIndex === -1) return [];
  const fmBlock = raw.slice(3, endIndex);
  const lines = fmBlock.split('\n');
  const images: string[] = [];
  let inImages = false;
  for (const line of lines) {
    if (line.match(/^images\s*:/)) {
      inImages = true;
      continue;
    }
    if (inImages) {
      const match = line.match(/^\s+-\s+"?'?([^"']+)"?'?\s*$/);
      if (match) {
        images.push(match[1]);
      } else {
        inImages = false;
      }
    }
  }
  return images;
}

function loadPostContent(slug: string): { paragraphs: string[] | null; images: string[]; imageDisplayMode: string } {
  const filePath = path.join(contentDir, `${slug}.md`);
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return {
      paragraphs: parseMarkdown(raw),
      images: extractFrontmatterImages(raw),
      imageDisplayMode: extractFrontmatterField(raw, 'image_display_mode') || 'grid',
    };
  } catch {
    return { paragraphs: null, images: [], imageDisplayMode: 'grid' };
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

  const { paragraphs, images: contentImages, imageDisplayMode } = loadPostContent(slug);
  const hasContent = paragraphs && paragraphs.length > 0;

  // Resolve images: prefer frontmatter images array, fall back to blog.ts image
  const resolvedImages = contentImages.length > 0
    ? contentImages
    : (post.image ? [`/images/${post.image}`] : []);
  const resolvedDisplayMode = imageDisplayMode as 'grid' | 'carousel';

  return (
    <>
      <PageHeader title={post.title} />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          {/* Images */}
          {resolvedImages.length > 0 && (
            <div className="mb-8">
              <ImageGallery
                images={resolvedImages}
                displayMode={resolvedDisplayMode}
                alt={post.title}
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
