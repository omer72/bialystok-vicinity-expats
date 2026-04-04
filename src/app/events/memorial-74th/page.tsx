import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'טכס יום השואה — 2014 ו-2017',
  description: 'טכסי יום השואה של ארגון יוצאי ביאליסטוק — 2014 ו-2017, כולל מצגות וסרטונים.',
  alternates: { canonical: '/events/memorial-74th' },
};

export default function Memorial74thPage() {
  return (
    <>
      <PageHeader
        title="טכס יום השואה — 2014 ו-2017"
        subtitle="טכסי הנצחה שנתיים"
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <p className="text-body-lg text-neutral-700 leading-relaxed">
            טכסי יום השואה של ארגון יוצאי ביאליסטוק והסביבה בישראל, כולל מצגת
            שהוצגה בטכס 2017 וסרטון מטכס 2014.
          </p>
        </div>
      </section>
    </>
  );
}
