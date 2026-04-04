import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';

const timelineEntries = [
  { year: '1949', text: 'הקמת חברת "קריית ביאליסטוק פאונדיישן" בניו יורק' },
  { year: '1950', text: 'חתימת חוזה עם חברת "רסקו" להקמת הקריה' },
  { year: '1955', text: 'הקמת בית העם — "היכל ביאליסטוק"' },
];

const blogPreviews = [
  { slug: 'yosef-makovsky', title: 'יוסף מקובסקי', excerpt: 'סיפור חייו של יוסף מקובסקי שניצל ע"י קפיצה מהרכבת לאושוויץ.' },
  { slug: 'eva-kartzovska', title: 'אווה קרצובסקה', excerpt: 'סיפורה של אווה קרצובסקה מביאליסטוק.' },
  { slug: 'children-of-bialystok', title: 'ילדי ביאליסטוק', excerpt: 'סיפורם של ילדי ביאליסטוק בתקופת השואה.' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[70vh] flex items-center bg-gradient-to-l from-primary-900/90 to-primary-900/60 mt-[72px]">
        <div className="absolute inset-0 bg-primary-900/70" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8 py-16 md:py-24">
          <div className="max-w-xl">
            <h1 className="text-display-xl text-white font-extrabold leading-tight">
              ארגון יוצאי ביאליסטוק והסביבה בישראל
            </h1>
            <p className="mt-6 text-body-lg text-white/80">
              עמותה שמטרתה להנציח את 200 אלף בני קהילת יהודי העיר ביאליסטוק שבפולין וסביבותיה,
              אשר נספו בשואה, להנחיל את מורשתה המפוארת של הקהילה לדורות הבאים.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-block bg-accent-500 text-white font-semibold py-3 px-7 rounded-lg hover:bg-accent-700 hover:-translate-y-0.5 hover:shadow-md transition-all"
              >
                קראו עוד
              </Link>
              <Link
                href="/membership"
                className="inline-block border-2 border-white text-white font-semibold py-3 px-7 rounded-lg hover:bg-white hover:text-primary-900 transition-all"
              >
                הצטרפו אלינו
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader title="מי אנחנו" />
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-body-lg text-neutral-700 leading-relaxed">
              ברוכים הבאים לאתר הבית של ארגון יוצאי ביאליסטוק והסביבה בישראל.
              הארגון הינו עמותה שמטרתה להנציח את קהילת יהודי העיר ביאליסטוק שבפולין וסביבותיה.
              לזכר הקהילה ועבור קומץ ניצוליה נבנתה סמוך לקום המדינה שכונה בת כ-250 בתים פרטיים
              בשם &quot;קריית ביאליסטוק&quot; (כיום חלק מהעיר יהוד-מונוסון).
            </p>
            <Link
              href="/about"
              className="inline-block mt-6 text-primary-700 font-semibold hover:text-primary-900 transition-colors"
            >
              קראו עוד על העמותה &larr;
            </Link>
          </div>
        </div>
      </section>

      {/* Survivor Stories Preview */}
      <section className="py-16 md:py-24 bg-neutral-100">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader title="סיפורי ניצולים" subtitle="עדויות מביאליסטוק ומהשואה" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPreviews.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                  <h3 className="text-heading-sm text-primary-900 font-semibold group-hover:text-primary-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-body-sm text-neutral-500 line-clamp-2">{post.excerpt}</p>
                  <span className="mt-4 inline-block text-body-sm text-accent-500 font-medium">
                    קראו עוד &larr;
                  </span>
                </article>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-block text-primary-700 font-semibold hover:text-primary-900 transition-colors"
            >
              כל סיפורי הניצולים &larr;
            </Link>
          </div>
        </div>
      </section>

      {/* History Timeline Preview */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader title="ציוני דרך" subtitle="מתולדות קריית ביאליסטוק" />
          <div className="max-w-2xl mx-auto space-y-6">
            {timelineEntries.map((entry) => (
              <div key={entry.year} className="flex gap-4 items-start">
                <span className="shrink-0 bg-primary-900 text-white text-body-sm font-bold px-3 py-1 rounded">
                  {entry.year}
                </span>
                <p className="text-body-md text-neutral-700 border-r-4 border-accent-500 pr-4">
                  {entry.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/history"
              className="inline-block text-primary-700 font-semibold hover:text-primary-900 transition-colors"
            >
              לצפייה בהיסטוריה המלאה &larr;
            </Link>
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="py-16 md:py-24 bg-accent-500">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-display-lg text-white font-bold">הצטרפו למשפחת ביאליסטוק</h2>
          <p className="mt-4 text-body-lg text-white/90 max-w-xl mx-auto">
            שמרו על הקשר עם הקהילה, השתתפו באירועים וסייעו בהנצחת המורשת.
          </p>
          <Link
            href="/membership"
            className="inline-block mt-8 bg-primary-900 text-white font-semibold py-3 px-8 rounded-lg hover:bg-primary-700 hover:-translate-y-0.5 hover:shadow-md transition-all"
          >
            הצטרפו עכשיו
          </Link>
        </div>
      </section>
    </>
  );
}
