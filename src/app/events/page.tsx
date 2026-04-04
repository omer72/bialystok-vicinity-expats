import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'אירועים',
  description: 'אירועי ארגון יוצאי ביאליסטוק — טכסי אזכרה, כנסים ופעילויות קהילתיות.',
};

const events = [
  {
    title: 'טכס אזכרה ה-82',
    date: '21.8.2025',
    location: 'יהוד-מונוסון',
    description: 'טכס האזכרה השנתי ה-82 לזכר קהילת ביאליסטוק שנספתה בשואה.',
  },
  {
    title: 'טכס אזכרה ה-81',
    date: '29.8.2024',
    location: 'יהוד-מונוסון',
    description: 'טכס האזכרה השנתי ה-81 שנערך בהיכל ביאליסטוק.',
  },
  {
    title: 'טכס אזכרה ה-80',
    date: '24.8.2023',
    location: 'יהוד-מונוסון',
    description: 'טכס האזכרה השנתי ה-80.',
  },
  {
    title: 'טכס אזכרה ה-80 — ביאליסטוק, פולין',
    date: '16.8.2023',
    location: 'ביאליסטוק, פולין',
    description: 'טכס אזכרה שנערך בעיר ביאליסטוק שבפולין.',
  },
  {
    title: 'טכס אזכרה ה-79',
    date: '18.8.2022',
    location: 'יהוד-מונוסון',
    description: 'טכס האזכרה השנתי ה-79.',
  },
  {
    title: 'הכנסת ספר תורה',
    date: '10.2016',
    location: 'קריית ביאליסטוק',
    description: 'טכס הכנסת ספר תורה לבית הכנסת בקריית ביאליסטוק.',
  },
  {
    title: 'כנס מדעי "ביאליסטוק כמודל"',
    date: '11.2010',
    location: 'יהוד-מונוסון',
    description: 'כנס מדעי שבחן את ביאליסטוק כמודל לחיי קהילה יהודית.',
  },
];

export default function EventsPage() {
  return (
    <>
      <PageHeader title="אירועים" subtitle="טכסי אזכרה, כנסים ופעילויות קהילתיות" />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <article
                key={event.title}
                className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-accent-500 text-white text-label font-bold px-2.5 py-1 rounded">
                      {event.date}
                    </span>
                    <span className="text-body-sm text-neutral-500">{event.location}</span>
                  </div>
                  <h3 className="text-heading-sm font-semibold text-primary-900">{event.title}</h3>
                  <p className="mt-2 text-body-sm text-neutral-500 line-clamp-2">{event.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
