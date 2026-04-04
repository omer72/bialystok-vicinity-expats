import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'ספר זיכרון לביאליסטוק',
  description: 'ספר הזיכרון של קהילת ביאליסטוק — ארכיון דיגיטלי המתעד את חיי הקהילה לפני השואה ובמהלכה.',
  alternates: { canonical: '/memorial-book' },
};

export default function MemorialBookPage() {
  return (
    <>
      <PageHeader title="ספר זיכרון לביאליסטוק" subtitle="ארכיון זיכרון לקהילת ביאליסטוק" />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="prose prose-lg mx-auto text-center">
            <p className="text-body-lg text-neutral-700 leading-relaxed">
              ספר הזיכרון של קהילת ביאליסטוק מתעד את חיי הקהילה היהודית בעיר ביאליסטוק
              ובסביבותיה, את מוסדותיה, אישיה ותרבותה — לפני השואה ובמהלכה.
            </p>
            <p className="mt-6 text-body-lg text-neutral-700 leading-relaxed">
              הספר נכתב על ידי ניצולים ויוצאי הקהילה, ומשמש כעדות חיה על עולם שחרב
              ועל הזיכרון שנשמר לדורות הבאים.
            </p>
          </div>

          <div className="mt-12 text-center">
            <p className="text-body-md text-neutral-500 mb-4">אתר ספר הזיכרון לביאליסטוק:</p>
            <a
              href="https://www.jewishgen.org/Yizkor/bialystok/bialystok.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary-900 text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              לספר הזיכרון המלא
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
