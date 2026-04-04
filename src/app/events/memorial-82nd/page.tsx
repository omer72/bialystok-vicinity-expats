import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'טכס אזכרה ה-82',
  description: 'טכס האזכרה השנתי ה-82 לזכר קהילת ביאליסטוק שנספתה בשואה — 21 באוגוסט 2025, יהוד-מונוסון.',
  alternates: { canonical: '/events/memorial-82nd' },
};

export default function Memorial82ndPage() {
  return (
    <>
      <PageHeader
        title="טכס אזכרה ה-82"
        subtitle="21 באוגוסט 2025 — יהוד-מונוסון"
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <p className="text-body-lg text-neutral-700 leading-relaxed">
            טכס האזכרה השנתי ה-82 לזכר קהילת ביאליסטוק שנספתה בשואה נערך ב-21
            באוגוסט 2025 בהיכל ביאליסטוק ביהוד-מונוסון.
          </p>
          <p className="mt-4 text-body-lg text-neutral-700 leading-relaxed">
            הטכס כלל נאום יו&quot;ר הארגון, הקרנת סרטון לזכר הנספים, וצילום הטכס.
          </p>
        </div>
      </section>
    </>
  );
}
