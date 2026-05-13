import type { Biomarker } from '../types';
import { RiskBadge } from './RiskBadge';

export function BiomarkerCard({ marker }: { marker: Biomarker }) {
  return (
    <div className="card p-5 transition hover:-translate-y-0.5 hover:shadow-xl">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-safe font-bold text-navy">{marker.name}</h3>
          <p className="text-safe mt-1 text-2xl font-bold text-ink">
            {marker.value} <span className="text-sm font-semibold text-slate-500">{marker.unit}</span>
          </p>
        </div>
        <RiskBadge status={marker.status} />
      </div>
      <p className="text-safe mt-3 text-sm font-semibold text-slate-500">Ideal: {marker.idealRange}</p>
      <p className="text-safe mt-3 text-sm leading-6 text-slate-600">{marker.explanation}</p>
    </div>
  );
}
