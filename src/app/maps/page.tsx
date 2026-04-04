import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'מפות ביאליסטוק והגטו',
  description: 'מפות היסטוריות של העיר ביאליסטוק והגטו.',
};

export default function MapsPage() {
  return (
    <>
      <PageHeader title="מפות ביאליסטוק והגטו" subtitle="מפות היסטוריות של העיר ביאליסטוק" />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <p className="text-body-lg text-neutral-700">
            מפות היסטוריות של העיר ביאליסטוק שבפולין, כולל תרשימים של הגטו
            ומיקומי מוסדות הקהילה היהודית.
          </p>
        </div>
      </section>
    </>
  );
}
