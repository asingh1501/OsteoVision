import type { LucideIcon } from 'lucide-react';

export function StatCard({ title, value, caption, icon: Icon }: { title: string; value: string; caption: string; icon: LucideIcon; accent?: string }) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-navy">{value}</h3>
          <p className="mt-2 text-sm text-slate-500">{caption}</p>
        </div>
        <div className="rounded-xl border border-violet/15 bg-lavender p-3 text-violet">
          <Icon className="h-5 w-5" strokeWidth={2.2} />
        </div>
      </div>
    </div>
  );
}
