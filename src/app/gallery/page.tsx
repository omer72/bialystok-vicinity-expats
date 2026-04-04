import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'גלריה',
  description: 'גלריית תמונות — ארגון יוצאי ביאליסטוק והסביבה בישראל.',
  alternates: { canonical: '/gallery' },
};

const galleryImages = [
  { src: '/images/5eeb4e_2cb81878bc62400387888c08b93c9986_mv2.jpg', alt: 'היכל ביאליסטוק' },
  { src: '/images/5eeb4e_337790ed70f844a8a0080b54f9bc8f43_mv2.jpg', alt: 'מבנה ציבור בקריית ביאליסטוק' },
  { src: '/images/5eeb4e_becb68d8a24648d5829b2179ac4d43c5_mv2.jpg', alt: 'אנדרטה בקריית ביאליסטוק' },
  { src: '/images/5eeb4e_ddd9aaffd09742588fb08232e5005182_mv2.jpg', alt: 'קריית ביאליסטוק' },
  { src: '/images/5eeb4e_e3519a403e354b48a6a77c5d6d9c4baf_mv2.jpg', alt: 'בית הכנסת בקריית ביאליסטוק' },
  { src: '/images/5eeb4e_b3ad9c4ff6d84957840251ad03418738_mv2.jpg', alt: 'חזית היכל ביאליסטוק' },
  { src: '/images/5eeb4e_89c348aa73b548f998f37e084a39af2d_mv2.jpg', alt: 'חצר היכל ביאליסטוק' },
  { src: '/images/5eeb4e_a46ee4cec46d49c69b49899653eb54a3_mv2.jpg', alt: 'מבנה בקריית ביאליסטוק' },
  { src: '/images/5eeb4e_d1b224f4bca2479386e5a4c98743f133_mv2.jpg', alt: 'תמונה היסטורית' },
  { src: '/images/5eeb4e_116c47988585408fa9abf6ae7afc5a2a_mv2.jpg', alt: 'טכס זיכרון' },
  { src: '/images/5eeb4e_46fdf08bc31f4b59a85b7c59d4e9893a_mv2.jpg', alt: 'טכס אזכרה' },
  { src: '/images/5eeb4e_6e43dd749eb248eea50e1695f81723c1_mv2.jpg', alt: 'אנדרטה בביאליסטוק' },
  { src: '/images/5eeb4e_761fd883258c4eacbf2ae99d7d38765e_mv2.jpg', alt: 'טכס הנצחה' },
  { src: '/images/5eeb4e_c3597908cc39444c8e133d9bcf6a75f9_mv2.jpg', alt: 'טכס זיכרון' },
  { src: '/images/5eeb4e_d71d916e7f0a46aaa776ca0f7b4777e1_mv2.jpg', alt: 'טכס אזכרה' },
  { src: '/images/5eeb4e_eff91c8fa35f43fd9d1cc15011f0b8ee_mv2.jpg', alt: 'טכס הנצחה' },
  { src: '/images/5eeb4e_5655f2c129e9488a912735e44c1ad0af_mv2.jpg', alt: 'הכנסת ספר תורה' },
  { src: '/images/5eeb4e_fa4c9de76c4c4d47aaa4613805f41181_mv2.jpg', alt: 'בית הכנסת' },
  { src: '/images/15df41_4b5ee5dc822543baa21e8181361358e5_mv2.jpg', alt: 'אנדרטת קריית ביאליסטוק' },
  { src: '/images/15df41_0689549524af4b19956a98c2080e7aef_mv2.jpg', alt: 'קריית ביאליסטוק' },
  { src: '/images/15df41_18f5d357da814603b18191b64d46f29c_mv2.jpg', alt: 'מבנים בקריית ביאליסטוק' },
  { src: '/images/15df41_2ded3f58810c403e9cf7b6d618b5e5fc_mv2.jpg', alt: 'תמונה היסטורית' },
  { src: '/images/15df41_56001ced5788494caa51c5bb22bfc7d1_mv2.jpg', alt: 'קריית ביאליסטוק' },
  { src: '/images/15df41_9843338861dc4eeb8c4917edb8f62b5d_mv2.jpg', alt: 'תמונה היסטורית' },
];

export default function GalleryPage() {
  return (
    <>
      <PageHeader title="גלריה" subtitle="תמונות מקריית ביאליסטוק, טכסים ואירועים" />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <FadeIn key={img.src} delay={(i % 4) * 80}>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover filter sepia-[0.3] group-hover:sepia-0 transition-[filter] duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
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
