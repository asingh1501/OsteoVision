import { Activity, BarChart3, BookOpen, CalendarCheck, ClipboardList, Dna, FileText, HeartPulse, History, LayoutDashboard, LogOut, MapPin, Stethoscope, UserRound } from 'lucide-react';
import type { NavItem, PageId } from '../types';

const baseNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'testing', label: 'Comprehensive Testing', icon: ClipboardList },
  { id: 'history', label: 'Test History', icon: History },
  { id: 'plan', label: 'Treatment Plan', icon: CalendarCheck },
  { id: 'effectiveness', label: 'Treatment Effectiveness', icon: BarChart3 },
  { id: 'drugs', label: 'Drug Genetic Testing', icon: Dna },
  { id: 'doctors', label: 'Find Doctors', icon: MapPin },
  { id: 'education', label: 'Educational Resources', icon: BookOpen },
  { id: 'membership', label: 'Membership Plans', icon: HeartPulse },
  { id: 'clinician', label: 'Clinician Summary', icon: FileText },
];

export function Sidebar({ activePage, onNavigate, showScore, userName, onSignOut }: { activePage: PageId; onNavigate: (page: PageId) => void; showScore: boolean; userName: string; onSignOut: () => void }) {
  const navItems = showScore
    ? [
        baseNavItems[0],
        baseNavItems[1],
        { id: 'score' as PageId, label: 'OA Chance Score', icon: Activity },
        ...baseNavItems.slice(2),
      ]
    : baseNavItems;

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-6 lg:flex">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="rounded-xl bg-violet p-3 text-white">
          <Stethoscope className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl font-black text-navy">OsteoVision</h1>
          <p className="text-xs font-semibold text-slate-500">Clinical decision support</p>
        </div>
      </div>
      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto pb-4">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            aria-label={`Open ${label}`}
            onClick={() => onNavigate(id)}
            className={`focus-ring flex w-full items-center gap-3 rounded-2xl px-3 py-3.5 text-left text-base font-bold transition ${
              activePage === id ? 'bg-lavender text-violet ring-1 ring-violet' : 'text-slate-600 hover:bg-lavender hover:text-navy'
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </button>
        ))}
      </nav>
      <div className="mt-auto border-t border-slate-200 pt-4">
        <div className="mb-2 flex items-center gap-3 rounded-2xl px-3 py-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lavender text-violet">
            <UserRound className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Account</p>
            <p className="truncate text-sm font-black text-navy">{userName}</p>
          </div>
        </div>
        <button
          onClick={onSignOut}
          className="focus-ring flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-bold text-slate-600 transition hover:bg-rose-50 hover:text-rose-700"
        >
          <LogOut className="h-5 w-5" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
