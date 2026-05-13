import type { Status } from '../types';

const statusStyles: Record<string, string> = {
  optimal: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  improved: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  moderate: 'bg-amber-50 text-amber-700 ring-amber-200',
  stable: 'bg-cyan-50 text-violet-700 ring-violet-200',
  low: 'bg-sky-50 text-sky-700 ring-sky-200',
  worsened: 'bg-rose-50 text-rose-700 ring-rose-200',
  'high risk': 'bg-rose-50 text-rose-700 ring-rose-200',
  high: 'bg-rose-50 text-rose-700 ring-rose-200',
};

export function RiskBadge({ status }: { status: Status | 'high' | 'moderate' | 'low' | string }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold capitalize ring-1 ${statusStyles[status] ?? statusStyles.stable}`}>
      {status}
    </span>
  );
}
