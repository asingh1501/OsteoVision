import { HelpCircle } from 'lucide-react';

export function AccessibilityNotice({ children }: { children: string }) {
  return (
    <div className="rounded-2xl border border-violet bg-lavender p-4 text-base font-semibold leading-7 text-navy">
      <div className="flex gap-3">
        <HelpCircle className="mt-1 h-6 w-6 shrink-0 text-violet" />
        <p className="text-safe">{children}</p>
      </div>
    </div>
  );
}
