import { ArrowLeft, CheckCircle2, ClipboardList } from 'lucide-react';
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Button } from '../components/Button';
import { ChartCard } from '../components/ChartCard';
import { DisclaimerBox } from '../components/DisclaimerBox';
import type { RiskAnalysisResult } from '../types';

const colors = ['#6d28d9', '#be185d', '#7c3aed', '#db2777', '#8b5cf6', '#c026d3'];

export function OAChanceScore({ analysis, onEditInputs }: { analysis: RiskAnalysisResult | null; onEditInputs: () => void }) {
  if (!analysis) {
    return (
      <div className="space-y-6">
        <div className="card p-8">
          <div className="flex max-w-3xl items-start gap-4">
            <div className="rounded-xl bg-lavender p-3 text-violet">
              <ClipboardList className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet">Risk analysis workflow</p>
              <h1 className="mt-2 text-3xl font-black text-navy">Enter testing data first</h1>
              <p className="mt-3 leading-7 text-slate-600">The OA Chance Score is generated after the patient or clinician enters biomarker, imaging, symptom, mobility, genetics, and adherence inputs. Start in Comprehensive Testing, then run the analysis to create this report.</p>
              <Button className="mt-5" onClick={onEditInputs}><ClipboardList /> Go to Comprehensive Testing</Button>
            </div>
          </div>
        </div>
        <DisclaimerBox />
      </div>
    );
  }

  const breakdown = [
    { name: 'Imaging', value: analysis.factorScores.imagingSeverity, weight: '30%' },
    { name: 'Symptoms', value: analysis.factorScores.symptomMobilityScore, weight: '20%' },
    { name: 'Inflammation', value: analysis.factorScores.inflammationScore, weight: '18%' },
    { name: 'Genetic', value: analysis.factorScores.geneticRisk, weight: '12%' },
    { name: 'Nutrients', value: analysis.factorScores.nutrientDeficiencyScore, weight: '10%' },
    { name: 'Adherence', value: 100 - analysis.factorScores.treatmentAdherence, weight: '10%' },
  ];

  return (
    <div className="space-y-6">
      <div className="card overflow-hidden p-0">
        <div className="border-b border-slate-200 bg-lavender px-6 py-4">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet">Generated risk analysis report</p>
              <h1 className="mt-1 text-3xl font-black text-navy">Osteoarthritis Chance Score</h1>
            </div>
            <Button variant="secondary" onClick={onEditInputs}><ArrowLeft /> Edit Inputs</Button>
          </div>
        </div>
        <div className="p-8">
          <div className="flex flex-wrap items-end gap-5">
          <span className="text-7xl font-black text-navy">{analysis.score}%</span>
          <div>
            <p className="text-2xl font-bold text-violet">{analysis.category}</p>
            <p className="max-w-2xl text-slate-600">Generated from the patient-entered biomarkers, imaging severity, symptom pattern, mobility score, genetic risk percentile, and treatment adherence.</p>
          </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {analysis.drivers.length > 0 ? analysis.drivers.map((driver) => (
              <span key={driver} className="rounded-full border border-violet/15 bg-white px-3 py-1.5 text-xs font-bold text-slate-700">{driver}</span>
            )) : <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">No major out-of-range drivers entered</span>}
          </div>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <ChartCard title="Entered Factor Severity">
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={breakdown}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {breakdown.map((_, index) => <Cell key={colors[index]} fill={colors[index]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <div className="card p-6">
          <h2 className="text-xl font-black text-navy">Why this score?</h2>
          <p className="mt-3 leading-7 text-slate-600">The prototype combines imaging severity, symptoms and mobility, inflammation biomarkers, genetic risk, nutrient deficiencies, and treatment response. It supports risk awareness and care planning but is not a clinical diagnostic algorithm.</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {breakdown.map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-sm font-bold text-navy">{item.name}</p>
                <p className="text-xs font-semibold text-slate-500">Input severity {item.value}/100 · model weight {item.weight}</p>
              </div>
            ))}
          </div>
          <h3 className="mt-6 font-bold text-navy">Recommended Next Steps</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {['Continue symptom tracking', 'Review results with clinician', 'Begin targeted inflammation reduction plan', 'Schedule follow-up testing', 'Consider physical therapy evaluation'].map((step) => (
              <div key={step} className="flex items-center gap-2 rounded-2xl bg-slate-50 p-3 text-sm font-semibold text-navy">
                <CheckCircle2 className="h-5 w-5 text-violet" /> {step}
              </div>
            ))}
          </div>
        </div>
      </div>
      <DisclaimerBox />
    </div>
  );
}
