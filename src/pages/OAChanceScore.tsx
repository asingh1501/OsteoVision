import { CheckCircle2 } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { ChartCard } from '../components/ChartCard';
import { DisclaimerBox } from '../components/DisclaimerBox';

const breakdown = [
  { name: 'Imaging', value: 30 },
  { name: 'Symptoms', value: 20 },
  { name: 'Inflammation', value: 18 },
  { name: 'Genetic', value: 12 },
  { name: 'Nutrients', value: 10 },
  { name: 'Treatment', value: 10 },
];

export function OAChanceScore() {
  return (
    <div className="space-y-6">
      <div className="gradient-panel rounded-3xl p-8 shadow-soft">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan">Prototype decision-support model</p>
        <h1 className="mt-3 text-4xl font-black">Osteoarthritis Chance Score</h1>
        <div className="mt-6 flex flex-wrap items-end gap-5">
          <span className="text-7xl font-black">37%</span>
          <div>
            <p className="text-2xl font-bold">Moderate Risk</p>
            <p className="max-w-2xl text-white/85">Moderate risk detected based on biomarker variation, imaging indicators, symptom patterns, and genetic predisposition.</p>
          </div>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <ChartCard title="Risk Breakdown">
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={breakdown}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#7c3aed" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <div className="card p-6">
          <h2 className="text-xl font-black text-navy">Why this score?</h2>
          <p className="mt-3 leading-7 text-slate-600">The prototype combines imaging severity, symptoms and mobility, inflammation biomarkers, genetic risk, nutrient deficiencies, and treatment response. It supports risk awareness and care planning but is not a clinical diagnostic algorithm.</p>
          <h3 className="mt-6 font-bold text-navy">Recommended Next Steps</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {['Continue symptom tracking', 'Review results with clinician', 'Begin targeted inflammation reduction plan', 'Schedule follow-up testing', 'Consider physical therapy evaluation'].map((step) => (
              <div key={step} className="flex items-center gap-2 rounded-2xl bg-lavender p-3 text-sm font-semibold text-navy">
                <CheckCircle2 className="h-5 w-5 text-cyan" /> {step}
              </div>
            ))}
          </div>
        </div>
      </div>
      <DisclaimerBox />
    </div>
  );
}
