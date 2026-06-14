import { Beaker, CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, ClipboardList, Dumbbell, Hospital, Pill, RotateCcw, TestTube, Waves } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { TreatmentCalendarEvent } from '../types';
import { treatmentCalendarEvents } from '../data/mockData';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';

const categoryIcon = {
  supplement: Pill,
  therapy: Dumbbell,
  exercise: Dumbbell,
  test: TestTube,
  appointment: Hospital,
  lifestyle: Waves,
  'check-in': ClipboardList,
};

const statusStyles = {
  pending: 'bg-amber-100 text-amber-900 border-amber-300',
  completed: 'bg-emerald-100 text-emerald-900 border-emerald-300',
  missed: 'bg-rose-100 text-rose-900 border-rose-300',
  upcoming: 'bg-lavender text-violet border-violet',
};

export function TreatmentCalendar() {
  const [monthOffset, setMonthOffset] = useState(0);
  const [events, setEvents] = useState<TreatmentCalendarEvent[]>(treatmentCalendarEvents);
  const [selected, setSelected] = useState<TreatmentCalendarEvent | null>(null);
  const today = new Date('2026-05-15T12:00:00');
  const visible = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const monthName = visible.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(visible.getFullYear(), visible.getMonth() + 1, 0).getDate();
  const startDay = new Date(visible.getFullYear(), visible.getMonth(), 1).getDay();
  const cells = [...Array(startDay).fill(null), ...Array.from({ length: daysInMonth }, (_, index) => index + 1)];
  const completed = events.filter((event) => event.status === 'completed').length;
  const weekEvents = events.filter((event) => Number(event.date.slice(-2)) >= 15 && Number(event.date.slice(-2)) <= 22);

  const byDay = useMemo(() => {
    const map: Record<number, TreatmentCalendarEvent[]> = {};
    events.forEach((event) => {
      const date = new Date(`${event.date}T12:00:00`);
      if (date.getMonth() === visible.getMonth() && date.getFullYear() === visible.getFullYear()) {
        const day = date.getDate();
        map[day] = [...(map[day] ?? []), event];
      }
    });
    return map;
  }, [events, visible]);

  const markComplete = (id: number) => {
    setEvents((current) => current.map((event) => event.id === id ? { ...event, status: 'completed' } : event));
    setSelected((current) => current && current.id === id ? { ...current, status: 'completed' } : current);
  };

  return (
    <section className="card p-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-lavender p-3 text-violet"><CalendarDays className="h-8 w-8" /></div>
          <div>
            <h2 className="text-2xl font-black text-navy">Your Treatment Calendar</h2>
            <p className="text-base text-slate-600">See exactly what to do and when.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => setMonthOffset((value) => value - 1)}><ChevronLeft /> Previous</Button>
          <Button variant="secondary" onClick={() => setMonthOffset(0)}>Today</Button>
          <Button variant="secondary" onClick={() => setMonthOffset((value) => value + 1)}>Next <ChevronRight /></Button>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
        <div className="min-w-[760px]">
          <div className="border-b border-slate-200 bg-lavender p-4 text-center text-2xl font-black text-navy">{monthName}</div>
          <div className="grid grid-cols-7 border-b border-slate-200 bg-white text-center text-base font-black text-slate-700">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <div key={day} className="p-2">{day}</div>)}
          </div>
          <div className="grid grid-cols-7">
            {cells.map((day, index) => (
              <div key={`${day}-${index}`} className={`min-h-32 border-b border-r border-slate-200 p-2 ${day === today.getDate() && monthOffset === 0 ? 'bg-amber-50' : 'bg-white'}`}>
                {day && <div className="mb-2 text-lg font-black text-navy">{day}</div>}
                <div className="space-y-1">
                  {day && byDay[day]?.slice(0, 2).map((event) => {
                    const Icon = categoryIcon[event.category];
                    return (
                      <button key={event.id} onClick={() => setSelected(event)} className={`focus-ring w-full rounded-lg border px-2 py-1 text-left text-sm font-bold leading-5 ${statusStyles[event.status]}`}>
                        <span className="flex items-center gap-1"><Icon className="h-4 w-4 shrink-0" /> <span className="text-safe">{event.time}</span></span>
                        <span className="text-safe block">{event.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_0.8fr]">
        <div>
          <h3 className="mb-3 text-xl font-black text-navy">This Week's Tasks</h3>
          <div className="space-y-3">
            {weekEvents.map((event) => <CalendarEventCard key={event.id} event={event} onOpen={() => setSelected(event)} />)}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
            <h3 className="text-lg font-black text-rose-900">Missed Tasks Alert</h3>
            <p className="mt-1 text-base text-rose-800">{events.filter((event) => event.status === 'missed').length} task needs attention. You can mark it complete or ask your care team.</p>
          </div>
          <div className="rounded-2xl border border-violet bg-lavender p-4">
            <h3 className="text-lg font-black text-navy">Upcoming Reminders</h3>
            <p className="mt-1 text-base text-slate-700">{events.find((event) => event.status === 'upcoming')?.title} is next.</p>
          </div>
          <ProgressBar value={Math.round((completed / events.length) * 100)} label="Completed this week" />
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-black text-navy">{selected.title}</h3>
                <p className="mt-1 text-base font-bold text-violet">{selected.time} · {selected.frequency}</p>
              </div>
              <button className="focus-ring rounded-lg border border-slate-300 px-3 py-2 font-bold" onClick={() => setSelected(null)}>Close</button>
            </div>
            <div className="mt-4 space-y-3 text-base leading-7 text-slate-700">
              <p><strong>Why it matters:</strong> {selected.why}</p>
              <p><strong>Instructions:</strong> {selected.instructions}</p>
              <p><strong>Status:</strong> {selected.status}</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button onClick={() => markComplete(selected.id)}><CheckCircle2 /> Mark Complete</Button>
              <Button variant="secondary"><RotateCcw /> Remind Me Later</Button>
              <Button variant="secondary"><Beaker /> Ask Doctor</Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function CalendarEventCard({ event, onOpen }: { event: TreatmentCalendarEvent; onOpen: () => void }) {
  const Icon = categoryIcon[event.category];
  return (
    <button onClick={onOpen} className="focus-ring flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left hover:bg-lavender">
      <div className="rounded-xl bg-lavender p-3 text-violet"><Icon className="h-6 w-6" /></div>
      <div className="min-w-0 flex-1">
        <p className="text-safe text-lg font-black text-navy">{event.title}</p>
        <p className="text-safe text-base text-slate-600">{event.date} · {event.time}</p>
      </div>
      <span className={`shrink-0 rounded-full border px-3 py-1 text-sm font-black ${statusStyles[event.status]}`}>{event.status}</span>
    </button>
  );
}
