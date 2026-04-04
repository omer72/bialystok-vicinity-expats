export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="pt-28 pb-12 md:pt-32 md:pb-16 bg-primary-900 text-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
        <h1 className="text-display-lg md:text-display-xl font-extrabold">{title}</h1>
        {subtitle && <p className="mt-4 text-body-lg text-white/80 max-w-2xl mx-auto">{subtitle}</p>}
        <div className="mt-6 mx-auto w-16 h-[3px] bg-accent-500" />
      </div>
    </section>
  );
}
