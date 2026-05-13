import { Activity, CalendarClock, FileUp, FlaskConical, Footprints, ListChecks, NotepadText, TrendingUp, UserRoundPlus } from 'lucide-react';
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';
import { patientProfile, testHistory } from '../data/mockData';
import { Button } from '../components/Button';
import { ChartCard } from '../components/ChartCard';
import { DisclaimerBox } from '../components/DisclaimerBox';
import { StatCard } from '../components/StatCard';
import type { PageId } from '../types';

export function Dashboard({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  const quickActions = [
    ['Upload Medical Records', FileUp, 'testing'],
    ['Enter New Symptoms', NotepadText, 'history'],
    ['View Treatment Plan', ListChecks, 'plan'],
    ['Compare Test Results', TrendingUp, 'history'],
    ['Generate Clinician Summary', UserRoundPlus, 'clinician'],
  ] as const;

  return (
    <div className="space-y-6">
      <div className="gradient-panel rounded-3xl p-6 shadow-soft md:p-8">
        <h1 className="text-3xl font-black">Welcome back to OsteoVision</h1>
        <p className="mt-2 max-w-3xl text-white/85">Tracking {patientProfile.primaryJoint} risk factors, symptoms, diagnostics, treatment adherence, and clinician-ready insights for {patientProfile.name}.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Current OA Chance Score" value="37%" caption="Moderate risk, down 5 points since January" icon={Activity} />
        <StatCard title="Disease Stage" value="Baseline Vigilance" caption="Focused on prevention and trend awareness" icon={FlaskConical} accent="from-violet to-magenta" />
        <StatCard title="Next Reminder" value="May 18" caption={patientProfile.nextReminder} icon={CalendarClock} accent="from-cyan to-emerald-400" />
        <StatCard title="Mobility Score" value="68 / 100" caption="Improving with strength and mobility plan" icon={Footprints} accent="from-magenta to-cyan" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <ChartCard title="Symptom And Score Trend Preview">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={testHistory}>
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#7c3aed" strokeWidth={3} dot={{ r: 5 }} name="OA Chance Score" />
                <Line type="monotone" dataKey="mobility" stroke="#21c7df" strokeWidth={3} dot={{ r: 5 }} name="Mobility" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <div className="card p-5">
          <h3 className="text-lg font-bold text-navy">Recent Test Result Summary</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">Latest panel shows hs-CRP improving, Vitamin D still below target, Omega-3 trending upward, and trace effusion on imaging summary.</p>
          <div className="mt-5 rounded-2xl bg-lavender p-4 text-sm font-semibold text-navy">Alert: Follow up with clinician before changing medications or supplements.</div>
        </div>
      </div>

      <div className="card p-5">
        <h3 className="mb-4 text-lg font-bold text-navy">Quick Actions</h3>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {quickActions.map(([label, Icon, page]) => (
            <Button key={label} variant="secondary" onClick={() => onNavigate(page)}>
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          ))}
        </div>
      </div>
      <DisclaimerBox />
    </div>
  );
}
