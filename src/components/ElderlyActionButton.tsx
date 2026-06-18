import type { LucideIcon } from 'lucide-react';

export function ElderlyActionButton({ icon: Icon, label, onClick }: { icon: LucideIcon; label: string; onClick?: () => void }) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="focus-ring flex min-h-24 w-full items-center gap-4 rounded-xl border border-violet bg-lavender p-5 text-left text-xl font-black text-navy transition hover:bg-white"
    >
      <span className="rounded-xl bg-violet p-3 text-white">
        <Icon className="h-7 w-7" />
      </span>
      <span className="text-safe">{label}</span>
    </button>
  );
}
