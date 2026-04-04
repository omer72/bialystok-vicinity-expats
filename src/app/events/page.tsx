import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'אירועים',
  description: 'אירועי ארגון יוצאי ביאליסטוק — טכסי אזכרה, כנסים ופעילויות קהילתיות.',
  alternates: { canonical: '/events' },
};

const events = [
  {
    title: 'טכס אזכרה ה-82',
    date: '21.8.2025',
    location: 'יהוד-מונוסון',
    description: 'טכס האזכרה השנתי ה-82 לזכר קהילת ביאליסטוק שנספתה בשואה.',
    href: '/events/memorial-82nd',
  },
  {
    title: 'טכס אזכרה ה-81',
    date: '29.8.2024',
    location: 'יהוד-מונוסון',
    description: 'טכס האזכרה השנתי ה-81 שנערך בהיכל ביאליסטוק.',
    href: '/events/memorial-81st',
  },
  {
    title: 'טכס אזכרה ה-80',
    date: '24.8.2023',
    location: 'יהוד-מונוסון',
    description: 'טכס האזכרה השנתי ה-80.',
    href: '/events/memorial-80th',
  },
  {
    title: 'טכס אזכרה ה-80 — ביאליסטוק, פולין',
    date: '5.2.2023',
    location: 'ביאליסטוק, פולין',
    description: 'עצרת הנצחה לציון 80 שנה לאקציה הראשונה בגטו ביאליסטוק.',
    href: '/events/memorial-80th-poland',
  },
  {
    title: 'טכס אזכרה ה-79',
    date: '18.8.2022',
    location: 'יהוד-מונוסון',
    description: 'טכס האזכרה השנתי ה-79.',
    href: '/events/memorial-79th',
  },
  {
    title: 'טכס יום השואה — 2014 ו-2017',
    date: '2014, 2017',
    location: 'יהוד-מונוסון',
    description: 'טכסי יום השואה של ארגון יוצאי ביאליסטוק.',
    href: '/events/memorial-74th',
  },
  {
    title: 'הכנסת ספר תורה',
    date: '10.2016',
    location: 'קריית ביאליסטוק',
    description: 'טכס הכנסת ספר תורה לבית הכנסת בקריית ביאליסטוק.',
    href: '/events/torah-scroll-2016',
  },
  {
    title: 'כנס מדעי "ביאליסטוק כמודל"',
    date: '11.2010',
    location: 'יהוד-מונוסון',
    description: 'כנס מדעי שבחן את ביאליסטוק כמודל לחיי קהילה יהודית.',
    href: '/events/scientific-conference-2010',
  },
  {
    title: 'טכסי אזכרה קודמים',
    date: '2003–2015',
    location: 'יהוד-מונוסון',
    description: 'ארכיון טכסי האזכרה ה-60 עד ה-72.',
    href: '/events/past-ceremonies',
  },
];

export default function EventsPage() {
  return (
    <>
      <PageHeader title="אירועים" subtitle="טכסי אזכרה, כנסים ופעילויות קהילתיות" />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, i) => (
              <FadeIn key={event.title} delay={(i % 3) * 100}>
              {(() => {
                const card = (
                  <article
                    className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all h-full"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-accent-700 text-white text-label font-bold px-2.5 py-1 rounded">
                          {event.date}
                        </span>
                        <span className="text-body-sm text-neutral-500">{event.location}</span>
                      </div>
                      <h3 className="text-heading-sm font-semibold text-primary-900">{event.title}</h3>
                      <p className="mt-2 text-body-sm text-neutral-500 line-clamp-2">{event.description}</p>
                      {'href' in event && event.href && (
                        <p className="mt-3 text-body-sm text-primary-700 font-semibold">
                          לפרטים &larr;
                        </p>
                      )}
                    </div>
                  </article>
                );
                return 'href' in event && event.href ? (
                  <Link href={event.href}>{card}</Link>
                ) : (
                  card
                );
              })()}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
