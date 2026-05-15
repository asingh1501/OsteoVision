import { Activity, AlertTriangle, CalendarClock, CheckCircle2, FileUp, FlaskConical, Footprints, HeartPulse, ListChecks, PhoneCall, Pill, Smile, Stethoscope, TrendingUp, UserRoundPlus } from 'lucide-react';
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';
import { patientProfile, testHistory } from '../data/mockData';
import { Button } from '../components/Button';
import { ChartCard } from '../components/ChartCard';
import { DisclaimerBox } from '../components/DisclaimerBox';
import { StatCard } from '../components/StatCard';
import type { PageId, RiskAnalysisResult } from '../types';
import { PageHero } from '../components/PageHero';
import { ElderlyActionButton } from '../components/ElderlyActionButton';
import { CareTeamCard } from '../components/CareTeamCard';
import { treatmentCalendarEvents } from '../data/mockData';

export function Dashboard({ onNavigate, analysis }: { onNavigate: (page: PageId) => void; analysis: RiskAnalysisResult | null }) {
  const quickActions = [
    ['Upload Medical Records', FileUp, 'testing'],
    ['Log pain today', HeartPulse, 'history'],
    ['View Treatment Plan', ListChecks, 'plan'],
    ['Compare Test Results', TrendingUp, 'history'],
    ['Generate Clinician Summary', UserRoundPlus, 'clinician'],
  ] as const;

  return (
    <div className="space-y-6">
      <div className="gradient-panel rounded-2xl p-6 md:p-8">
        <h1 className="text-safe text-3xl font-black">Welcome back to OsteoVision</h1>
        <p className="mt-2 max-w-3xl text-slate-600">Tracking {patientProfile.primaryJoint} risk factors, symptoms, diagnostics, treatment adherence, and clinician-ready insights for {patientProfile.name}.</p>
      </div>
      <PageHero
        icon={HeartPulse}
        title="Dashboard"
        explanation="Start here to see today’s care tasks, your health status, and your care team."
        actions={['Check today’s plan', 'See your health score', 'Contact your care team']}
      />

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="card p-6">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-black text-navy"><CheckCircle2 className="h-7 w-7 text-violet" /> Today’s Care Plan</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {treatmentCalendarEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="rounded-2xl bg-lavender p-4">
                <p className="text-lg font-black text-navy">{event.title}</p>
                <p className="mt-1 text-base font-bold text-violet">{event.time}</p>
                <p className="mt-1 text-base text-slate-700">{event.status}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-black text-navy"><AlertTriangle className="h-7 w-7 text-amber-600" /> Call Doctor If...</h2>
          <ul className="space-y-3 text-lg font-bold text-slate-700">
            <li>New swelling or severe pain appears.</li>
            <li>You cannot walk normally.</li>
            <li>A medication causes side effects.</li>
          </ul>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Current OA Chance Score"
          value={analysis ? `${analysis.score}%` : 'Not run'}
          caption={analysis ? analysis.category : 'Enter testing data to generate a score'}
          icon={Activity}
        />
        <StatCard title="Disease Stage" value={analysis ? analysis.category.split(' / ')[0] : 'Pending'} caption={analysis ? 'Generated from current testing inputs' : 'No current analysis yet'} icon={FlaskConical} />
        <StatCard title="Next Reminder" value="May 18" caption={patientProfile.nextReminder} icon={CalendarClock} />
        <StatCard title="Mobility Score" value="68 / 100" caption="Improving with strength and mobility plan" icon={Footprints} />
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ElderlyActionButton icon={Pill} label="I took my medication" />
        <ElderlyActionButton icon={HeartPulse} label="Log pain today" onClick={() => onNavigate('history')} />
        <ElderlyActionButton icon={CalendarClock} label="View calendar" onClick={() => onNavigate('plan')} />
        <ElderlyActionButton icon={PhoneCall} label="Contact my doctor" onClick={() => onNavigate('doctors')} />
      </section>

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
          <h3 className="text-xl font-black text-navy">How You’re Doing</h3>
          <div className="my-4 flex items-center gap-3 rounded-2xl bg-lavender p-4">
            <Smile className="h-10 w-10 text-violet" />
            <div><p className="text-lg font-black text-navy">Stable today</p><p className="text-base text-slate-700">Keep following your care plan.</p></div>
          </div>
          <h3 className="text-lg font-bold text-navy">Recent Test Result Summary</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {analysis ? `Latest generated analysis found ${analysis.drivers.length || 'no major'} key driver${analysis.drivers.length === 1 ? '' : 's'} from the entered data.` : 'No current risk analysis has been generated. Upload records or enter testing values, then run the analysis to create a current score.'}
          </p>
          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">Alert: Follow up with clinician before changing medications or supplements.</div>
        </div>
      </div>
      <CareTeamCard />

      <div className="card p-5">
        <h3 className="mb-4 text-lg font-bold text-navy">Quick Actions</h3>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
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
