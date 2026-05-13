import { Download, Share2 } from 'lucide-react';
import { Button } from '../components/Button';
import { DisclaimerBox } from '../components/DisclaimerBox';
import { ProgressBar } from '../components/ProgressBar';
import { biomarkers, imagingResults, patientProfile } from '../data/mockData';

export function ClinicianSummary() {
  const abnormal = biomarkers.filter((item) => ['high risk', 'low', 'moderate'].includes(item.status)).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="card flex flex-col justify-between gap-4 p-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-black text-navy">Doctor-Friendly Visit Summary</h1>
          <p className="mt-2 text-slate-600">{patientProfile.name}, age {patientProfile.age} · Primary focus: {patientProfile.primaryJoint}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary"><Download className="h-4 w-4" /> Export PDF</Button>
          <Button><Share2 className="h-4 w-4" /> Share with Provider</Button>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <div className="card p-6">
          <h2 className="text-xl font-black text-navy">Patient Overview</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-slate-500">OA Chance Score</dt><dd className="font-bold text-navy">37%</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">Disease Stage</dt><dd className="font-bold text-navy">Baseline Vigilance</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">Symptom Trend</dt><dd className="font-bold text-emerald-600">Mild improvement</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">Care Team</dt><dd className="font-bold text-navy">{patientProfile.careTeam}</dd></div>
          </dl>
          <div className="mt-5"><ProgressBar value={76} label="Treatment adherence" /></div>
        </div>
        <div className="card p-6">
          <h2 className="text-xl font-black text-navy">Key Risk Factors And Recent Abnormal Markers</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {abnormal.map((item) => (
              <div key={item.name} className="rounded-2xl bg-lavender p-4">
                <p className="font-bold text-navy">{item.name}</p>
                <p className="text-sm text-slate-600">{item.value} {item.unit} · ideal {item.idealRange}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <Summary title="Imaging Summary" items={imagingResults.map((item) => `${item.name}: ${item.value}`)} />
        <Summary title="Questions For Clinician" items={['Should inflammation markers be repeated in 8-12 weeks?', 'Is physical therapy intensity appropriate for current symptoms?', 'Are medication risks or interactions relevant to current plan?']} />
        <Summary title="Follow-Up Discussion Points" items={['Review biomarker trends rather than isolated values.', 'Discuss supplement plan and medication safety.', 'Consider repeat imaging only if clinically appropriate.']} />
      </div>
      <DisclaimerBox />
    </div>
  );
}

function Summary({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="card p-5">
      <h3 className="text-lg font-black text-navy">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
        {items.map((item) => <li key={item} className="rounded-2xl bg-lavender p-3">{item}</li>)}
      </ul>
    </div>
  );
}
