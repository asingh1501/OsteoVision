import { useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { ChartCard } from '../components/ChartCard';
import { DisclaimerBox } from '../components/DisclaimerBox';
import { RiskBadge } from '../components/RiskBadge';
import { testHistory } from '../data/mockData';

export function TreatmentEffectiveness() {
  const [baselineId, setBaselineId] = useState('jan');
  const [currentId, setCurrentId] = useState('may');
  const baseline = testHistory.find((item) => item.id === baselineId)!;
  const current = testHistory.find((item) => item.id === currentId)!;
  const rating = current.score < baseline.score && current.mobility > baseline.mobility ? 'Improving' : current.score === baseline.score ? 'Stable' : 'Needs Review';

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="grid gap-3 md:grid-cols-2">
          <select value={baselineId} onChange={(event) => setBaselineId(event.target.value)} className="rounded-xl border border-violet/20 bg-white p-3 font-semibold text-navy">
            {testHistory.map((item) => <option key={item.id} value={item.id}>Baseline: {item.date}</option>)}
          </select>
          <select value={currentId} onChange={(event) => setCurrentId(event.target.value)} className="rounded-xl border border-violet/20 bg-white p-3 font-semibold text-navy">
            {testHistory.map((item) => <option key={item.id} value={item.id}>Current: {item.date}</option>)}
          </select>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="gradient-panel rounded-3xl p-6 shadow-soft">
          <p className="font-bold text-cyan">Treatment impact summary</p>
          <h1 className="mt-3 text-4xl font-black">{rating}</h1>
          <p className="mt-4 text-white/85">OsteoVision compares diagnostic markers and symptom patterns over time to help patients and clinicians understand whether the current care plan is improving, stabilizing, or worsening osteoarthritis-related risk.</p>
        </div>
        <ChartCard title="OA Chance Score Trend">
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={testHistory}>
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#21c7df" strokeWidth={4} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['hs-CRP decreased', `${baseline.crp} -> ${current.crp}`, current.crp < baseline.crp],
          ['Vitamin D increased', `${baseline.vitaminD} -> ${current.vitaminD}`, current.vitaminD > baseline.vitaminD],
          ['Omega-3 Index increased', `${baseline.omega3} -> ${current.omega3}`, current.omega3 > baseline.omega3],
          ['Mobility score increased', `${baseline.mobility} -> ${current.mobility}`, current.mobility > baseline.mobility],
        ].map(([name, value, good]) => (
          <div key={String(name)} className="card p-5">
            <div className="flex justify-between gap-3">
              <h3 className="font-bold text-navy">{name}</h3>
              <RiskBadge status={good ? 'improved' : 'worsened'} />
            </div>
            <p className="mt-3 text-2xl font-black text-ink">{value}</p>
          </div>
        ))}
      </div>
      <DisclaimerBox />
    </div>
  );
}
