import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'כנס מדעי "ביאליסטוק כמודל" — 2010',
  description: 'כנס מדעי "ביאליסטוק כמודל" שנערך בנובמבר 2010 — כנס שבחן את ביאליסטוק כמודל לחיי קהילה יהודית.',
  alternates: { canonical: '/events/scientific-conference-2010' },
};

export default function ScientificConferencePage() {
  return (
    <>
      <PageHeader
        title='כנס מדעי "ביאליסטוק כמודל"'
        subtitle="נובמבר 2010"
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <p className="text-body-lg text-neutral-700 leading-relaxed">
            בנובמבר 2010 נערך כנס מדעי בנושא &quot;ביאליסטוק כמודל&quot; — כנס שבחן את
            ביאליסטוק כמודל לחיים יהודיים בקהילה, תרבות ומורשת.
          </p>
          <p className="mt-4 text-body-lg text-neutral-700 leading-relaxed">
            הכנס כלל הרצאות מחקריות, עדויות והצגת ממצאים היסטוריים על חיי הקהילה
            היהודית בביאליסטוק לפני השואה ובמהלכה.
          </p>
        </div>
      </section>
    </>
  );
}
