import { ArrowRight, LockKeyhole, Mail, ShieldCheck, Stethoscope } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/Button';
import { DisclaimerBox } from '../components/DisclaimerBox';

export function LoginPage({ onLogin }: { onLogin: (name: string) => void }) {
  const [email, setEmail] = useState('maya.thompson@example.com');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'patient' | 'clinician'>('patient');
  const [mode, setMode] = useState<'sign-in' | 'create'>('sign-in');
  const [error, setError] = useState('');

  const submit = () => {
    if (!email.trim()) {
      setError('Enter an email address to continue.');
      return;
    }
    setError('');
    onLogin(role === 'patient' ? 'Maya Thompson' : 'Dr. Elena Rao');
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-navy md:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet p-3 text-white">
              <Stethoscope className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl font-black">OsteoVision</h1>
              <p className="text-sm font-semibold text-slate-500">Clinical decision-support platform</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet">Secure care workspace</p>
            <h2 className="text-safe mt-3 text-4xl font-black leading-tight md:text-5xl">
              Connected osteoarthritis monitoring for patients and care teams.
            </h2>
            <p className="text-safe mt-4 max-w-2xl leading-7 text-slate-600">
              Organize testing, symptoms, imaging summaries, medications, treatment adherence, and clinician-ready reports in one clean workflow.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ['Decision support', 'Risk awareness, not diagnosis'],
              ['Longitudinal tracking', 'Compare changes over time'],
              ['Care planning', 'Prepare for clinician visits'],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-safe text-sm font-black text-navy">{title}</p>
                <p className="text-safe mt-1 text-xs leading-5 text-slate-500">{copy}</p>
              </div>
            ))}
          </div>

          <DisclaimerBox compact />
        </section>

        <section className="card p-6 md:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-navy">{mode === 'sign-in' ? 'Sign in' : 'Create account'}</h2>
              <p className="mt-1 text-base text-slate-600">Connected osteoarthritis care for patients and clinicians.</p>
            </div>
            <div className="rounded-xl bg-lavender p-3 text-violet">
              <ShieldCheck className="h-6 w-6" />
            </div>
          </div>

          <div className="mb-5 grid grid-cols-2 gap-2 rounded-xl border border-slate-200 bg-slate-100 p-1">
            <button
              onClick={() => setRole('patient')}
              className={`rounded-lg px-3 py-2 text-sm font-bold transition ${role === 'patient' ? 'bg-white text-violet shadow-sm' : 'text-slate-600 hover:text-navy'}`}
            >
              Patient
            </button>
            <button
              onClick={() => setRole('clinician')}
              className={`rounded-lg px-3 py-2 text-sm font-bold transition ${role === 'clinician' ? 'bg-white text-violet shadow-sm' : 'text-slate-600 hover:text-navy'}`}
            >
              Clinician
            </button>
          </div>

          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-bold text-navy">Email</span>
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 focus-within:border-violet focus-within:ring-2 focus-within:ring-violet">
                <Mail className="h-5 w-5 shrink-0 text-slate-400" />
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent py-1 text-sm font-semibold text-navy outline-none"
                  placeholder="name@example.com"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-bold text-navy">Password</span>
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 focus-within:border-violet focus-within:ring-2 focus-within:ring-violet">
                <LockKeyhole className="h-5 w-5 shrink-0 text-slate-400" />
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent py-1 text-sm font-semibold text-navy outline-none"
                  placeholder="Demo accepts any password"
                  type="password"
                />
              </div>
            </label>

            {error && <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-semibold text-rose-700">{error}</div>}

            <Button className="w-full" onClick={submit}>
              {mode === 'sign-in' ? 'Sign in' : 'Create account'}
              <ArrowRight />
            </Button>
            <button className="focus-ring w-full rounded-xl border border-slate-300 bg-white p-3 text-base font-bold text-violet" onClick={() => setMode(mode === 'sign-in' ? 'create' : 'sign-in')}>
              {mode === 'sign-in' ? 'Create Account' : 'Already have an account? Sign in'}
            </button>
          </div>

          <div className="mt-6 rounded-2xl bg-lavender p-4 text-sm leading-6 text-slate-700">
            <p className="font-bold text-navy">Demo access</p>
            <p className="text-safe mt-1">This prototype uses local mock authentication only. No health information is transmitted.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
