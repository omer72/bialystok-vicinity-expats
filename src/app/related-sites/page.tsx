import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'אתרים קשורים',
  description: 'אתרים קשורים לקהילת ביאליסטוק ולנושאי שואה והנצחה.',
  alternates: { canonical: '/related-sites' },
};

const sites = [
  { name: 'יד ושם', url: 'https://www.yadvashem.org/', description: 'רשות הזיכרון לשואה ולגבורה' },
  { name: 'מוזאון העם היהודי — אנו', url: 'https://www.anumuseum.org.il/', description: 'מוזאון העם היהודי בתל אביב' },
  { name: 'המכון לחקר השואה', url: 'https://www.shem-olam.co.il/', description: 'מחקר ותיעוד השואה' },
];

export default function RelatedSitesPage() {
  return (
    <>
      <PageHeader title="אתרים קשורים" />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="space-y-4">
            {sites.map((site) => (
              <a
                key={site.url}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-xl border border-neutral-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <h3 className="text-heading-sm font-semibold text-primary-900">{site.name}</h3>
                <p className="mt-1 text-body-sm text-neutral-500">{site.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
