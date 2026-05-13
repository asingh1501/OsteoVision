import { CalendarPlus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '../components/Button';
import { DisclaimerBox } from '../components/DisclaimerBox';
import { ProgressBar } from '../components/ProgressBar';
import { StatCard } from '../components/StatCard';
import { TreatmentCard } from '../components/TreatmentCard';
import { initialTreatments } from '../data/mockData';
import { Activity, Focus, ShieldCheck } from 'lucide-react';

export function TreatmentPlan() {
  const [items, setItems] = useState(initialTreatments);
  const [calendarMessage, setCalendarMessage] = useState('');
  const adherence = useMemo(() => Math.round((items.filter((item) => item.complete).length / items.length) * 100), [items]);

  return (
    <div className="space-y-6">
      <div className="card flex flex-col justify-between gap-4 p-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-black text-navy">Baseline Vigilance Treatment Plan</h1>
          <p className="mt-2 text-slate-600">Personalized care planning and reminder support for clinician-reviewed next steps.</p>
        </div>
        <Button onClick={() => setCalendarMessage('Treatment plan accepted. Seven reminders were added to the mock OsteoVision calendar.')}>
          <CalendarPlus className="h-4 w-4" /> Accept & Add to Calendar
        </Button>
      </div>
      {calendarMessage && <div className="rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-700">{calendarMessage}</div>}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Disease Stage" value="Baseline Vigilance" caption="Trend monitoring and early intervention support" icon={ShieldCheck} />
        <StatCard title="Risk Score" value="37%" caption="Moderate risk decision-support score" icon={Activity} />
        <StatCard title="Primary Focus" value="Inflammation" caption="Nutrient repletion, mobility, and follow-up labs" icon={Focus} />
      </div>
      <div className="card p-5">
        <ProgressBar value={adherence} label="Treatment adherence" />
      </div>
      <div className="space-y-4">
        {items.map((item) => <TreatmentCard key={item.id} item={item} onComplete={(id) => setItems((prev) => prev.map((entry) => entry.id === id ? { ...entry, complete: true, adherence: 'On track' } : entry))} />)}
      </div>
      <DisclaimerBox />
    </div>
  );
}
