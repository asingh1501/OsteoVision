import type { ReactNode } from 'react';

export function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="card p-6">
      <h3 className="mb-4 text-2xl font-black text-navy">{title}</h3>
      {children}
    </div>
  );
}
