import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 flex-1 flex items-center justify-center">
      <div className="mx-auto max-w-lg px-4 text-center">
        <p className="text-display-xl font-extrabold text-primary-900">404</p>
        <h1 className="mt-4 text-heading-lg font-bold text-neutral-900">
          הדף לא נמצא
        </h1>
        <p className="mt-4 text-body-lg text-neutral-500">
          מצטערים, לא הצלחנו למצוא את הדף שחיפשתם.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 bg-primary-900 text-white font-semibold py-3 px-8 rounded-lg hover:bg-primary-700 transition-colors"
        >
          חזרה לדף הבית
        </Link>
      </div>
    </section>
  );
}
