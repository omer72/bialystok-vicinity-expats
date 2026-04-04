import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import SectionHeader from '@/components/SectionHeader';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'מטרות העמותה',
  description: 'מטרות ארגון יוצאי ביאליסטוק והסביבה בישראל — הנצחה, מורשת וקשר.',
  alternates: { canonical: '/about/goals' },
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

const images = [
  { src: '/images/5eeb4e_2cb81878bc62400387888c08b93c9986_mv2.jpg', alt: 'היכל ביאליסטוק' },
  { src: '/images/5eeb4e_337790ed70f844a8a0080b54f9bc8f43_mv2.jpg', alt: 'מבנה ציבור בקריית ביאליסטוק' },
  { src: '/images/5eeb4e_89c348aa73b548f998f37e084a39af2d_mv2.jpg', alt: 'חצר היכל ביאליסטוק' },
  { src: '/images/5eeb4e_a46ee4cec46d49c69b49899653eb54a3_mv2.jpg', alt: 'קריית ביאליסטוק' },
  { src: '/images/5eeb4e_b3ad9c4ff6d84957840251ad03418738_mv2.jpg', alt: 'חזית היכל ביאליסטוק' },
  { src: '/images/5eeb4e_becb68d8a24648d5829b2179ac4d43c5_mv2.jpg', alt: 'אנדרטה בקריית ביאליסטוק' },
];

export default function GoalsPage() {
  return (
    <>
      <PageHeader title="מטרות העמותה" subtitle="ארגון יוצאי ביאליסטוק והסביבה בישראל" />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      <section className="py-16 md:py-24 bg-neutral-100">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader title="היכל ביאליסטוק והחצר סביבו" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {images.map((img, i) => (
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
        </div>
      </section>
    </>
  );
}
