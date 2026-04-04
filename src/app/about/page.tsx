import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import SectionHeader from '@/components/SectionHeader';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'אודות',
  description: 'אודות ארגון יוצאי ביאליסטוק והסביבה בישראל — מטרות העמותה, מבנה ארגוני והיסטוריה.',
  alternates: { canonical: '/about' },
};

const goals = [
  {
    title: 'הנצחה',
    description: 'הנצחת זכר 200,000 בני הקהילה היהודית בעיר ביאליסטוק שבפולין וסביבותיה, שנרצחו בשואה.',
  },
  {
    title: 'מורשת',
    description: 'הנחלת מורשתה המפוארת של הקהילה לדורות הבאים.',
  },
  {
    title: 'קשר',
    description: 'שמירת קשר עם יוצאי ביאליסטוק והסביבה לדורותיהם, בארץ ובעולם.',
  },
];

const boardMembers = [
  { role: 'יו"ר', name: 'רון לונדון' },
  { role: 'ועדת כספים', name: 'זאב בלגלי וטובה לוין' },
  { role: 'רואה חשבון', name: 'שלמה ריעני' },
  { role: 'ועדת ביקורת', name: 'מרים מגל וזאב לינדנפלד' },
  { role: 'חברי ועד', name: 'אמיר בלגלי ויוספה טויטו' },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader title="אודות העמותה" subtitle="ארגון יוצאי ביאליסטוק והסביבה בישראל" />

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mx-auto prose prose-lg text-neutral-700">
            <p className="text-body-lg leading-relaxed">
              הארגון הינו עמותה שמטרתה להנציח את 200 אלף בני קהילת יהודי העיר ביאליסטוק
              (שבפולין) וסביבותיה, אשר נספו בשואה, להנחיל את מורשתה המפוארת של הקהילה
              לדורות הבאים ולשמור על קשר עם יוצאי העיר לדורותיהם בארץ ובחו&quot;ל.
            </p>
            <p className="text-body-lg leading-relaxed mt-4">
              לזכר הקהילה ועבור קומץ ניצוליה נבנתה סמוך לקום המדינה (בשנת 1950)
              שכונה בת כ-250 בתים פרטיים בשם &quot;קריית ביאליסטוק&quot;
              (כיום חלק מהעיר יהוד-מונוסון) ובמרכזה מספר מבני ציבור, ביניהם
              &quot;היכל ביאליסטוק&quot; (בית העם), בית כנסת, אנדרטה, גני ילדים, מרפאה,
              בי&quot;ס תיכון ועוד.
            </p>
            <p className="text-body-lg leading-relaxed mt-4">
              השכונה נבנתה מכספי תורמים יהודים יוצאי ביאליסטוק והסביבה מכול רחבי תבל,
              והיא יוצגה מאז הקמתה ע&quot;י ועד מקומי שהפך ב-1983 לעמותה.
            </p>
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="py-16 md:py-24 bg-neutral-100">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader title="מטרות העמותה" />
          <div className="text-center mb-6">
            <Link
              href="/about/goals"
              className="text-primary-700 font-semibold hover:text-primary-900 transition-colors"
            >
              לעמוד מטרות העמותה המלא &larr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {goals.map((goal, i) => (
              <FadeIn key={goal.title} delay={i * 150}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-4">
                    <span className="text-display-lg text-primary-700 font-bold">{goal.title[0]}</span>
                  </div>
                  <h3 className="text-heading-sm font-semibold text-primary-900">{goal.title}</h3>
                  <p className="mt-2 text-body-md text-neutral-500">{goal.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Board */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader title="מבנה ארגוני" subtitle="ועד העמותה" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {boardMembers.map((member, i) => (
              <FadeIn key={member.name} delay={i * 100}>
                <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm text-center">
                  <p className="text-body-sm text-neutral-500 mb-1">{member.role}</p>
                  <p className="text-heading-sm font-semibold text-primary-900">{member.name}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <p className="mt-8 text-center text-body-md text-neutral-500">
            כ-280 נמענים בקרית ביאליסטוק ובכול הארץ.
          </p>
          <div className="mt-4 text-center">
            <Link
              href="/about/structure"
              className="text-primary-700 font-semibold hover:text-primary-900 transition-colors"
            >
              לעמוד המבנה הארגוני המלא &larr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
