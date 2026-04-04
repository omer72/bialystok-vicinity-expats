import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
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

export default async function PersonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = people.find((p) => p.slug === slug);
  if (!person) notFound();

  return (
    <>
      <PageHeader title={person.name} subtitle={person.nameEn} />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <p className="text-body-lg text-neutral-700 leading-relaxed">{person.description}</p>
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
