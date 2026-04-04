import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import SectionHeader from '@/components/SectionHeader';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'הכנסת ספר תורה — 2016',
  description: 'טכס הכנסת ספר תורה לבית הכנסת ע"ש שמואל מוהליבר בקריית ביאליסטוק, אוקטובר 2016.',
  alternates: { canonical: '/events/torah-scroll-2016' },
};

const images = [
  { src: '/images/5eeb4e_5655f2c129e9488a912735e44c1ad0af_mv2.jpg', alt: 'טכס הכנסת ספר תורה' },
  { src: '/images/5eeb4e_fa4c9de76c4c4d47aaa4613805f41181_mv2.jpg', alt: 'הכנסת ספר התורה לבית הכנסת' },
  { src: '/images/5eeb4e_89cba8b760874641a6bd73b52ada6271_mv2.jpg', alt: 'לוח התורמים להכנסת ספר התורה' },
];

export default function TorahScrollPage() {
  return (
    <>
      <PageHeader
        title="הכנסת ספר תורה"
        subtitle="אוקטובר 2016 — בית הכנסת ע&quot;ש שמואל מוהליבר"
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="prose prose-lg mx-auto text-center">
            <p className="text-body-lg text-neutral-700 leading-relaxed">
              באוקטובר 2016 נערך טכס הכנסת ספר תורה לבית הכנסת ע&quot;ש שמואל מוהליבר
              בקריית ביאליסטוק. הספר נכתב לעילוי נשמת יקיריהם של תורמי הקהילה.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-100">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader title="תמונות מהטכס" />

          <div className="mt-8 space-y-8">
            {/* Donor plaque — full width */}
            <FadeIn>
              <div className="relative aspect-[16/4] max-w-4xl mx-auto rounded-xl overflow-hidden shadow-md">
                <Image
                  src={images[2].src}
                  alt={images[2].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 896px"
                />
              </div>
              <p className="mt-3 text-center text-body-sm text-neutral-500">
                לוח התורמים להכנסת ספר התורה לבית הכנסת ע&quot;ש שמואל מוהליבר, לעילוי נשמת יקיריהם
              </p>
            </FadeIn>

            {/* Event photos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {images.slice(0, 2).map((img, i) => (
                <FadeIn key={img.src} delay={i * 150}>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover filter sepia-[0.3] group-hover:sepia-0 transition-[filter] duration-300"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <p className="text-body-sm text-white font-medium">{img.alt}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
