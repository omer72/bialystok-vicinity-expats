import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import SectionHeader from '@/components/SectionHeader';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'היסטוריה',
  description: 'תולדות יהודי ביאליסטוק, קריית ביאליסטוק והעמותה — ציוני דרך מ-1949 ועד היום.',
  alternates: { canonical: '/history' },
};

const timelineEntries = [
  {
    year: '1949',
    text: 'הקמת חברת אמריקאית "קריית ביאליסטוק פאונדיישן אינק, ניו יורק". מטרת החברה הייתה: הקמת ישוב/קריה בישראל עבור עולים יוצאי ביאליסטוק והסביבה, עם כול המוסדות הקהילתיים הדרושים.',
  },
  {
    year: '1950',
    text: 'חתימת חוזה עם חברת "רסקו" להקמת הקריה על אדמות קרן קיימת לישראל, במימון יוצאי ביאליסטוק בגולה בניו יורק, מקסיקו, ארגנטינה, צרפת, דרום אפריקה ואוסטרליה.',
  },
  {
    year: '1951',
    text: 'הקמת חברה ישראלית "קריית ביאליסטוק פאונדיישן, ניו יורק (ישראל) בע"מ". החברה בנתה 208 בתים פרטיים בקריה וכן: בית כנסת, בית עם, גני ילדים, מעון לילדים, מרפאה, חורשה, מפעל אריגה, אנדרטה, ספרייה, בי"ס תיכון.',
  },
  {
    year: '1955',
    text: 'הקמת בית העם (כיום: "היכל ביאליסטוק") ע"י חברת רסקו במרכז הקריה, לצרכי אירועי תרבות, שמחות ופעילויות קהילתיות של תושבי הקריה.',
  },
  {
    year: '1962',
    text: 'רכישת מגרש של 3 דונם באזור תעשיה יהוד, על מחציתו הוקם מפעל אריגה.',
  },
  {
    year: '1969',
    text: 'מכירת מעון הילדים והמרפאה למועצה המקומית. המעון הפך לבית תזמורת יהוד והמרפאה לגן ילדים.',
  },
  {
    year: '1975',
    text: 'מכירת מפעל האריגה לתעשיינים פרטיים ביאליסטוקאים (זלמן ירושלמי ולוינסקי).',
  },
  {
    year: '1983',
    text: 'פירוק חברת "ביאליסטוק פאונדיישן" לאחר שהושגו כול מטרותיה. הוקמה קרן ארצית והועד המקומי נרשם כעמותה בשם "ארגון יוצאי ביאליסטוק והסביבה בישראל".',
  },
  {
    year: '1991',
    text: 'מסירת בית הכנסת לציבור המתפללים בו שהתארגנו כעמותה.',
  },
  {
    year: '1992',
    text: 'העברת נכסי המקרקעין של קרן ההנצחה לעמותה כולל: בית העם, האנדרטה, החורשה וגני הילדים, ושיפוץ בית העם. הוקם בו חדר הנצחה המשמש כמוזיאון וארכיון.',
  },
  {
    year: '1995',
    text: 'השכרת בית העם לעירייה עבור הפעלת מועדון קשישים בבקרים. מועדון הקשישים ממשיך בפעילותו עד היום במקביל לפעילויות הנצחה ומורשת.',
  },
];

const historyImages = [
  { src: '/images/5eeb4e_2cb81878bc62400387888c08b93c9986_mv2.jpg', alt: 'היכל ביאליסטוק' },
  { src: '/images/5eeb4e_337790ed70f844a8a0080b54f9bc8f43_mv2.jpg', alt: 'מבנה ציבור בקריית ביאליסטוק' },
  { src: '/images/5eeb4e_becb68d8a24648d5829b2179ac4d43c5_mv2.jpg', alt: 'אנדרטה בקריית ביאליסטוק' },
  { src: '/images/5eeb4e_ddd9aaffd09742588fb08232e5005182_mv2.jpg', alt: 'קריית ביאליסטוק' },
  { src: '/images/5eeb4e_e3519a403e354b48a6a77c5d6d9c4baf_mv2.jpg', alt: 'בית הכנסת בקריית ביאליסטוק' },
  { src: '/images/5eeb4e_b3ad9c4ff6d84957840251ad03418738_mv2.jpg', alt: 'חזית היכל ביאליסטוק' },
];

export default function HistoryPage() {
  return (
    <>
      <PageHeader title="היסטוריה" subtitle="ציוני דרך בתולדות קריית ביאליסטוק והעמותה" />

      {/* City History Intro */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-heading-lg font-bold text-primary-900 mb-6">
                תולדות יהודי ביאליסטוק
              </h2>
              <div className="space-y-4 text-body-lg text-neutral-700 leading-relaxed">
                <p>
                  קהילת יהודי ביאליסטוק הייתה מהקהילות הגדולות והחשובות באירופה. לפני מלחמת העולם
                  השנייה מנתה הקהילה כ-200,000 נפש והייתה מרכז תרבותי, כלכלי ורוחני בעל השפעה
                  רבה.
                </p>
                <p>
                  במהלך השואה הוקם גטו ביאליסטוק, ובאוגוסט 1943 פרצה בו מרידה — אחת ממרידות
                  הגטו הבודדות בתולדות השואה. רוב בני הקהילה נספו במחנות ההשמדה.
                </p>
                <p>
                  לזכר הקהילה ועבור קומץ ניצוליה נבנתה סמוך לקום המדינה (בשנת 1950) שכונה בת
                  כ-250 בתים פרטיים בשם &quot;קריית ביאליסטוק&quot; (כיום חלק מהעיר יהוד-מונוסון).
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/15df41_4b5ee5dc822543baa21e8181361358e5_mv2.jpg"
                alt="אנדרטת קריית ביאליסטוק"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-neutral-100">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader
            title="ציוני דרך"
            subtitle="קריית ביאליסטוק נבנתה ביהוד ע&quot;י יוצאי העיר ביאליסטוק שבפולין כמעשה של הנצחה ושמירת מורשת."
          />

          <div className="relative max-w-3xl mx-auto mt-12">
            {/* Timeline line */}
            <div className="absolute top-0 bottom-0 right-4 md:right-1/2 w-[2px] bg-neutral-300 md:-translate-x-[1px]" />

            <div className="space-y-8">
              {timelineEntries.map((entry, i) => (
                <FadeIn key={entry.year} delay={i * 100}>
                  <div
                    className={`relative flex gap-6 md:gap-0 ${
                      i % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Year badge */}
                    <div className="shrink-0 z-10">
                      <span className="inline-block bg-primary-900 text-white text-body-sm font-bold px-3 py-1.5 rounded">
                        {entry.year}
                      </span>
                    </div>

                    {/* Content */}
                    <div className={`flex-1 ${i % 2 === 0 ? 'md:text-left md:pl-8' : 'md:pr-8'}`}>
                      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm border-r-4 border-r-accent-500">
                        <p className="text-body-md text-neutral-700">{entry.text}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader title="גלריית תמונות" subtitle="תמונות היסטוריות מקריית ביאליסטוק" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {historyImages.map((img, i) => (
              <FadeIn key={img.src} delay={i * 100}>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
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

          <div className="mt-8 text-center">
            <Link
              href="/archive"
              className="inline-block text-primary-700 font-semibold hover:text-primary-900 transition-colors"
            >
              לגלריה המלאה &larr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
