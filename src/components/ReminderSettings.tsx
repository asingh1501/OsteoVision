import { BellRing } from 'lucide-react';
import { useState } from 'react';
import { reminderPreferences } from '../data/mockData';

export function ReminderSettings() {
  const [method, setMethod] = useState(reminderPreferences.method);
  const [timing, setTiming] = useState(reminderPreferences.timing);
  const [caregiver, setCaregiver] = useState(reminderPreferences.caregiverContact);

  return (
    <section className="card p-6">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-lavender p-3 text-violet"><BellRing className="h-7 w-7" /></div>
        <div>
          <h2 className="text-2xl font-black text-navy">Reminder Settings</h2>
          <p className="mt-1 text-base text-slate-600">Mock reminder settings for app, text, email, or caregiver notifications.</p>
        </div>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <label className="block">
          <span className="text-base font-bold text-navy">Reminder method</span>
          <select value={method} onChange={(event) => setMethod(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-base font-bold">
            <option>App notification</option>
            <option>Text message placeholder</option>
            <option>Email placeholder</option>
            <option>Caregiver notification placeholder</option>
          </select>
        </label>
        <label className="block">
          <span className="text-base font-bold text-navy">Reminder timing</span>
          <select value={timing} onChange={(event) => setTiming(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-base font-bold">
            <option>15 minutes before</option>
            <option>1 hour before</option>
            <option>Morning summary</option>
            <option>Evening summary</option>
          </select>
        </label>
        <label className="block">
          <span className="text-base font-bold text-navy">Caregiver contact</span>
          <input value={caregiver} onChange={(event) => setCaregiver(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-base font-bold" />
        </label>
      </div>
    </section>
  );
}
