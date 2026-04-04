import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'וידיאו',
  description: 'סרטוני וידיאו הקשורים לקהילת ביאליסטוק והעמותה.',
  alternates: { canonical: '/videos' },
};

export default function VideosPage() {
  return (
    <>
      <PageHeader title="וידיאו" subtitle="סרטונים הקשורים לקהילת ביאליסטוק" />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <p className="text-body-lg text-neutral-700">
            אוסף סרטוני וידיאו הכוללים עדויות, טכסים ותיעוד היסטורי של קהילת ביאליסטוק.
          </p>
        </div>
      </section>
    </>
  );
}
