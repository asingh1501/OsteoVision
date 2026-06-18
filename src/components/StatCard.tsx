import type { LucideIcon } from 'lucide-react';

export function StatCard({ title, value, caption, icon: Icon }: { title: string; value: string; caption: string; icon: LucideIcon; accent?: string }) {
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-safe text-base font-black text-slate-600">{title}</p>
          <h3 className="text-safe mt-2 text-3xl font-black text-navy">{value}</h3>
          <p className="text-safe mt-2 text-base leading-7 text-slate-700">{caption}</p>
        </div>
        <div className="shrink-0 rounded-xl border border-violet bg-lavender p-4 text-violet">
          <Icon className="h-6 w-6" strokeWidth={2.2} />
        </div>
      </div>
    </div>
  );
}
