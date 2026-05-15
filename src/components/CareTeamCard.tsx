import { Download, Hospital, Share2, UserRoundCog } from 'lucide-react';
import { careTeamProfile } from '../data/mockData';
import { Button } from './Button';

export function CareTeamCard() {
  return (
    <section className="card p-6">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-lavender p-3 text-violet">
          <Hospital className="h-7 w-7" />
        </div>
        <div>
          <h2 className="text-safe text-2xl font-black text-navy">Connected Care Team</h2>
          <p className="mt-1 text-base text-slate-600">Prototype integration only. No real medical data is transmitted.</p>
        </div>
      </div>
      <dl className="mt-5 grid gap-3 text-base md:grid-cols-2">
        {[
          ['Primary Care Physician', careTeamProfile.primaryCarePhysician],
          ['Preferred Hospital', careTeamProfile.preferredHospital],
          ['Orthopedic Specialist', careTeamProfile.orthopedicDoctor],
          ['Physical Therapist', careTeamProfile.physicalTherapist],
          ['Insurance Provider', careTeamProfile.insuranceProvider],
          ['Integration Status', careTeamProfile.integrationStatus],
          ['Last Shared Summary', careTeamProfile.lastSharedSummary],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl bg-lavender p-3">
            <dt className="text-sm font-bold text-slate-600">{label}</dt>
            <dd className="text-safe mt-1 font-black text-navy">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button variant="secondary"><Share2 /> Share Summary With Doctor</Button>
        <Button variant="secondary"><UserRoundCog /> Update Care Team</Button>
        <Button variant="secondary"><Download /> Download Visit Report</Button>
      </div>
    </section>
  );
}
