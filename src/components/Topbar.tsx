import { Bell, Search, ShieldCheck } from 'lucide-react';
import type { PageId } from '../types';

const titles: Record<PageId, string> = {
  dashboard: 'Proactive osteoarthritis care',
  testing: 'Comprehensive testing',
  score: 'OA Chance Score',
  history: 'Longitudinal test history',
  plan: 'Personalized treatment plan',
  effectiveness: 'Treatment effectiveness',
  drugs: 'Drug genetic testing',
  doctors: 'Find doctors',
  education: 'Educational resources',
  membership: 'Membership plans',
  clinician: 'Clinician summary',
};

export function Topbar({ activePage }: { activePage: PageId }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur-xl md:px-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan">OsteoVision</p>
          <h2 className="text-2xl font-black text-navy">{titles[activePage]}</h2>
          <p className="mt-1 text-sm text-slate-600">Proactive osteoarthritis care through connected diagnostics, trend monitoring, and personalized treatment support.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm md:flex">
            <Search className="h-4 w-4 text-slate-400" />
            <input className="w-56 bg-transparent text-sm outline-none" placeholder="Search records, tests, plans" />
          </div>
          <button className="rounded-2xl border border-slate-200 bg-white p-3 text-navy shadow-sm transition hover:bg-slate-50">
            <Bell className="h-5 w-5" />
          </button>
          <div className="hidden items-center gap-2 rounded-2xl bg-white px-3 py-2 text-sm font-bold text-navy shadow-sm md:flex">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            Decision-support only
          </div>
        </div>
      </div>
    </header>
  );
}
