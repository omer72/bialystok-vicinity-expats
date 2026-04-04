import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'טכס אזכרה ה-80',
  description: 'טכס האזכרה השנתי ה-80 לזכר קהילת ביאליסטוק — 24 באוגוסט 2023, יהוד-מונוסון.',
  alternates: { canonical: '/events/memorial-80th' },
};

export default function Memorial80thPage() {
  return (
    <>
      <PageHeader
        title="טכס אזכרה ה-80"
        subtitle="24 באוגוסט 2023 — יהוד-מונוסון"
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <p className="text-body-lg text-neutral-700 leading-relaxed">
            טכס האזכרה השנתי ה-80 לזכר קהילת ביאליסטוק שנספתה בשואה נערך ב-24
            באוגוסט 2023 בהיכל ביאליסטוק ביהוד-מונוסון.
          </p>
        </div>
      </section>
    </>
  );
}
