import { CheckCircle2, ClipboardList, HeartHandshake, Hospital, ShieldCheck, UserRound } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { Button } from '../components/Button';
import type { OnboardingProfile } from '../types';

const steps = ['Patient Info', 'Insurance', 'Hospital & Doctors', 'Medical Background', 'Review'];
const joints = ['Knee', 'Hip', 'Hand', 'Spine', 'Shoulder', 'Other'];

const emptyProfile: OnboardingProfile = {
  fullName: 'Maya Thompson',
  age: '',
  dateOfBirth: '',
  phone: '',
  email: 'maya.thompson@example.com',
  emergencyContactName: '',
  emergencyContactPhone: '',
  insuranceProvider: '',
  memberId: '',
  groupNumber: '',
  policyHolderName: '',
  relationshipToPolicyHolder: 'Self',
  insurancePhone: '',
  primaryCarePhysician: '',
  physicianClinic: '',
  physicianPhone: '',
  physicianEmail: '',
  preferredHospital: '',
  portalUsername: '',
  organizeRecords: true,
  consentToShare: true,
  orthopedicDoctor: '',
  rheumatologist: '',
  physicalTherapist: '',
  nutritionist: '',
  diagnosisStatus: 'At risk',
  affectedJoints: ['Knee'],
  currentMedications: '',
  allergies: '',
  majorConditions: '',
  recentTests: '',
};

export function OnboardingHealthProfile({ onComplete, onSkip }: { onComplete: (profile: OnboardingProfile) => void; onSkip: () => void }) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<OnboardingProfile>(emptyProfile);
  const update = (key: keyof OnboardingProfile, value: string | boolean | string[]) => setProfile((current) => ({ ...current, [key]: value }));
  const progress = Math.round(((step + 1) / steps.length) * 100);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-navy md:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="card p-6 md:p-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-lavender p-4 text-violet"><HeartHandshake className="h-9 w-9" /></div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet">Integrated healthcare setup</p>
                <h1 className="text-safe mt-2 text-3xl font-black">Set up your health profile</h1>
                <p className="text-safe mt-2 text-lg leading-8 text-slate-700">This helps your doctor understand your care history faster.</p>
              </div>
            </div>
            <Button variant="secondary" onClick={onSkip}>Skip for now</Button>
          </div>
          <div className="mt-6">
            <div className="mb-2 flex justify-between text-base font-bold"><span>Step {step + 1} of {steps.length}: {steps[step]}</span><span>{progress}%</span></div>
            <div className="h-4 rounded-full bg-lavender"><div className="h-full rounded-full bg-violet" style={{ width: `${progress}%` }} /></div>
          </div>
          <p className="mt-4 rounded-2xl border border-violet bg-lavender p-4 text-base font-bold text-navy">Prototype integration only — no real medical data is transmitted.</p>
        </section>

        <section className="card p-6">
          {step === 0 && <Step icon={UserRound} title="Patient Information">
            <Field label="Full name" value={profile.fullName} onChange={(value) => update('fullName', value)} />
            <Field label="Age" type="number" value={profile.age} onChange={(value) => update('age', value)} />
            <Field label="Date of birth" type="date" value={profile.dateOfBirth} onChange={(value) => update('dateOfBirth', value)} />
            <Field label="Phone number" value={profile.phone} onChange={(value) => update('phone', value)} />
            <Field label="Email" value={profile.email} onChange={(value) => update('email', value)} />
            <Field label="Emergency contact name" value={profile.emergencyContactName} onChange={(value) => update('emergencyContactName', value)} />
            <Field label="Emergency contact phone" value={profile.emergencyContactPhone} onChange={(value) => update('emergencyContactPhone', value)} />
          </Step>}
          {step === 1 && <Step icon={ShieldCheck} title="Health Insurance Information">
            <Field label="Insurance provider name" value={profile.insuranceProvider} onChange={(value) => update('insuranceProvider', value)} />
            <Field label="Member ID" value={profile.memberId} onChange={(value) => update('memberId', value)} />
            <Field label="Group number" value={profile.groupNumber} onChange={(value) => update('groupNumber', value)} />
            <Field label="Policy holder name" value={profile.policyHolderName} onChange={(value) => update('policyHolderName', value)} />
            <Field label="Relationship to policy holder" value={profile.relationshipToPolicyHolder} onChange={(value) => update('relationshipToPolicyHolder', value)} />
            <Field label="Insurance phone number" value={profile.insurancePhone} onChange={(value) => update('insurancePhone', value)} />
            <button className="focus-ring rounded-2xl border border-violet bg-lavender p-4 text-left text-lg font-black text-violet">Upload insurance card demo</button>
          </Step>}
          {step === 2 && <Step icon={Hospital} title="Primary Care / Hospital Integration">
            <Field label="Primary care physician name" value={profile.primaryCarePhysician} onChange={(value) => update('primaryCarePhysician', value)} />
            <Field label="Physician clinic/hospital name" value={profile.physicianClinic} onChange={(value) => update('physicianClinic', value)} />
            <Field label="Physician phone number" value={profile.physicianPhone} onChange={(value) => update('physicianPhone', value)} />
            <Field label="Physician email or portal email" value={profile.physicianEmail} onChange={(value) => update('physicianEmail', value)} />
            <Field label="Preferred hospital or health system" value={profile.preferredHospital} onChange={(value) => update('preferredHospital', value)} />
            <Field label="Patient portal username" value={profile.portalUsername} onChange={(value) => update('portalUsername', value)} />
            <Checkbox label="I want OsteoVision to help organize my records for my physician" checked={profile.organizeRecords} onChange={(value) => update('organizeRecords', value)} />
            <Checkbox label="I consent to share my OsteoVision summaries with my selected healthcare provider" checked={profile.consentToShare} onChange={(value) => update('consentToShare', value)} />
            <Field label="Orthopedic doctor" value={profile.orthopedicDoctor} onChange={(value) => update('orthopedicDoctor', value)} />
            <Field label="Rheumatologist" value={profile.rheumatologist} onChange={(value) => update('rheumatologist', value)} />
            <Field label="Physical therapist" value={profile.physicalTherapist} onChange={(value) => update('physicalTherapist', value)} />
            <Field label="Nutritionist or other provider" value={profile.nutritionist} onChange={(value) => update('nutritionist', value)} />
          </Step>}
          {step === 3 && <Step icon={ClipboardList} title="Medical Background">
            <label className="block">
              <span className="text-lg font-black text-navy">Current osteoarthritis status</span>
              <select value={profile.diagnosisStatus} onChange={(event) => update('diagnosisStatus', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 p-3 text-lg font-bold">
                {['Not diagnosed', 'At risk', 'Suspected', 'Diagnosed', 'Post-surgery / joint replacement'].map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <div className="md:col-span-2">
              <p className="mb-2 text-lg font-black text-navy">Affected joints</p>
              <div className="grid gap-2 sm:grid-cols-3">
                {joints.map((joint) => <Checkbox key={joint} label={joint} checked={profile.affectedJoints.includes(joint)} onChange={(checked) => update('affectedJoints', checked ? [...profile.affectedJoints, joint] : profile.affectedJoints.filter((item) => item !== joint))} />)}
              </div>
            </div>
            <Field label="Current medications" value={profile.currentMedications} onChange={(value) => update('currentMedications', value)} />
            <Field label="Allergies" value={profile.allergies} onChange={(value) => update('allergies', value)} />
            <Field label="Major health conditions" value={profile.majorConditions} onChange={(value) => update('majorConditions', value)} />
            <Field label="Recent imaging or lab tests" value={profile.recentTests} onChange={(value) => update('recentTests', value)} />
          </Step>}
          {step === 4 && <div>
            <div className="flex items-center gap-3"><CheckCircle2 className="h-9 w-9 text-emerald-600" /><h2 className="text-3xl font-black text-navy">Review and continue</h2></div>
            <p className="mt-3 text-lg leading-8 text-slate-700">Your mock care profile is ready. You can update this information later from the care team area.</p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {['Patient details saved', 'Insurance details organized', 'Doctor and hospital info ready', 'Medical background started'].map((item) => <div key={item} className="rounded-2xl bg-lavender p-4 text-lg font-black text-navy">{item}</div>)}
            </div>
          </div>}
        </section>

        <div className="flex flex-wrap justify-between gap-3">
          <Button variant="secondary" disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}>Back</Button>
          {step < steps.length - 1 ? <Button onClick={() => setStep((value) => value + 1)}>Next</Button> : <Button onClick={() => onComplete(profile)}>Finish setup</Button>}
        </div>
      </div>
    </main>
  );
}

function Step({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-2xl bg-lavender p-3 text-violet"><Icon className="h-7 w-7" /></div>
        <h2 className="text-2xl font-black text-navy">{title}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="text-lg font-black text-navy">{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 p-3 text-lg font-bold outline-none focus:border-violet focus:ring-4 focus:ring-violet" />
    </label>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 text-base font-bold text-navy">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="mt-1 h-5 w-5" />
      <span className="text-safe">{label}</span>
    </label>
  );
}
