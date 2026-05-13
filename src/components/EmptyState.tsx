import { Inbox } from 'lucide-react';

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="card flex flex-col items-center justify-center p-8 text-center text-slate-500">
      <Inbox className="mb-3 h-8 w-8 text-violet" />
      {message}
    </div>
  );
}
