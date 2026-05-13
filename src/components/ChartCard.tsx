import type { ReactNode } from 'react';

export function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="card p-5">
      <h3 className="mb-4 text-lg font-bold text-navy">{title}</h3>
      {children}
    </div>
  );
}
