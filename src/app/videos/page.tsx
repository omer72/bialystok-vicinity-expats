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
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-heading-lg text-primary-900 font-bold">סרטון הקהילה — ביאליסטוק</h2>
            <p className="mt-2 text-body-lg text-neutral-700">
              סרטון המציג את סיפור קהילת ביאליסטוק, מורשתה והנצחתה.
            </p>
          </div>
          <div className="mx-auto max-w-4xl">
            <video
              controls
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster="/videos/reel-thumbnail.png"
              className="w-full rounded-xl shadow-lg"
              aria-label="סרטון קהילת ביאליסטוק — עדויות, טכסים ותיעוד היסטורי"
            >
              <source src="/videos/bialystok-reel.mp4" type="video/mp4" />
              הדפדפן שלך אינו תומך בתגית וידאו.
            </video>
          </div>
          <div className="mt-12 text-center">
            <p className="text-body-lg text-neutral-700">
              אוסף סרטוני וידיאו הכוללים עדויות, טכסים ותיעוד היסטורי של קהילת ביאליסטוק.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
