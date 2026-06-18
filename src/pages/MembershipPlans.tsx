import { Check, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/Button';
import { PageHero } from '../components/PageHero';

const features = ['Comprehensive diagnostic testing support', 'OA Chance Score calculator', 'Unlimited testing history', 'Medical report upload', 'Drug genetic testing database', 'Personalized treatment plans', 'Phlebotomist/RN scheduling demo', 'Early trend alerts', 'Clinician-ready summaries', 'Educational resources', 'Provider recommendations', 'Treatment effectiveness tracking', 'Multi-disease expansion roadmap demo'];
const monthlyPrice = '$250';
const annualPrice = '$2,800';

export function MembershipPlans() {
  const [selectedPlan, setSelectedPlan] = useState('');

  return (
    <div className="space-y-6">
      <PageHero icon={CreditCard} title="OsteoVision Membership" explanation="Choose a plan for connected monitoring, reminders, and clinician-ready summaries." actions={['Compare plans', 'Review included features', 'Choose monthly or annual']} />
      <div className="surface-panel rounded-2xl p-8">
        <h1 className="text-safe text-3xl font-black md:text-4xl">OsteoVision Membership</h1>
        <p className="mt-3 max-w-3xl text-slate-600">Complete access to connected osteoarthritis monitoring, personalized care planning, and clinician-ready insights.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6 ring-2 ring-violet">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-black text-navy">Annual</h2>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-base font-black text-emerald-700">Save $200/year</span>
          </div>
          <p className="text-safe mt-4 text-4xl font-black text-navy md:text-5xl">{annualPrice}<span className="text-base text-slate-500">/year</span></p>
          <p className="mt-3 text-lg font-bold text-slate-700">A slight discount from $3,000/year if paid monthly.</p>
          <Button className="mt-6 w-full" onClick={() => setSelectedPlan(`${annualPrice} annual membership selected. Mock checkout is ready for the HOSA demo.`)}>Subscribe Annual</Button>
        </div>
        <div className="card p-6">
          <h2 className="text-2xl font-black text-navy">Monthly</h2>
          <p className="text-safe mt-4 text-4xl font-black text-navy md:text-5xl">{monthlyPrice}<span className="text-base text-slate-500">/month</span></p>
          <p className="mt-3 text-lg font-bold text-slate-700">$3,000/year if paid monthly for 12 months.</p>
          <Button className="mt-6 w-full" variant="secondary" onClick={() => setSelectedPlan(`${monthlyPrice} monthly membership selected. Mock checkout is ready for the HOSA demo.`)}>Subscribe Monthly</Button>
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
