import type { LucideIcon } from 'lucide-react';

export function PageHero({ icon: Icon, title, explanation, actions }: { icon: LucideIcon; title: string; explanation: string; actions: string[] }) {
  return (
    <section className="card p-6 md:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-start">
        <div className="shrink-0 rounded-xl bg-lavender p-4 text-violet">
          <Icon className="h-9 w-9" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-violet">Current page</p>
          <h1 className="text-safe mt-1 text-4xl font-black text-navy">{title}</h1>
          <p className="text-safe mt-3 max-w-4xl text-xl leading-9 text-slate-700">{explanation}</p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {actions.map((action) => (
              <div key={action} className="rounded-xl bg-lavender p-4 text-lg font-black text-navy">
                {action}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
