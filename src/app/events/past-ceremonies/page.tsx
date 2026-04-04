import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'טכסי אזכרה קודמים',
  description: 'ארכיון טכסי אזכרה קודמים — טכסי האזכרה ה-60 עד ה-72 של ארגון יוצאי ביאליסטוק.',
  alternates: { canonical: '/events/past-ceremonies' },
};

export default function PastCeremoniesPage() {
  return (
    <>
      <PageHeader
        title="טכסי אזכרה קודמים"
        subtitle="ארכיון טכסים ה-60 עד ה-72"
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <p className="text-body-lg text-neutral-700 leading-relaxed">
            ארכיון טכסי האזכרה ה-60 עד ה-72 של ארגון יוצאי ביאליסטוק והסביבה
            בישראל.
          </p>
        </div>
      </section>
    </>
  );
}
