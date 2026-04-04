import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import SectionHeader from '@/components/SectionHeader';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'טכס אזכרה ה-80 — ביאליסטוק, פולין',
  description: 'עצרת הנצחה בביאליסטוק, פולין — 5 בפברואר 2023, לציון 80 שנה לאקציה הראשונה בגטו ביאליסטוק.',
  alternates: { canonical: '/events/memorial-80th-poland' },
};

const images = [
  { src: '/images/5eeb4e_c06c667457664aa1996ecb5541a008a0_mv2.jpg', alt: 'עצרת ההנצחה בביאליסטוק' },
  { src: '/images/5eeb4e_f9d9488b19bf4660a8f03052494cc4f4_mv2.jpg', alt: 'מצעד הלפידים' },
  { src: '/images/5eeb4e_0270440c2f13496883338b93d6db1f79_mv2.jpg', alt: 'טכס ליד המצבה למורדי הגטו' },
  { src: '/images/5eeb4e_1d64bb55dc9440f680f3b8ba0d499938_mv2.jpg', alt: 'הנחת לפידים ליד האנדרטה' },
  { src: '/images/5eeb4e_216caae1dee04e0c91c7fa707ab4151d_mv2.jpg', alt: 'נאומים ליד המצבה' },
  { src: '/images/5eeb4e_356095e8b0de4ba8b37f8db7ebafca2a_mv2.jpg', alt: 'המצעד ברחובות ביאליסטוק' },
];

export default function Memorial80thPolandPage() {
  return (
    <>
      <PageHeader
        title="טכס אזכרה ה-80 — ביאליסטוק, פולין"
        subtitle="5 בפברואר 2023"
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <p className="text-body-lg text-neutral-700 leading-relaxed">
            ב-5.2.2023, כמו בכל שנה, התקיימה עצרת בביאליסטוק (פולין) להנצחת
            קורבנות האקציה הראשונה בגטו ביאליסטוק שנערכה בין 5 ל-12 בפברואר 1943.
          </p>
          <p className="mt-4 text-body-lg text-neutral-700 leading-relaxed">
            בשעה 16:00 התקיימה פגישה במרכז התרבות ע&quot;ש לודוויק זאמנהוף,
            שהוקדשה לספרו של פרופ&apos; אדם דוברונסקי &quot;יהודי ביאליסטוק,
            תמונות זיכרון&quot;. בשעה 17:30 יצא מצעד של 80 לפידים — כמספר השנים
            שעברו מאז פרוץ המרד וחיסול הגטו — ממקום שער הכניסה לגטו עד המצבה
            למורדי גטו ביאליסטוק.
          </p>
          <p className="mt-4 text-body-lg text-neutral-700 leading-relaxed">
            בשעה 19:00 שחקני תאטרון BaWiMo וקבוצת Lachlom הקריאו קטעים מיומנו של
            דוד שפירא שנכתב ונמצא בגטו. כמו כן התקיים קונצרט דואט של שני נגנים
            שמוצאם באוקראינה.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-100">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader title="תמונות מהעצרת" />

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {images.map((img, i) => (
              <FadeIn key={img.src} delay={i * 100}>
                <div className="relative aspect-[3/2] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover filter sepia-[0.3] group-hover:sepia-0 transition-[filter] duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-body-sm text-white font-medium">{img.alt}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
