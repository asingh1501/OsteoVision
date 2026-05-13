import { CalendarClock, CheckCircle2, FileUp, Home, PlayCircle, Syringe } from 'lucide-react';
import { useRef, useState } from 'react';
import { BiomarkerCard } from '../components/BiomarkerCard';
import { Button } from '../components/Button';
import { DisclaimerBox } from '../components/DisclaimerBox';
import { RiskBadge } from '../components/RiskBadge';
import { biomarkers, imagingResults } from '../data/mockData';
import { calculateOAChanceScore, type OAFactors } from '../utils/calculateOAChanceScore';

const groups = ['Blood Panel', 'Stool Analysis', 'Urine Test', 'Saliva / Genetic Test'] as const;

export function ComprehensiveTesting() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [testingDate, setTestingDate] = useState('2026-05-20');
  const [testingType, setTestingType] = useState('Comprehensive OA panel');
  const [homeVisitDate, setHomeVisitDate] = useState('2026-05-21');
  const [homeVisitRole, setHomeVisitRole] = useState('Phlebotomist');
  const [uploadedReports, setUploadedReports] = useState<string[]>([]);
  const [scheduledTests, setScheduledTests] = useState<string[]>([]);
  const [homeVisits, setHomeVisits] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<{ score: number; category: string; drivers: string[] } | null>(null);
  const [inputs, setInputs] = useState({
    vitaminD: 29,
    omega3: 5.8,
    hsCrp: 3.4,
    il6: 4.9,
    comp: 13.2,
    oxidativeStress: 11.8,
    microbiomeDiversity: 62,
    geneticPercentile: 68,
    imagingSeverity: 43,
    symptomSeverity: 38,
    mobilityScore: 68,
    treatmentAdherence: 76,
  });

  const updateInput = (key: keyof typeof inputs, value: string) => {
    setInputs((current) => ({ ...current, [key]: Number(value) }));
  };

  const uploadReport = (files?: FileList | null) => {
    if (files && files.length > 0) {
      setUploadedReports((current) => [...Array.from(files).map((file) => file.name), ...current]);
      return;
    }
    const next = `Uploaded OA report ${uploadedReports.length + 1}.pdf`;
    setUploadedReports((current) => [next, ...current]);
  };

  const runAnalysis = () => {
    const inflammationScore = Math.min(100, Math.round((inputs.hsCrp / 6) * 35 + (inputs.il6 / 8) * 35 + (inputs.comp / 18) * 15 + (inputs.oxidativeStress / 18) * 15));
    const nutrientDeficiencyScore = Math.min(100, Math.round((inputs.vitaminD < 40 ? (40 - inputs.vitaminD) * 2 : 0) + (inputs.omega3 < 8 ? (8 - inputs.omega3) * 10 : 0) + (inputs.microbiomeDiversity < 75 ? (75 - inputs.microbiomeDiversity) : 0)));
    const symptomMobilityScore = Math.min(100, Math.round(inputs.symptomSeverity * 0.65 + (100 - inputs.mobilityScore) * 0.35));
    const factors: OAFactors = {
      imagingSeverity: inputs.imagingSeverity,
      symptomSeverity: symptomMobilityScore,
      inflammationScore,
      geneticRisk: inputs.geneticPercentile,
      nutrientDeficiencyScore,
      treatmentAdherence: inputs.treatmentAdherence,
    };
    const result = calculateOAChanceScore(factors);
    const drivers = [
      inputs.hsCrp > 3 ? 'hs-CRP above preferred range' : '',
      inputs.il6 > 2 ? 'IL-6 inflammation signal' : '',
      inputs.vitaminD < 40 ? 'Vitamin D below target' : '',
      inputs.omega3 < 8 ? 'Omega-3 Index below target' : '',
      inputs.oxidativeStress > 8 ? '8-OHdG oxidative stress marker elevated' : '',
      inputs.imagingSeverity > 40 ? 'Imaging severity input above baseline' : '',
    ].filter(Boolean);
    setAnalysis({ score: result.score, category: result.category, drivers });
  };

  return (
    <div className="space-y-6">
      <div className="card flex flex-col justify-between gap-4 p-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-black text-navy">Comprehensive Testing Workspace</h1>
          <p className="mt-2 text-slate-600">Mock diagnostic inputs are organized for future API, lab, microbiome, urine, saliva, genetics, MRI, and X-ray integrations.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            accept=".pdf,.png,.jpg,.jpeg,.csv"
            onChange={(event) => uploadReport(event.target.files)}
          />
          <Button variant="secondary" onClick={() => fileInputRef.current?.click()}><FileUp className="h-4 w-4" /> Upload Report</Button>
          <Button onClick={runAnalysis}><PlayCircle className="h-4 w-4" /> Run Risk Analysis</Button>
        </div>
      </div>
      {(uploadedReports.length > 0 || analysis) && (
        <div className="grid gap-4 xl:grid-cols-2">
          {uploadedReports.length > 0 && (
            <div className="card p-5">
              <h3 className="text-lg font-black text-navy">Uploaded Reports</h3>
              <div className="mt-3 space-y-2">
                {uploadedReports.map((report) => (
                  <div key={report} className="flex items-center gap-2 rounded-2xl bg-slate-50 p-3 text-sm font-semibold text-navy">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" /> {report}
                  </div>
                ))}
              </div>
            </div>
          )}
          {analysis && (
            <div className="card p-5">
              <h3 className="text-lg font-black text-navy">Risk Analysis Result</h3>
              <div className="mt-3 rounded-2xl border border-violet/15 bg-lavender p-4">
                <p className="text-3xl font-black text-navy">{analysis.score}%</p>
                <p className="mt-1 text-sm font-bold text-violet">{analysis.category}</p>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  Calculated from the values entered below using the prototype weighted model. This is decision-support only.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {analysis.drivers.map((driver) => <span key={driver} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700">{driver}</span>)}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <section className="card p-6">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
          <div>
            <h2 className="text-xl font-black text-navy">Analysis Inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Enter patient-reported symptoms, lab values, genetics, imaging severity, mobility, and adherence before running the prototype OA Chance Score model.</p>
          </div>
          <Button onClick={runAnalysis}><PlayCircle /> Calculate From Inputs</Button>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <InputField label="25(OH) Vitamin D" unit="ng/mL" value={inputs.vitaminD} onChange={(value) => updateInput('vitaminD', value)} />
          <InputField label="Omega-3 Index" unit="%" value={inputs.omega3} onChange={(value) => updateInput('omega3', value)} />
          <InputField label="hs-CRP" unit="mg/L" value={inputs.hsCrp} onChange={(value) => updateInput('hsCrp', value)} />
          <InputField label="Interleukin-6" unit="pg/mL" value={inputs.il6} onChange={(value) => updateInput('il6', value)} />
          <InputField label="COMP" unit="U/L" value={inputs.comp} onChange={(value) => updateInput('comp', value)} />
          <InputField label="8-OHdG" unit="ng/mg" value={inputs.oxidativeStress} onChange={(value) => updateInput('oxidativeStress', value)} />
          <InputField label="Microbiome Diversity" unit="score" value={inputs.microbiomeDiversity} onChange={(value) => updateInput('microbiomeDiversity', value)} />
          <InputField label="Genetic Risk Percentile" unit="%" value={inputs.geneticPercentile} onChange={(value) => updateInput('geneticPercentile', value)} />
          <InputField label="Imaging Severity" unit="0-100" value={inputs.imagingSeverity} onChange={(value) => updateInput('imagingSeverity', value)} />
          <InputField label="Symptom Severity" unit="0-100" value={inputs.symptomSeverity} onChange={(value) => updateInput('symptomSeverity', value)} />
          <InputField label="Mobility Score" unit="0-100" value={inputs.mobilityScore} onChange={(value) => updateInput('mobilityScore', value)} />
          <InputField label="Treatment Adherence" unit="%" value={inputs.treatmentAdherence} onChange={(value) => updateInput('treatmentAdherence', value)} />
        </div>
      </section>
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="card p-6">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-slate-100 p-3 text-violet">
              <CalendarClock className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-navy">Schedule Testing</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">Calendar-style scheduling placeholder for lab panels, stool/urine kits, saliva/genetic testing, imaging review, and follow-up comparisons.</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <input type="date" value={testingDate} onChange={(event) => setTestingDate(event.target.value)} className="rounded-xl border border-slate-300 bg-white p-3 font-semibold text-navy" />
            <select value={testingType} onChange={(event) => setTestingType(event.target.value)} className="rounded-xl border border-slate-300 bg-white p-3 font-semibold text-navy md:col-span-2">
              <option>Comprehensive OA panel</option>
              <option>Blood biomarker panel</option>
              <option>Stool microbiome kit</option>
              <option>Urine oxidative stress test</option>
              <option>Saliva / genetic test</option>
              <option>Medication genetics panel</option>
            </select>
          </div>
          <Button className="mt-4" variant="secondary" onClick={() => setScheduledTests((current) => [`${testingType} on ${testingDate}`, ...current])}><CalendarClock className="h-4 w-4" /> Hold Testing Slot</Button>
          {scheduledTests.length > 0 && (
            <div className="mt-4 space-y-2">
              {scheduledTests.map((slot) => <div key={slot} className="rounded-2xl bg-slate-50 p-3 text-sm font-semibold text-navy">{slot}</div>)}
            </div>
          )}
        </div>
        <div className="card p-6">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-slate-100 p-3 text-violet">
              <Home className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-navy">At-Home Blood Sample Visit</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">Schedule a phlebotomist or RN to collect blood samples at home for supported lab panels.</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <input type="date" value={homeVisitDate} onChange={(event) => setHomeVisitDate(event.target.value)} className="rounded-xl border border-slate-300 bg-white p-3 font-semibold text-navy" />
            <select value={homeVisitRole} onChange={(event) => setHomeVisitRole(event.target.value)} className="rounded-xl border border-slate-300 bg-white p-3 font-semibold text-navy">
              <option>Phlebotomist</option>
              <option>Registered Nurse</option>
            </select>
            <select className="rounded-xl border border-slate-300 bg-white p-3 font-semibold text-navy">
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
            </select>
          </div>
          <Button className="mt-4" onClick={() => setHomeVisits((current) => [`${homeVisitRole} home blood draw requested for ${homeVisitDate}`, ...current])}><Syringe className="h-4 w-4" /> Request Home Visit</Button>
          {homeVisits.length > 0 && (
            <div className="mt-4 space-y-2">
              {homeVisits.map((visit) => <div key={visit} className="rounded-2xl bg-slate-50 p-3 text-sm font-semibold text-navy">{visit}</div>)}
            </div>
          )}
        </div>
      </div>
      {groups.map((group) => (
        <section key={group}>
          <h2 className="mb-4 text-xl font-black text-navy">{group}</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {biomarkers.filter((marker) => marker.group === group).map((marker) => <BiomarkerCard key={marker.name} marker={marker} />)}
          </div>
        </section>
      ))}
      <section>
        <h2 className="mb-4 text-xl font-black text-navy">Imaging / MRI / X-ray Summary</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {imagingResults.map((item) => (
            <div key={item.name} className="card p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-navy">{item.name}</h3>
                  <p className="mt-2 text-lg font-bold text-ink">{item.value}</p>
                </div>
                <RiskBadge status={item.status} />
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.explanation}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="card p-6">
        <h2 className="text-xl font-black text-navy">Suggestions To Discuss For Getting Markers Back In Range</h2>
        <p className="mt-2 text-sm text-slate-600">These are education prompts for clinician discussion, not treatment instructions.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {[
            ['Vitamin D low', 'Ask about supervised repletion dosing, retesting interval, sunlight exposure, and calcium context.'],
            ['Omega-3 below target', 'Discuss diet pattern, supplement quality, bleeding risk, and medication interactions.'],
            ['hs-CRP / IL-6 elevated', 'Review sleep, infection, weight, activity, nutrition, and inflammatory conditions with a clinician.'],
            ['Butyrate low', 'Ask whether fiber diversity, fermented foods, or gut health evaluation is appropriate.'],
            ['8-OHdG high', 'Discuss oxidative stress contributors, recovery, smoking exposure, and follow-up testing.'],
            ['Mobility below goal', 'Consider a physical therapy evaluation for strength, gait, and joint-friendly loading.'],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-2xl bg-slate-50 p-4">
              <h3 className="font-bold text-navy">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
            </div>
          ))}
        </div>
      </section>
      <DisclaimerBox />
    </div>
  );
}

function InputField({ label, unit, value, onChange }: { label: string; unit: string; value: number; onChange: (value: string) => void }) {
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
