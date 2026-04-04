export default function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-display-lg text-primary-900 font-bold">{title}</h2>
      {subtitle && <p className="mt-3 text-body-lg text-neutral-500">{subtitle}</p>}
      <div className="mt-4 mx-auto w-16 h-[3px] bg-accent-500" />
    </div>
  );
}
