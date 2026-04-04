import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'המוזאון היהודי בביאליסטוק',
  description: 'המוזאון היהודי בביאליסטוק — מידע על המוזאון ואוספיו.',
};

export default function MuseumPage() {
  return (
    <>
      <PageHeader title="המוזאון היהודי בביאליסטוק" subtitle="מוזאון לתולדות יהודי ביאליסטוק" />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <p className="text-body-lg text-neutral-700">
            המוזאון היהודי בביאליסטוק משמר ומציג את ההיסטוריה העשירה של הקהילה היהודית בעיר.
          </p>
        </div>
      </section>
    </>
  );
}
