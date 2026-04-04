import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'היסטוריה',
  description: 'תולדות יהודי ביאליסטוק, קריית ביאליסטוק והעמותה.',
};

const timelineEntries = [
  { year: '1949', text: 'הקמת חברת אמריקאית "קריית ביאליסטוק פאונדיישן אינק, ניו יורק". מטרת החברה הייתה: הקמת ישוב/קריה בישראל עבור עולים יוצאי ביאליסטוק והסביבה, עם כול המוסדות הקהילתיים הדרושים.' },
  { year: '1950', text: 'חתימת חוזה עם חברת "רסקו" להקמת הקריה על אדמות קרן קיימת לישראל, במימון יוצאי ביאליסטוק בגולה בניו יורק, מקסיקו, ארגנטינה, צרפת, דרום אפריקה ואוסטרליה.' },
  { year: '1951', text: 'הקמת חברה ישראלית "קריית ביאליסטוק פאונדיישן, ניו יורק (ישראל) בע"מ". החברה בנתה 208 בתים פרטיים בקריה וכן: בית כנסת, בית עם, גני ילדים, מעון לילדים, מרפאה, חורשה, מפעל אריגה, אנדרטה, ספרייה, בי"ס תיכון.' },
  { year: '1955', text: 'הקמת בית העם (כיום: "היכל ביאליסטוק") ע"י חברת רסקו במרכז הקריה, לצרכי אירועי תרבות, שמחות ופעילויות קהילתיות של תושבי הקריה.' },
  { year: '1962', text: 'רכישת מגרש של 3 דונם באזור תעשיה יהוד, על מחציתו הוקם מפעל אריגה.' },
  { year: '1969', text: 'מכירת מעון הילדים והמרפאה למועצה המקומית. המעון הפך לבית תזמורת יהוד והמרפאה לגן ילדים.' },
  { year: '1975', text: 'מכירת מפעל האריגה לתעשיינים פרטיים ביאליסטוקאים (זלמן ירושלמי ולוינסקי).' },
  { year: '1983', text: 'פירוק חברת "ביאליסטוק פאונדיישן" לאחר שהושגו כול מטרותיה. הוקמה קרן ארצית והועד המקומי נרשם כעמותה בשם "ארגון יוצאי ביאליסטוק והסביבה בישראל".' },
  { year: '1991', text: 'מסירת בית הכנסת לציבור המתפללים בו שהתארגנו כעמותה.' },
  { year: '1992', text: 'העברת נכסי המקרקעין של קרן ההנצחה לעמותה כולל: בית העם, האנדרטה, החורשה וגני הילדים, ושיפוץ בית העם.' },
  { year: '1995', text: 'השכרת בית העם לעירייה עבור הפעלת מועדון קשישים בבקרים. מועדון הקשישים ממשיך בפעילותו עד היום.' },
];

export default function HistoryPage() {
  return (
    <>
      <PageHeader title="היסטוריה" subtitle="ציוני דרך בתולדות קריית ביאליסטוק והעמותה" />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Intro */}
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-body-lg text-neutral-700 leading-relaxed text-center">
              קריית ביאליסטוק נבנתה ביהוד ע&quot;י יוצאי העיר ביאליסטוק שבפולין
              כמעשה של הנצחה ושמירת מורשת.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute top-0 bottom-0 right-4 md:right-1/2 w-[2px] bg-neutral-200 md:-translate-x-[1px]" />

            <div className="space-y-8">
              {timelineEntries.map((entry, i) => (
                <div
                  key={entry.year}
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
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
