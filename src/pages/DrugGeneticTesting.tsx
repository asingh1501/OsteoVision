import { Dna, Search, ShieldCheck } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '../components/Button';
import { DisclaimerBox } from '../components/DisclaimerBox';
import { RiskBadge } from '../components/RiskBadge';
import { medications } from '../data/mockData';

export function DrugGeneticTesting() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => medications.filter((med) => [med.name, med.category, ...med.genes].join(' ').toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <div className="space-y-6">
      <div className="card p-5">
        <div className="flex items-center gap-3 rounded-2xl border border-violet/20 bg-white px-4 py-3">
          <Search className="h-5 w-5 text-slate-400" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full outline-none" placeholder="Search medication by name, generic name, or category" />
        </div>
        <p className="mt-3 text-sm text-slate-600">Medication effectiveness and side effects can vary based on genetics and medical history. Do not start, stop, or change medications without consulting a licensed clinician.</p>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="gradient-panel rounded-3xl p-6 shadow-soft">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-white/15 p-3">
              <Dna className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan">Expanded medication genetics panel</p>
              <h2 className="mt-2 text-2xl font-black">Wide-Range Drug Response Screening</h2>
              <p className="mt-3 text-white/85">Prototype testing module for reviewing whether inherited gene variants may alter how an individual processes, responds to, or experiences side effects from many medication categories. It supports clinician discussion and does not predict every reaction.</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <h3 className="flex items-center gap-2 text-xl font-black text-navy"><ShieldCheck className="h-6 w-6 text-cyan" /> Panel Coverage Preview</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Pain medications', 'Anti-inflammatories', 'Anticoagulants', 'Antidepressants', 'Cardiology drugs', 'Steroids', 'DMARDs', 'Anesthesia sensitivity'].map((category) => (
              <span key={category} className="rounded-full bg-lavender px-3 py-1.5 text-sm font-bold text-violet">{category}</span>
            ))}
          </div>
          <Button className="mt-5" variant="secondary">Schedule Medication Genetics Test</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((med) => (
          <div key={med.name} className="card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-black text-navy">{med.name}</h3>
                <p className="text-sm font-semibold text-slate-500">{med.category}</p>
              </div>
              <RiskBadge status={med.risk} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {med.genes.map((gene) => <span key={gene} className="rounded-full bg-lavender px-2.5 py-1 text-xs font-bold text-violet">{gene}</span>)}
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{med.concern}</p>
            <Button className="mt-5 w-full" variant="secondary">Discuss with clinician</Button>
          </div>
        ))}
      </div>
      <DisclaimerBox />
    </div>
  );
}
