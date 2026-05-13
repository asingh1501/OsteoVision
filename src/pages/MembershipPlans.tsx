import { Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/Button';

const features = ['Comprehensive diagnostic testing support', 'OA Chance Score calculator', 'Unlimited testing history', 'Medical report upload', 'Drug genetic testing database', 'Personalized treatment plans', 'Phlebotomist/RN scheduling placeholder', 'Early detection alerts', 'Clinician-ready summaries', 'Educational resources', 'Provider recommendations', 'Treatment effectiveness tracking', 'Multi-disease expansion roadmap placeholder'];

export function MembershipPlans() {
  const [selectedPlan, setSelectedPlan] = useState('');

  return (
    <div className="space-y-6">
      <div className="gradient-panel rounded-2xl p-8">
        <h1 className="text-4xl font-black">OsteoVision Membership</h1>
        <p className="mt-3 max-w-3xl text-slate-600">Complete access to connected osteoarthritis monitoring, personalized care planning, and clinician-ready insights.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6 ring-2 ring-violet/20">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-black text-navy">Annual</h2>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">Save $33/year</span>
          </div>
          <p className="mt-4 text-5xl font-black text-navy">$267<span className="text-base text-slate-500">/year</span></p>
          <Button className="mt-6 w-full" onClick={() => setSelectedPlan('Annual membership selected. Mock checkout is ready for the HOSA demo.')}>Subscribe Annual</Button>
        </div>
        <div className="card p-6">
          <h2 className="text-2xl font-black text-navy">Monthly</h2>
          <p className="mt-4 text-5xl font-black text-navy">$25<span className="text-base text-slate-500">/month</span></p>
          <Button className="mt-6 w-full" variant="secondary" onClick={() => setSelectedPlan('Monthly membership selected. Mock checkout is ready for the HOSA demo.')}>Subscribe Monthly</Button>
        </div>
      </div>
      {selectedPlan && <div className="rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-700">{selectedPlan}</div>}
      <div className="card p-6">
        <h2 className="mb-4 text-xl font-black text-navy">Included Features</h2>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => <div key={feature} className="flex items-center gap-2 text-sm font-semibold text-slate-700"><Check className="h-5 w-5 text-violet" /> {feature}</div>)}
        </div>
      </div>
    </div>
  );
}
