import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import { people } from '@/lib/people';

export const metadata: Metadata = {
  title: 'אישים מביאליסטוק',
  description: 'אישים מפורסמים מקהילת ביאליסטוק — רבנים, מדענים, מנהיגים ולוחמים.',
};

export default function PeoplePage() {
  return (
    <>
      <PageHeader title="אישים מביאליסטוק" subtitle="דמויות בולטות מקהילת יהודי ביאליסטוק" />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {people.map((person) => (
              <Link key={person.slug} href={`/people/${person.slug}`} className="group">
                <article className="bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all h-full overflow-hidden flex flex-col">
                  <div className="relative w-full h-56 bg-neutral-100">
                    {person.image ? (
                      <Image
                        src={person.image}
                        alt={person.name}
                        width={400}
                        height={224}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary-100">
                        <span className="text-6xl text-primary-300">
                          {person.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-heading-sm font-semibold text-primary-900 group-hover:text-primary-700 transition-colors">
                      {person.name}
                    </h3>
                    <p className="text-body-sm text-neutral-400 mb-2">{person.nameEn}</p>
                    <p className="text-body-sm text-neutral-500 line-clamp-3 flex-1">{person.description}</p>
                    <span className="mt-3 inline-block text-body-sm text-accent-500 font-medium">
                      קראו עוד &larr;
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
