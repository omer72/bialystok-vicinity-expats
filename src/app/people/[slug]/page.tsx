import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import PageHeader from '@/components/PageHeader';
import { people } from '@/lib/people';

export function generateStaticParams() {
  return people.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const person = people.find((p) => p.slug === slug);
  if (!person) return {};
  return { title: person.name, description: person.description };
}

const NAV_ITEMS = [
  'צור קשר',
  'אתרים קשורים',
  'הכנסת ספר תורה 10.2016',
  'הכנסת ספר תורה',
  'בית',
  'מידע נוסף',
  'וויקיפדיה',
  'רב',
];

function parseMarkdownContent(raw: string): string[] {
  let lines = raw.split('\n');

  // Strip frontmatter (between --- markers)
  if (lines[0]?.trim() === '---') {
    const endIndex = lines.indexOf('---', 1);
    if (endIndex !== -1) {
      lines = lines.slice(endIndex + 1);
    }
  }

  // Filter out unwanted lines
  const filtered = lines.filter((line) => {
    const trimmed = line.trim();
    if (!trimmed) return false;
    // Strip H1 lines
    if (trimmed.startsWith('# ')) return false;
    // Strip blockquotes (navigation headers)
    if (trimmed.startsWith('> ')) return false;
    // Strip wixstatic URLs
    if (trimmed.includes('wixstatic.com')) return false;
    if (trimmed.startsWith('- http')) return false;
    // Strip "## Images" section header
    if (trimmed === '## Images') return false;
    // Strip navigation items
    if (NAV_ITEMS.includes(trimmed)) return false;
    // Strip copyright lines
    if (trimmed.startsWith('©')) return false;
    // Strip lines that are just references like [1] [2]
    if (/^\[\d+\]$/.test(trimmed)) return false;
    return true;
  });

  // Join consecutive non-empty lines into paragraphs
  const paragraphs: string[] = [];
  let current = '';

  for (const line of filtered) {
    const trimmed = line.trim();
    // If line is a heading, push current paragraph and the heading
    if (trimmed.startsWith('## ') || trimmed.startsWith('### ')) {
      if (current) {
        paragraphs.push(current.trim());
        current = '';
      }
      paragraphs.push(trimmed);
    } else {
      current += ' ' + trimmed;
    }
  }
  if (current.trim()) {
    paragraphs.push(current.trim());
  }

  return paragraphs;
}

function loadPersonContent(contentSlug: string): string[] | null {
  try {
    const contentDir = path.join(process.cwd(), '..', 'content', 'pages');
    const filePath = path.join(contentDir, `${contentSlug}.md`);
    const raw = fs.readFileSync(filePath, 'utf-8');
    return parseMarkdownContent(raw);
  } catch {
    return null;
  }
}

export default async function PersonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = people.find((p) => p.slug === slug);
  if (!person) notFound();

  const paragraphs = person.contentSlug ? loadPersonContent(person.contentSlug) : null;

  return (
    <>
      <PageHeader title={person.name} subtitle={person.nameEn} />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          {/* Portrait image */}
          {person.image && (
            <div className="mb-8 flex justify-center">
              <div className="relative overflow-hidden rounded-xl shadow-md">
                <Image
                  src={person.image}
                  alt={person.name}
                  width={300}
                  height={400}
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Biographical content */}
          {paragraphs && paragraphs.length > 0 ? (
            <div className="space-y-4" dir="rtl">
              {paragraphs.map((paragraph, i) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={i} className="text-heading-md font-bold text-primary-900 mt-8 mb-2">
                      {paragraph.replace(/^##\s+/, '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={i} className="text-heading-sm font-semibold text-primary-800 mt-6 mb-2">
                      {paragraph.replace(/^###\s+/, '')}
                    </h3>
                  );
                }
                return (
                  <p key={i} className="text-body-lg text-neutral-700 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          ) : (
            <p className="text-body-lg text-neutral-700 leading-relaxed" dir="rtl">
              {person.description}
            </p>
          )}

          <div className="mt-8">
            <Link
              href="/people"
              className="text-primary-700 font-semibold hover:text-primary-900 transition-colors"
            >
              &rarr; חזרה לכל האישים
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
