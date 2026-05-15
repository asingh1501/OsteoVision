import type { LucideIcon } from 'lucide-react';

export function ElderlyActionButton({ icon: Icon, label, onClick }: { icon: LucideIcon; label: string; onClick?: () => void }) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="focus-ring flex min-h-20 w-full items-center gap-3 rounded-2xl border border-violet bg-lavender p-4 text-left text-lg font-black text-navy transition hover:bg-white"
    >
      <span className="rounded-xl bg-violet p-3 text-white">
        <Icon className="h-6 w-6" />
      </span>
      <span className="text-safe">{label}</span>
    </button>
  );
}
