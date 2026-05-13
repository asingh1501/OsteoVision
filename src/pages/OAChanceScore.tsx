import { Activity, ArrowLeft, CheckCircle2, ClipboardCheck, ClipboardList, Dna, Droplets, FlaskConical, Footprints, PlayCircle, ScanLine } from 'lucide-react';
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
  rbcMagnesium: 'RBC Magnesium',
  omega3: 'Omega-3 Index',
  hsCrp: 'hs-CRP',
  esr: 'ESR',
  il6: 'Interleukin-6',
  tnfAlpha: 'TNF-alpha',
  comp: 'COMP',
  leptin: 'Leptin',
  adiponectin: 'Adiponectin',
  fastingInsulin: 'Fasting Insulin',
  oxidativeStress: '8-OHdG',
  urinaryCtxII: 'Urinary CTX-II',
  f2Isoprostane: 'F2-Isoprostane',
  microbiomeDiversity: 'Microbiome Diversity',
  stoolButyrate: 'Stool Butyrate',
  calprotectin: 'Fecal Calprotectin',
  zonulin: 'Zonulin',
  geneticPercentile: 'Genetic Risk Percentile',
  amCortisol: 'AM Cortisol',
  collagenRisk: 'Collagen / Cartilage Variant Risk',
  imagingSeverity: 'Imaging Severity',
  cartilageThickness: 'Cartilage Thickness',
  jointSpaceNarrowing: 'Joint Space Narrowing',
  effusionSeverity: 'Effusion / Synovitis Severity',
  boneMarrowLesion: 'Bone Marrow Lesion Indicator',
  symptomSeverity: 'Symptom Severity',
  mobilityScore: 'Mobility Score',
  treatmentAdherence: 'Treatment Adherence',
};
type AnalysisInputForm = { [Key in keyof AnalysisInputs]: number | '' };

const emptyInputs: AnalysisInputForm = {
  vitaminD: '',
  rbcMagnesium: '',
  omega3: '',
  hsCrp: '',
  esr: '',
  il6: '',
  tnfAlpha: '',
  comp: '',
  leptin: '',
  adiponectin: '',
  fastingInsulin: '',
  oxidativeStress: '',
  urinaryCtxII: '',
  f2Isoprostane: '',
  microbiomeDiversity: '',
  stoolButyrate: '',
  calprotectin: '',
  zonulin: '',
  geneticPercentile: '',
  amCortisol: '',
  collagenRisk: '',
  imagingSeverity: '',
  cartilageThickness: '',
  jointSpaceNarrowing: '',
  effusionSeverity: '',
  boneMarrowLesion: '',
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
    const inflammationScore = Math.min(100, Math.round(
      (completeInputs.hsCrp / 6) * 18 +
      (completeInputs.esr / 40) * 10 +
      (completeInputs.il6 / 8) * 16 +
      (completeInputs.tnfAlpha / 12) * 12 +
      (completeInputs.comp / 18) * 12 +
      (completeInputs.oxidativeStress / 18) * 10 +
      (completeInputs.urinaryCtxII / 500) * 10 +
      (completeInputs.f2Isoprostane / 3) * 6 +
      (completeInputs.calprotectin / 150) * 6,
    ));
    const nutrientDeficiencyScore = Math.min(100, Math.round(
      (completeInputs.vitaminD < 40 ? (40 - completeInputs.vitaminD) * 1.6 : 0) +
      (completeInputs.rbcMagnesium < 5.5 ? (5.5 - completeInputs.rbcMagnesium) * 12 : 0) +
      (completeInputs.omega3 < 8 ? (8 - completeInputs.omega3) * 8 : 0) +
      (completeInputs.microbiomeDiversity < 75 ? (75 - completeInputs.microbiomeDiversity) * 0.7 : 0) +
      (completeInputs.stoolButyrate < 10 ? (10 - completeInputs.stoolButyrate) * 3 : 0) +
      (completeInputs.adiponectin < 8 ? (8 - completeInputs.adiponectin) * 2 : 0) +
      (completeInputs.fastingInsulin > 8 ? (completeInputs.fastingInsulin - 8) * 2 : 0),
    ));
    const imagingComposite = Math.min(100, Math.round(
      completeInputs.imagingSeverity * 0.4 +
      (100 - completeInputs.cartilageThickness) * 0.2 +
      completeInputs.jointSpaceNarrowing * 0.2 +
      completeInputs.effusionSeverity * 0.1 +
      completeInputs.boneMarrowLesion * 0.1,
    ));
    const geneticComposite = Math.min(100, Math.round(completeInputs.geneticPercentile * 0.65 + completeInputs.collagenRisk * 0.25 + Math.min(100, completeInputs.amCortisol * 4) * 0.1));
    const symptomMobilityScore = Math.min(100, Math.round(completeInputs.symptomSeverity * 0.65 + (100 - completeInputs.mobilityScore) * 0.35));
    const factors: OAFactors = {
      imagingSeverity: imagingComposite,
      symptomSeverity: symptomMobilityScore,
      inflammationScore,
      geneticRisk: geneticComposite,
      nutrientDeficiencyScore,
      treatmentAdherence: completeInputs.treatmentAdherence,
    };
    const result = calculateOAChanceScore(factors);
    const drivers = [
      completeInputs.hsCrp > 3 ? 'hs-CRP above preferred range' : '',
      completeInputs.esr > 20 ? 'ESR inflammatory trend elevated' : '',
      completeInputs.il6 > 2 ? 'IL-6 inflammation signal' : '',
      completeInputs.tnfAlpha > 5 ? 'TNF-alpha inflammatory signal' : '',
      completeInputs.vitaminD < 40 ? 'Vitamin D below target' : '',
      completeInputs.omega3 < 8 ? 'Omega-3 Index below target' : '',
      completeInputs.oxidativeStress > 8 ? '8-OHdG oxidative stress marker elevated' : '',
      completeInputs.urinaryCtxII > 250 ? 'Urinary CTX-II cartilage turnover signal' : '',
      completeInputs.microbiomeDiversity < 75 ? 'Microbiome diversity below target' : '',
      completeInputs.stoolButyrate < 10 ? 'Stool butyrate below target' : '',
      imagingComposite > 40 ? 'Imaging severity composite above baseline' : '',
    ].filter(Boolean);
    onAnalysisComplete({
      score: result.score,
      category: result.category,
      drivers,
      inputs: completeInputs,
      factorScores: {
        imagingSeverity: imagingComposite,
        symptomMobilityScore,
        inflammationScore,
        geneticRisk: geneticComposite,
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
        <div className="p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <span className="text-safe text-5xl font-black text-navy md:text-6xl">{analysis.score}%</span>
            <div className="min-w-0">
              <p className="text-safe text-2xl font-bold text-violet">{analysis.category}</p>
              <p className="text-safe max-w-2xl text-slate-600">Generated from the patient-entered biomarkers, imaging severity, symptom pattern, mobility score, genetic risk percentile, and treatment adherence.</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {analysis.drivers.length > 0 ? analysis.drivers.map((driver) => (
              <span key={driver} className="rounded-full border border-violet bg-lavender px-3 py-1.5 text-xs font-bold text-violet">{driver}</span>
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
              <div key={item.name} className="rounded-2xl border border-violet bg-lavender p-3">
                <p className="text-sm font-bold text-navy">{item.name}</p>
                <p className="text-safe text-xs font-semibold text-slate-500">Input severity {item.value}/100 · model weight {item.weight}</p>
              </div>
            ))}
          </div>
          <h3 className="mt-6 font-bold text-navy">Recommended Next Steps</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {['Continue symptom tracking', 'Review results with clinician', 'Begin targeted inflammation reduction plan', 'Schedule follow-up testing', 'Consider physical therapy evaluation'].map((step) => (
              <div key={step} className="flex items-center gap-2 rounded-2xl bg-lavender p-3 text-sm font-semibold text-navy">
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
          <p className="text-safe mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Enter values from uploaded lab reports, imaging summaries, symptom tracking, and treatment adherence. Blank fields are not estimated.
          </p>
        </div>
        <Button onClick={onSubmit}><PlayCircle /> Generate Report</Button>
      </div>
      {inputError && <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">{inputError}</div>}
      <div className="mt-5 space-y-5">
        <InputGroup title="Blood Panel" description="Inflammation, cartilage turnover, metabolic, and nutrient markers from blood testing." icon={<FlaskConical />} accent="violet">
          <InputField label="25(OH) Vitamin D" unit="ng/mL" value={inputs.vitaminD} onChange={(value) => onChange('vitaminD', value)} />
          <InputField label="RBC Magnesium" unit="mg/dL" value={inputs.rbcMagnesium} onChange={(value) => onChange('rbcMagnesium', value)} />
          <InputField label="Omega-3 Index" unit="%" value={inputs.omega3} onChange={(value) => onChange('omega3', value)} />
          <InputField label="hs-CRP" unit="mg/L" value={inputs.hsCrp} onChange={(value) => onChange('hsCrp', value)} />
          <InputField label="ESR" unit="mm/hr" value={inputs.esr} onChange={(value) => onChange('esr', value)} />
          <InputField label="Interleukin-6" unit="pg/mL" value={inputs.il6} onChange={(value) => onChange('il6', value)} />
          <InputField label="TNF-alpha" unit="pg/mL" value={inputs.tnfAlpha} onChange={(value) => onChange('tnfAlpha', value)} />
          <InputField label="COMP" unit="U/L" value={inputs.comp} onChange={(value) => onChange('comp', value)} />
          <InputField label="Leptin" unit="ng/mL" value={inputs.leptin} onChange={(value) => onChange('leptin', value)} />
          <InputField label="Adiponectin" unit="ug/mL" value={inputs.adiponectin} onChange={(value) => onChange('adiponectin', value)} />
          <InputField label="Fasting Insulin" unit="uIU/mL" value={inputs.fastingInsulin} onChange={(value) => onChange('fastingInsulin', value)} />
        </InputGroup>
        <div className="grid gap-5 xl:grid-cols-3">
          <InputGroup title="Stool Analysis" description="Gut-joint axis, microbiome context, and gut inflammation markers." icon={<Activity />} accent="pink">
            <InputField label="Microbiome Diversity" unit="score" value={inputs.microbiomeDiversity} onChange={(value) => onChange('microbiomeDiversity', value)} />
            <InputField label="Stool Butyrate" unit="mmol/kg" value={inputs.stoolButyrate} onChange={(value) => onChange('stoolButyrate', value)} />
            <InputField label="Fecal Calprotectin" unit="ug/g" value={inputs.calprotectin} onChange={(value) => onChange('calprotectin', value)} />
            <InputField label="Zonulin" unit="ng/mL" value={inputs.zonulin} onChange={(value) => onChange('zonulin', value)} />
          </InputGroup>
          <InputGroup title="Urine Test" description="Oxidative stress and cartilage turnover trend markers." icon={<Droplets />} accent="indigo">
            <InputField label="8-OHdG" unit="ng/mg" value={inputs.oxidativeStress} onChange={(value) => onChange('oxidativeStress', value)} />
            <InputField label="Urinary CTX-II" unit="ng/mmol" value={inputs.urinaryCtxII} onChange={(value) => onChange('urinaryCtxII', value)} />
            <InputField label="F2-Isoprostane" unit="ng/mg" value={inputs.f2Isoprostane} onChange={(value) => onChange('f2Isoprostane', value)} />
          </InputGroup>
          <InputGroup title="Saliva / Genetic Test" description="Genetic predisposition and stress physiology context." icon={<Dna />} accent="fuchsia">
            <InputField label="Genetic Risk Percentile" unit="%" value={inputs.geneticPercentile} onChange={(value) => onChange('geneticPercentile', value)} />
            <InputField label="AM Cortisol" unit="ug/dL" value={inputs.amCortisol} onChange={(value) => onChange('amCortisol', value)} />
            <InputField label="Collagen Variant Risk" unit="%" value={inputs.collagenRisk} onChange={(value) => onChange('collagenRisk', value)} />
          </InputGroup>
        </div>
        <InputGroup title="Full Body MRI / X-ray Summary" description="Condensed imaging inputs from radiology, MRI, X-ray, or uploaded report summary." icon={<ScanLine />} accent="violet">
          <InputField label="Imaging Severity" unit="0-100" value={inputs.imagingSeverity} onChange={(value) => onChange('imagingSeverity', value)} />
          <InputField label="Cartilage Thickness" unit="0-100" value={inputs.cartilageThickness} onChange={(value) => onChange('cartilageThickness', value)} />
          <InputField label="Joint Space Narrowing" unit="0-100" value={inputs.jointSpaceNarrowing} onChange={(value) => onChange('jointSpaceNarrowing', value)} />
          <InputField label="Effusion / Synovitis" unit="0-100" value={inputs.effusionSeverity} onChange={(value) => onChange('effusionSeverity', value)} />
          <InputField label="Bone Marrow Lesion" unit="0-100" value={inputs.boneMarrowLesion} onChange={(value) => onChange('boneMarrowLesion', value)} />
        </InputGroup>
        <div className="grid gap-5 xl:grid-cols-2">
          <InputGroup title="Symptoms And Mobility" description="Patient-reported symptoms and functional tracking." icon={<Footprints />} accent="pink">
            <InputField label="Symptom Severity" unit="0-100" value={inputs.symptomSeverity} onChange={(value) => onChange('symptomSeverity', value)} />
            <InputField label="Mobility Score" unit="0-100" value={inputs.mobilityScore} onChange={(value) => onChange('mobilityScore', value)} />
          </InputGroup>
          <InputGroup title="Treatment Follow-Through" description="Adherence to the active clinician-reviewed care plan." icon={<ClipboardCheck />} accent="indigo">
            <InputField label="Treatment Adherence" unit="%" value={inputs.treatmentAdherence} onChange={(value) => onChange('treatmentAdherence', value)} />
          </InputGroup>
        </div>
      </div>
    </section>
  );
}

function InputGroup({ title, description, icon, accent, children }: { title: string; description: string; icon: ReactNode; accent: 'violet' | 'pink' | 'indigo' | 'fuchsia'; children: ReactNode }) {
  const styles = {
    violet: 'border-violet bg-lavender text-violet',
    pink: 'border-pink-200 bg-pink-50 text-pink-700',
    indigo: 'border-indigo-200 bg-indigo-50 text-indigo-700',
    fuchsia: 'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700',
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="mb-4 flex items-start gap-3">
        <div className={`rounded-xl border p-2.5 [&_svg]:h-5 [&_svg]:w-5 ${styles[accent]}`}>{icon}</div>
        <div>
        <h3 className="text-safe text-base font-black text-navy">{title}</h3>
        <p className="text-safe mt-1 text-sm text-slate-600">{description}</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{children}</div>
    </div>
  );
}

function InputField({ label, unit, value, onChange }: { label: string; unit: string; value: number | ''; onChange: (value: string) => void }) {
  return (
    <label className="block rounded-2xl border border-slate-200 bg-white p-4">
      <span className="text-safe text-sm font-bold text-navy">{label}</span>
      <div className="mt-2 flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-navy outline-none focus:border-violet focus:ring-2 focus:ring-violet"
        />
        <span className="text-safe shrink-0 text-xs font-bold text-slate-500">{unit}</span>
      </div>
    </label>
  );
}
