export function ProgressBar({ value, label }: { value: number; label?: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm font-semibold text-navy">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-lavender">
        <div className="h-full rounded-full bg-gradient-to-r from-cyan via-violet to-magenta" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
