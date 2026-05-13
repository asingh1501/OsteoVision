import { CheckCircle2 } from 'lucide-react';
import type { TreatmentItem } from '../types';
import { Button } from './Button';
import { RiskBadge } from './RiskBadge';

export function TreatmentCard({ item, onComplete }: { item: TreatmentItem; onComplete: (id: number) => void }) {
  return (
    <div className="card p-5">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold text-navy">{item.title}</h3>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold capitalize text-slate-700">{item.category}</span>
            <RiskBadge status={item.complete ? 'improved' : item.adherence === 'Needs attention' ? 'worsened' : 'stable'} />
          </div>
          <p className="text-sm leading-6 text-slate-600">{item.description}</p>
          <p className="mt-3 text-sm font-semibold text-slate-500">Due {item.dueDate} · {item.frequency} · {item.adherence}</p>
        </div>
        <Button variant={item.complete ? 'secondary' : 'primary'} onClick={() => onComplete(item.id)}>
          <CheckCircle2 className="h-4 w-4" />
          {item.complete ? 'Completed' : 'Mark Complete'}
        </Button>
      </div>
    </div>
  );
}
