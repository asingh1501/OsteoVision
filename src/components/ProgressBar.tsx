export function ProgressBar({ value, label }: { value: number; label?: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm font-semibold text-navy">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-violet" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
