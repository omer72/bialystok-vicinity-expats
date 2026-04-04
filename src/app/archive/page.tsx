import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'ספר זיכרון לביאליסטוק',
  description: 'ספר הזיכרון של קהילת ביאליסטוק — ארכיון דיגיטלי.',
  alternates: { canonical: '/archive' },
};

export default function ArchivePage() {
  return (
    <>
      <PageHeader title="ספר זיכרון לביאליסטוק" subtitle="ארכיון ביאליסטוק" />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <p className="text-body-lg text-neutral-700">
            ספר הזיכרון של קהילת ביאליסטוק מתעד את חיי הקהילה, מוסדותיה ואישיה
            לפני השואה ובמהלכה.
          </p>
        </div>
      </section>
    </>
  );
}
