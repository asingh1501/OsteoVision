import { Activity, BarChart3, BookOpen, CalendarCheck, ClipboardList, Dna, FileText, HeartPulse, History, LayoutDashboard, MapPin, Stethoscope } from 'lucide-react';
import type { NavItem, PageId } from '../types';

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'testing', label: 'Comprehensive Testing', icon: ClipboardList },
  { id: 'score', label: 'OA Chance Score', icon: Activity },
  { id: 'history', label: 'Test History', icon: History },
  { id: 'plan', label: 'Treatment Plan', icon: CalendarCheck },
  { id: 'effectiveness', label: 'Treatment Effectiveness', icon: BarChart3 },
  { id: 'drugs', label: 'Drug Genetic Testing', icon: Dna },
  { id: 'doctors', label: 'Find Doctors', icon: MapPin },
  { id: 'education', label: 'Educational Resources', icon: BookOpen },
  { id: 'membership', label: 'Membership Plans', icon: HeartPulse },
  { id: 'clinician', label: 'Clinician Summary', icon: FileText },
];

export function Sidebar({ activePage, onNavigate }: { activePage: PageId; onNavigate: (page: PageId) => void }) {
  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-white/70 bg-white/80 px-4 py-6 backdrop-blur-xl lg:block">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="rounded-2xl bg-gradient-to-br from-cyan via-violet to-magenta p-3 text-white">
          <Stethoscope className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl font-black text-navy">OsteoVision</h1>
          <p className="text-xs font-semibold text-slate-500">Clinical decision support</p>
        </div>
      </div>
      <nav className="space-y-1">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-bold transition ${
              activePage === id ? 'bg-gradient-to-r from-violet to-magenta text-white shadow-lg shadow-fuchsia-500/20' : 'text-slate-600 hover:bg-lavender hover:text-navy'
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
