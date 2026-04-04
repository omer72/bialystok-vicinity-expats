import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'טכס אזכרה ה-81',
  description: 'טכס האזכרה השנתי ה-81 לזכר קהילת ביאליסטוק — 29 באוגוסט 2024, יהוד-מונוסון.',
  alternates: { canonical: '/events/memorial-81st' },
};

export default function Memorial81stPage() {
  return (
    <>
      <PageHeader
        title="טכס אזכרה ה-81"
        subtitle="29 באוגוסט 2024 — יהוד-מונוסון"
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <p className="text-body-lg text-neutral-700 leading-relaxed">
            טכס האזכרה השנתי ה-81 לזכר קהילת ביאליסטוק שנספתה בשואה נערך ב-29
            באוגוסט 2024 בהיכל ביאליסטוק ביהוד-מונוסון.
          </p>
          <p className="mt-4 text-body-lg text-neutral-700 leading-relaxed">
            הטכס כלל נאום יו&quot;ר הארגון, מצגת שהוצגה בטכס, וקטעי וידאו מהטכס.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-100">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <FadeIn>
            <div className="relative aspect-[3/4] max-w-sm mx-auto rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/5eeb4e_aefbb0d59c644c4798969f7c48d204cd_mv2.jpg"
                alt="הזמנה לטכס אזכרה ה-81"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 384px"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
