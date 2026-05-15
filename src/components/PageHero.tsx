import type { LucideIcon } from 'lucide-react';

export function PageHero({ icon: Icon, title, explanation, actions }: { icon: LucideIcon; title: string; explanation: string; actions: string[] }) {
  return (
    <section className="card p-6 md:p-7">
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <div className="shrink-0 rounded-2xl bg-lavender p-4 text-violet">
          <Icon className="h-9 w-9" />
        </div>
        <div className="min-w-0">
          <h1 className="text-safe text-3xl font-black text-navy">{title}</h1>
          <p className="text-safe mt-2 text-lg leading-8 text-slate-700">{explanation}</p>
          <div className="mt-4 grid gap-2 md:grid-cols-3">
            {actions.map((action) => (
              <div key={action} className="rounded-xl bg-lavender p-3 text-base font-bold text-navy">
                {action}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
