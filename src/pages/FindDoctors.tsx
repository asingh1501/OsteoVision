import { CheckCircle2, Phone, Plus, Search, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '../components/Button';
import { doctors } from '../data/mockData';

const specialties = ['All', 'Orthopedics', 'Rheumatology', 'Physical Therapy', 'Clinical Nutrition', 'Functional Medicine', 'Endocrinology'];

export function FindDoctors() {
  const [specialty, setSpecialty] = useState('All');
  const [sort, setSort] = useState('distance');
  const [providerSearch, setProviderSearch] = useState('');
  const [careTeam, setCareTeam] = useState<string[]>([]);
  const filtered = useMemo(() => doctors
    .filter((doctor) => specialty === 'All' || doctor.specialty === specialty)
    .filter((doctor) => [doctor.name, doctor.specialty, doctor.clinic].join(' ').toLowerCase().includes(providerSearch.toLowerCase()))
    .sort((a, b) => sort === 'rating' ? b.rating - a.rating : a.distance - b.distance), [specialty, sort, providerSearch]);
  const searchedProviderInArea = providerSearch.length > 1 && filtered.length > 0;

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="text-2xl font-black text-navy">Recommended Specialties Based On Latest Results</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {specialties.slice(1).map((item) => <span key={item} className="rounded-full bg-lavender px-3 py-1.5 text-sm font-bold text-violet">{item}</span>)}
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <select value={specialty} onChange={(event) => setSpecialty(event.target.value)} className="rounded-xl border border-violet/20 bg-white p-3 font-semibold text-navy">
            {specialties.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-xl border border-violet/20 bg-white p-3 font-semibold text-navy">
            <option value="distance">Sort by distance</option>
            <option value="rating">Sort by rating</option>
          </select>
        </div>
      </div>
      <div className="card p-6">
        <h2 className="text-xl font-black text-navy">Add Doctor To Care Team</h2>
        <p className="mt-2 text-sm text-slate-600">Prototype rule: a provider must appear in the local area results before they can be added to the care team.</p>
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-violet/20 bg-white px-4 py-3">
          <Search className="h-5 w-5 text-slate-400" />
          <input value={providerSearch} onChange={(event) => setProviderSearch(event.target.value)} className="w-full outline-none" placeholder="Search provider name, clinic, or specialty before adding" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {careTeam.length === 0 ? (
            <span className="text-sm font-semibold text-slate-500">No added providers yet.</span>
          ) : careTeam.map((name) => (
            <span key={name} className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-700"><CheckCircle2 className="h-4 w-4" /> {name}</span>
          ))}
        </div>
        {providerSearch.length > 1 && !searchedProviderInArea && <p className="mt-3 text-sm font-semibold text-rose-600">Provider not found in the local area list. Add is unavailable until the provider is verified in area results.</p>}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((doctor) => (
          <div key={doctor.name} className="card p-5">
            <h3 className="text-xl font-black text-navy">{doctor.name}</h3>
            <p className="font-semibold text-violet">{doctor.specialty}</p>
            <p className="mt-3 text-sm text-slate-600">{doctor.clinic}</p>
            <div className="mt-4 flex items-center justify-between text-sm font-bold text-navy">
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {doctor.rating}</span>
              <span>{doctor.distance} mi</span>
            </div>
            <p className="mt-3 flex items-center gap-2 text-sm text-slate-600"><Phone className="h-4 w-4" /> {doctor.phone}</p>
            <div className="mt-5 grid gap-2 md:grid-cols-2">
              <Button>Contact</Button>
              <Button
                variant="secondary"
                disabled={careTeam.includes(doctor.name)}
                onClick={() => setCareTeam((prev) => prev.includes(doctor.name) ? prev : [...prev, doctor.name])}
              >
                <Plus className="h-4 w-4" />
                {careTeam.includes(doctor.name) ? 'Added' : 'Add'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
