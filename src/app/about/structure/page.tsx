import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import SectionHeader from '@/components/SectionHeader';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'מבנה ארגוני',
  description: 'מבנה ארגוני של ארגון יוצאי ביאליסטוק והסביבה בישראל — ועד העמותה וחבריה.',
  alternates: { canonical: '/about/structure' },
};

const boardMembers = [
  { role: 'יו"ר', name: 'רון לונדון' },
  { role: 'ועדת כספים', name: 'זאב בלגלי וטובה לוין' },
  { role: 'רואה חשבון', name: 'שלמה ריעני' },
  { role: 'ועדת ביקורת', name: 'מרים מגל וזאב לינדנפלד' },
  { role: 'חברי ועד', name: 'אמיר בלגלי ויוספה טויטו' },
];

const images = [
  { src: '/images/5eeb4e_116c47988585408fa9abf6ae7afc5a2a_mv2.jpg', alt: 'טכס זיכרון ביד ושם' },
  { src: '/images/5eeb4e_46fdf08bc31f4b59a85b7c59d4e9893a_mv2.jpg', alt: 'טכס זיכרון בירושלים' },
  { src: '/images/5eeb4e_6e43dd749eb248eea50e1695f81723c1_mv2.jpg', alt: 'אנדרטה בביאליסטוק' },
  { src: '/images/5eeb4e_761fd883258c4eacbf2ae99d7d38765e_mv2.jpg', alt: 'טכס אזכרה' },
  { src: '/images/5eeb4e_c3597908cc39444c8e133d9bcf6a75f9_mv2.jpg', alt: 'טכס זיכרון' },
  { src: '/images/5eeb4e_d71d916e7f0a46aaa776ca0f7b4777e1_mv2.jpg', alt: 'טכס הנצחה' },
];

export default function StructurePage() {
  return (
    <>
      <PageHeader title="מבנה ארגוני" subtitle="ועד ארגון יוצאי ביאליסטוק והסביבה בישראל" />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader title="ועד העמותה" />
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
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-100">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader
            title="תמונות מטכסי זיכרון"
            subtitle='טכסי זיכרון ב"יד ושם" שבירושלים וכן באנדרטאות בעיר ביאליסטוק, פולין.'
          />
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
