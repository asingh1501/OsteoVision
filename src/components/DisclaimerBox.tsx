import { ShieldAlert } from 'lucide-react';

export function DisclaimerBox({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-slate-50 text-navy ${compact ? 'p-3 text-xs' : 'p-4 text-sm'}`}>
      <div className="flex gap-3">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-violet" />
        <p>
          <strong>Medical safety:</strong> OsteoVision is a decision-support platform and does not diagnose, treat, or replace professional medical care. Always consult a licensed healthcare provider.
        </p>
      </div>
    </div>
  );
}
