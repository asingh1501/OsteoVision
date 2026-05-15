import { useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { ChartCard } from '../components/ChartCard';
import { RiskBadge } from '../components/RiskBadge';
import { TestResultCard } from '../components/TestResultCard';
import { testHistory } from '../data/mockData';
import { PageHero } from '../components/PageHero';
import { History } from 'lucide-react';

export function TestHistory() {
  const [left, setLeft] = useState('jan');
  const [right, setRight] = useState('may');
  const baseline = testHistory.find((item) => item.id === left)!;
  const current = testHistory.find((item) => item.id === right)!;

  return (
    <div className="space-y-6">
      <PageHero icon={History} title="Test History" explanation="See changes in your test results over time." actions={['Review past dates', 'Compare two results', 'Look for improving markers']} />
      <div className="grid gap-4 md:grid-cols-3">
        {testHistory.map((item) => <TestResultCard key={item.id} item={item} selected={item.id === left || item.id === right} onSelect={() => (item.id === left ? setRight(item.id) : setLeft(item.id))} />)}
      </div>
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <ChartCard title="OA Chance Score Over Time">
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={testHistory}>
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#d946ef" strokeWidth={4} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <div className="card p-5">
          <h2 className="text-xl font-black text-navy">Compare Baseline vs Current</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <select value={left} onChange={(event) => setLeft(event.target.value)} className="rounded-xl border border-slate-300 bg-white p-3 font-semibold text-navy">
              {testHistory.map((item) => <option key={item.id} value={item.id}>{item.date}</option>)}
            </select>
            <select value={right} onChange={(event) => setRight(event.target.value)} className="rounded-xl border border-slate-300 bg-white p-3 font-semibold text-navy">
              {testHistory.map((item) => <option key={item.id} value={item.id}>{item.date}</option>)}
            </select>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[baseline, current].map((item) => (
              <div key={item.id} className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-bold text-violet">{item.date}</p>
                <p className="text-safe mt-1 text-3xl font-black text-navy">{item.score}%</p>
                <p className="text-sm text-slate-600">{item.stage}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['hs-CRP', `${baseline.crp} -> ${current.crp} mg/L`, current.crp < baseline.crp ? 'improved' : 'worsened'],
          ['Vitamin D', `${baseline.vitaminD} -> ${current.vitaminD} ng/mL`, current.vitaminD > baseline.vitaminD ? 'improved' : 'worsened'],
          ['Omega-3 Index', `${baseline.omega3} -> ${current.omega3}%`, current.omega3 > baseline.omega3 ? 'improved' : 'worsened'],
          ['Mobility Score', `${baseline.mobility} -> ${current.mobility}`, current.mobility > baseline.mobility ? 'improved' : 'worsened'],
        ].map(([name, value, status]) => (
          <div key={name} className="card p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-bold text-navy">{name}</h3>
              <RiskBadge status={status} />
            </div>
            <p className="text-safe mt-3 text-2xl font-black text-ink">{value}</p>
          </div>
        ))}
      </div>
      <div className="card p-6">
        <h2 className="text-xl font-black text-navy">Range Recovery Suggestions</h2>
        <p className="mt-2 text-sm text-slate-600">Suggestions are intentionally framed as clinician discussion prompts. The prototype does not prescribe treatment.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['hs-CRP', 'Discuss inflammation contributors and whether repeat testing is appropriate after plan changes.'],
            ['Vitamin D', 'Ask about supervised repletion, target range, and retest timing.'],
            ['Omega-3', 'Review nutrition pattern, supplement safety, and medication interaction risk.'],
            ['Mobility', 'Consider PT-guided progression for strength, gait, and joint-friendly activity.'],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-2xl bg-slate-50 p-4">
              <h3 className="font-bold text-navy">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
