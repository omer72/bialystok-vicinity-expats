import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import SectionHeader from '@/components/SectionHeader';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'שיקום בית הקברות היהודי בביאליסטוק',
  description: 'פרויקט שיקום בית הקברות היהודי בגנובקה, ביאליסטוק — איתור מצבות ושיקום האתר.',
  alternates: { canonical: '/cemetery-restoration' },
};

const resources = [
  {
    title: 'פרויקט שיקום בית הקברות',
    description: 'פרויקט שיקום בית הקברות היהודי בגנובקה, ביאליסטוק — שיקום אתר הקבורה ההיסטורי של הקהילה היהודית בעיר.',
  },
  {
    title: 'איתור מצבות',
    description: 'מאמצים לאיתור ושחזור מצבות ורישומי קבורה מבית הקברות היהודי בביאליסטוק.',
  },
  {
    title: 'מרכז גנאולוגיה יהודית — JRI',
    description: 'מרכז המחקר הגנאולוגי היהודי (JRI) מספק גישה לרשומות קבורה ומידע משפחתי.',
  },
];

export default function CemeteryRestorationPage() {
  return (
    <>
      <PageHeader
        title="בית הקברות היהודי בביאליסטוק"
        subtitle="שיקום בית הקברות בגנובקה"
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mx-auto prose prose-lg text-neutral-700 text-center">
            <p className="text-body-lg leading-relaxed">
              בית הקברות היהודי בגנובקה, ביאליסטוק, הוא אחד מאתרי המורשת החשובים של הקהילה
              היהודית בעיר. הפרויקט לשיקום בית הקברות נועד לשמר את זכרם של בני הקהילה
              ולאפשר לדורות הבאים להתחבר לשורשיהם.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-100">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader title="משאבים ופרויקטים" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {resources.map((resource, i) => (
              <FadeIn key={resource.title} delay={i * 150}>
                <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm h-full">
                  <h3 className="text-heading-sm font-semibold text-primary-900 mb-3">
                    {resource.title}
                  </h3>
                  <p className="text-body-md text-neutral-500">{resource.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
