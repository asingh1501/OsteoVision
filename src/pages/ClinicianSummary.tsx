import { Download, Share2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/Button';
import { DisclaimerBox } from '../components/DisclaimerBox';
import { ProgressBar } from '../components/ProgressBar';
import { biomarkers, careTeamProfile, imagingResults, insuranceProfile, patientProfile, treatmentCalendarEvents } from '../data/mockData';
import type { RiskAnalysisResult } from '../types';
import { PageHero } from '../components/PageHero';
import { ClipboardList } from 'lucide-react';
import { CareTeamCard } from '../components/CareTeamCard';

export function ClinicianSummary({ analysis }: { analysis: RiskAnalysisResult | null }) {
  const [actionMessage, setActionMessage] = useState('');
  const abnormal = biomarkers.filter((item) => ['high risk', 'low', 'moderate'].includes(item.status)).slice(0, 5);

  return (
    <div className="space-y-6">
      <PageHero icon={ClipboardList} title="Clinician Summary" explanation="A doctor-friendly report that organizes your key health information before a visit." actions={['Review top concerns', 'Check care team details', 'Export or share report']} />
      <div className="card flex flex-col justify-between gap-4 p-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-black text-navy">Doctor-Friendly Visit Summary</h1>
          <p className="mt-2 text-slate-600">{patientProfile.name}, age {patientProfile.age} · Primary focus: {patientProfile.primaryJoint}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => setActionMessage(analysis ? 'Clinician summary PDF generated in the demo export queue.' : 'Enter testing data and run analysis before exporting a complete clinician summary.')}><Download className="h-4 w-4" /> Export PDF</Button>
          <Button onClick={() => setActionMessage(analysis ? 'Secure provider-share request prepared for Northlake Orthopedics.' : 'Run analysis first so the provider summary includes current score and risk drivers.') }><Share2 className="h-4 w-4" /> Share with Provider</Button>
        </div>
      </div>
      {actionMessage && <div className="rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-700">{actionMessage}</div>}
      <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <div className="card p-6">
          <h2 className="text-xl font-black text-navy">Patient Overview</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="grid grid-cols-[1fr_auto] gap-3"><dt className="text-slate-500">OA Chance Score</dt><dd className="text-safe text-right font-bold text-navy">{analysis ? `${analysis.score}%` : 'Not run'}</dd></div>
            <div className="grid grid-cols-[1fr_auto] gap-3"><dt className="text-slate-500">Disease Stage</dt><dd className="text-safe text-right font-bold text-navy">{analysis ? analysis.category : 'Pending analysis'}</dd></div>
            <div className="grid grid-cols-[1fr_auto] gap-3"><dt className="text-slate-500">Symptom Trend</dt><dd className="text-safe text-right font-bold text-navy">{analysis ? `${analysis.inputs.symptomSeverity}/100 severity input` : 'Pending input'}</dd></div>
            <div className="grid grid-cols-[1fr_auto] gap-3"><dt className="text-slate-500">Care Team</dt><dd className="text-safe text-right font-bold text-navy">{patientProfile.careTeam}</dd></div>
          </dl>
          <div className="mt-5"><ProgressBar value={76} label="Treatment adherence" /></div>
        </div>
        <div className="card p-6">
          <h2 className="text-xl font-black text-navy">Key Risk Factors And Recent Abnormal Markers</h2>
          {!analysis && <p className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm font-semibold text-amber-800">Current risk factors will populate after Comprehensive Testing analysis is run.</p>}
          {analysis && (
            <div className="mt-4 flex flex-wrap gap-2">
              {analysis.drivers.map((driver) => <span key={driver} className="rounded-full bg-lavender px-3 py-1.5 text-xs font-bold text-violet">{driver}</span>)}
            </div>
          )}
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {abnormal.map((item) => (
              <div key={item.name} className="rounded-2xl bg-slate-50 p-4">
                <p className="font-bold text-navy">{item.name}</p>
                <p className="text-sm text-slate-600">{item.value} {item.unit} · ideal {item.idealRange}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CareTeamCard />
      <div className="card p-6">
        <h2 className="text-2xl font-black text-navy">Doctor Quick View</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {[
            ['Top concerns', analysis?.drivers.slice(0, 3).join(', ') || 'Pending analysis'],
            ['Latest OA Chance Score', analysis ? `${analysis.score}%` : 'Not run'],
            ['Abnormal markers', abnormal.slice(0, 3).map((item) => item.name).join(', ')],
            ['Missed treatments', `${treatmentCalendarEvents.filter((event) => event.status === 'missed').length} task`],
            ['Upcoming appointment', 'Clinician review on May 28 at 2:30 PM'],
            ['Patient questions', 'Medication safety, physical therapy level, follow-up labs'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-lavender p-4">
              <p className="text-sm font-bold text-slate-600">{label}</p>
              <p className="text-safe mt-1 text-lg font-black text-navy">{value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="card p-6">
        <h2 className="text-2xl font-black text-navy">Insurance And Consent</h2>
        <dl className="mt-4 grid gap-3 md:grid-cols-2">
          {[
            ['Insurance provider', insuranceProfile.provider],
            ['Member ID', insuranceProfile.memberId],
            ['Preferred hospital', careTeamProfile.preferredHospital],
            ['Primary care physician', careTeamProfile.primaryCarePhysician],
            ['Current specialists', `${careTeamProfile.orthopedicDoctor}; ${careTeamProfile.physicalTherapist}`],
            ['Patient consent status', careTeamProfile.consentToShare ? 'Consent on file for mock sharing' : 'No sharing consent'],
            ['Latest shared date', careTeamProfile.lastSharedSummary],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-lavender p-4">
              <dt className="text-sm font-bold text-slate-600">{label}</dt>
              <dd className="text-safe mt-1 text-lg font-black text-navy">{value}</dd>
            </div>
          ))}
        </dl>
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
        {items.map((item) => <li key={item} className="rounded-2xl bg-slate-50 p-3">{item}</li>)}
      </ul>
    </div>
  );
}
