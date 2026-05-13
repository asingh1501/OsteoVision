import { ArrowLeft, CheckCircle2, ClipboardList, PlayCircle } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Button } from '../components/Button';
import { ChartCard } from '../components/ChartCard';
import { DisclaimerBox } from '../components/DisclaimerBox';
import type { AnalysisInputs, RiskAnalysisResult } from '../types';
import { calculateOAChanceScore, type OAFactors } from '../utils/calculateOAChanceScore';

const colors = ['#6d28d9', '#be185d', '#7c3aed', '#db2777', '#8b5cf6', '#c026d3'];
const inputLabels: Record<keyof AnalysisInputs, string> = {
  vitaminD: '25(OH) Vitamin D',
  omega3: 'Omega-3 Index',
  hsCrp: 'hs-CRP',
  il6: 'Interleukin-6',
  comp: 'COMP',
  oxidativeStress: '8-OHdG',
  microbiomeDiversity: 'Microbiome Diversity',
  geneticPercentile: 'Genetic Risk Percentile',
  imagingSeverity: 'Imaging Severity',
  symptomSeverity: 'Symptom Severity',
  mobilityScore: 'Mobility Score',
  treatmentAdherence: 'Treatment Adherence',
};
type AnalysisInputForm = { [Key in keyof AnalysisInputs]: number | '' };

const emptyInputs: AnalysisInputForm = {
  vitaminD: '',
  omega3: '',
  hsCrp: '',
  il6: '',
  comp: '',
  oxidativeStress: '',
  microbiomeDiversity: '',
  geneticPercentile: '',
  imagingSeverity: '',
  symptomSeverity: '',
  mobilityScore: '',
  treatmentAdherence: '',
};

export function OAChanceScore({ analysis, onAnalysisComplete, onEditInputs }: { analysis: RiskAnalysisResult | null; onAnalysisComplete: (result: RiskAnalysisResult) => void; onEditInputs: () => void }) {
  const [inputs, setInputs] = useState<AnalysisInputForm>(analysis?.inputs ?? emptyInputs);
  const [inputError, setInputError] = useState('');
  const [editing, setEditing] = useState(false);

  const updateInput = (key: keyof AnalysisInputs, value: string) => {
    setInputs((current) => ({ ...current, [key]: value === '' ? '' : Number(value) }));
    setInputError('');
  };

  const runAnalysis = () => {
    const missing = (Object.keys(inputs) as Array<keyof AnalysisInputs>).filter((key) => inputs[key] === '' || Number.isNaN(inputs[key]));
    if (missing.length > 0) {
      setInputError(`Complete these fields before running analysis: ${missing.map((key) => inputLabels[key]).join(', ')}.`);
      return;
    }
    const completeInputs = inputs as AnalysisInputs;
    const inflammationScore = Math.min(100, Math.round((completeInputs.hsCrp / 6) * 35 + (completeInputs.il6 / 8) * 35 + (completeInputs.comp / 18) * 15 + (completeInputs.oxidativeStress / 18) * 15));
    const nutrientDeficiencyScore = Math.min(100, Math.round((completeInputs.vitaminD < 40 ? (40 - completeInputs.vitaminD) * 2 : 0) + (completeInputs.omega3 < 8 ? (8 - completeInputs.omega3) * 10 : 0) + (completeInputs.microbiomeDiversity < 75 ? (75 - completeInputs.microbiomeDiversity) : 0)));
    const symptomMobilityScore = Math.min(100, Math.round(completeInputs.symptomSeverity * 0.65 + (100 - completeInputs.mobilityScore) * 0.35));
    const factors: OAFactors = {
      imagingSeverity: completeInputs.imagingSeverity,
      symptomSeverity: symptomMobilityScore,
      inflammationScore,
      geneticRisk: completeInputs.geneticPercentile,
      nutrientDeficiencyScore,
      treatmentAdherence: completeInputs.treatmentAdherence,
    };
    const result = calculateOAChanceScore(factors);
    const drivers = [
      completeInputs.hsCrp > 3 ? 'hs-CRP above preferred range' : '',
      completeInputs.il6 > 2 ? 'IL-6 inflammation signal' : '',
      completeInputs.vitaminD < 40 ? 'Vitamin D below target' : '',
      completeInputs.omega3 < 8 ? 'Omega-3 Index below target' : '',
      completeInputs.oxidativeStress > 8 ? '8-OHdG oxidative stress marker elevated' : '',
      completeInputs.imagingSeverity > 40 ? 'Imaging severity input above baseline' : '',
    ].filter(Boolean);
    onAnalysisComplete({
      score: result.score,
      category: result.category,
      drivers,
      inputs: completeInputs,
      factorScores: {
        imagingSeverity: completeInputs.imagingSeverity,
        symptomMobilityScore,
        inflammationScore,
        geneticRisk: completeInputs.geneticPercentile,
        nutrientDeficiencyScore,
        treatmentAdherence: completeInputs.treatmentAdherence,
      },
    });
    setEditing(false);
  };

  if (!analysis || editing) {
    return (
      <div className="space-y-6">
        <div className="card p-6 md:p-8">
          <div className="flex max-w-4xl items-start gap-4">
            <div className="rounded-xl bg-lavender p-3 text-violet">
              <ClipboardList className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet">Risk analysis workflow</p>
              <h1 className="mt-2 text-3xl font-black text-navy">{analysis ? 'Edit analysis inputs' : 'Enter analysis inputs'}</h1>
              <p className="mt-3 leading-7 text-slate-600">The score is generated only after the patient or clinician enters biomarker, imaging, symptom, mobility, genetics, and adherence data.</p>
            </div>
          </div>
        </div>
        <AnalysisInputPanel inputs={inputs} inputError={inputError} onChange={updateInput} onSubmit={runAnalysis} />
        {analysis && <Button variant="secondary" onClick={() => setEditing(false)}>Cancel and return to report</Button>}
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
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => setEditing(true)}><ClipboardList /> Edit Inputs</Button>
              <Button variant="ghost" onClick={onEditInputs}><ArrowLeft /> Back to Testing</Button>
            </div>
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

function AnalysisInputPanel({
  inputs,
  inputError,
  onChange,
  onSubmit,
}: {
  inputs: AnalysisInputForm;
  inputError: string;
  onChange: (key: keyof AnalysisInputs, value: string) => void;
  onSubmit: () => void;
}) {
  return (
    <section className="card p-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
        <div>
          <h2 className="text-xl font-black text-navy">Patient And Test Data</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Enter values from uploaded lab reports, imaging summaries, symptom tracking, and treatment adherence. Blank fields are not estimated.
          </p>
        </div>
        <Button onClick={onSubmit}><PlayCircle /> Generate Report</Button>
      </div>
      {inputError && <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">{inputError}</div>}
      <div className="mt-5 space-y-5">
        <InputGroup title="Blood Panel" description="Inflammation, cartilage turnover, and nutrient markers from blood testing.">
          <InputField label="25(OH) Vitamin D" unit="ng/mL" value={inputs.vitaminD} onChange={(value) => onChange('vitaminD', value)} />
          <InputField label="Omega-3 Index" unit="%" value={inputs.omega3} onChange={(value) => onChange('omega3', value)} />
          <InputField label="hs-CRP" unit="mg/L" value={inputs.hsCrp} onChange={(value) => onChange('hsCrp', value)} />
          <InputField label="Interleukin-6" unit="pg/mL" value={inputs.il6} onChange={(value) => onChange('il6', value)} />
          <InputField label="COMP" unit="U/L" value={inputs.comp} onChange={(value) => onChange('comp', value)} />
        </InputGroup>
        <div className="grid gap-5 xl:grid-cols-3">
          <InputGroup title="Stool Analysis" description="Gut-joint axis and microbiome context.">
            <InputField label="Microbiome Diversity" unit="score" value={inputs.microbiomeDiversity} onChange={(value) => onChange('microbiomeDiversity', value)} />
          </InputGroup>
          <InputGroup title="Urine Test" description="Oxidative stress marker from urine testing.">
            <InputField label="8-OHdG" unit="ng/mg" value={inputs.oxidativeStress} onChange={(value) => onChange('oxidativeStress', value)} />
          </InputGroup>
          <InputGroup title="Saliva / Genetic Test" description="Genetic predisposition and risk awareness input.">
            <InputField label="Genetic Risk Percentile" unit="%" value={inputs.geneticPercentile} onChange={(value) => onChange('geneticPercentile', value)} />
          </InputGroup>
        </div>
        <InputGroup title="Full Body MRI / X-ray Summary" description="Condensed imaging severity input from radiology, MRI, X-ray, or uploaded report summary.">
          <InputField label="Imaging Severity" unit="0-100" value={inputs.imagingSeverity} onChange={(value) => onChange('imagingSeverity', value)} />
        </InputGroup>
        <div className="grid gap-5 xl:grid-cols-2">
          <InputGroup title="Symptoms And Mobility" description="Patient-reported symptoms and functional tracking.">
            <InputField label="Symptom Severity" unit="0-100" value={inputs.symptomSeverity} onChange={(value) => onChange('symptomSeverity', value)} />
            <InputField label="Mobility Score" unit="0-100" value={inputs.mobilityScore} onChange={(value) => onChange('mobilityScore', value)} />
          </InputGroup>
          <InputGroup title="Treatment Follow-Through" description="Adherence to the active clinician-reviewed care plan.">
            <InputField label="Treatment Adherence" unit="%" value={inputs.treatmentAdherence} onChange={(value) => onChange('treatmentAdherence', value)} />
          </InputGroup>
        </div>
      </div>
    </section>
  );
}

function InputGroup({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-4">
        <h3 className="text-base font-black text-navy">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{children}</div>
    </div>
  );
}

function InputField({ label, unit, value, onChange }: { label: string; unit: string; value: number | ''; onChange: (value: string) => void }) {
  return (
    <label className="block rounded-2xl border border-slate-200 bg-white p-4">
      <span className="text-sm font-bold text-navy">{label}</span>
      <div className="mt-2 flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-navy outline-none focus:border-violet focus:ring-2 focus:ring-violet/10"
        />
        <span className="shrink-0 text-xs font-bold text-slate-500">{unit}</span>
      </div>
    </label>
  );
}
