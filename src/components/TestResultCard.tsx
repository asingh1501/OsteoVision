import type { TestHistoryItem } from '../types';
import { RiskBadge } from './RiskBadge';

export function TestResultCard({ item, selected, onSelect }: { item: TestHistoryItem; selected?: boolean; onSelect?: () => void }) {
  return (
    <button onClick={onSelect} className={`card w-full p-4 text-left transition hover:border-slate-300 ${selected ? 'ring-2 ring-violet' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-violet">{item.date}</p>
          <h3 className="mt-1 text-xl font-bold text-navy">{item.score}%</h3>
          <p className="text-sm text-slate-500">{item.stage}</p>
        </div>
        <RiskBadge status={item.score < 40 ? 'improved' : 'moderate'} />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {item.changedMarkers.map((marker) => (
          <span key={marker} className="rounded-full bg-lavender px-2.5 py-1 text-xs font-semibold text-violet">{marker}</span>
        ))}
      </div>
    </button>
  );
}
