import { BookOpen, PlayCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/Button';
import { educationResources } from '../data/mockData';

export function EducationResources() {
  const [selectedTitle, setSelectedTitle] = useState('');
  const articles = educationResources.filter((item) => item.type === 'article');
  const videos = educationResources.filter((item) => item.type === 'video');
  const selected = educationResources.find((item) => item.title === selectedTitle);

  return (
    <div className="space-y-6">
      {selected && (
        <div className="card p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <span className="rounded-full bg-slate-50 px-3 py-1.5 text-sm font-bold text-cyan">{selected.category}</span>
              <h2 className="mt-3 text-2xl font-black text-navy">{selected.title}</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-600">{selected.description} This demo resource gives patients plain-language context and prompts them to review personal care decisions with a licensed clinician.</p>
            </div>
            <Button variant="secondary" onClick={() => setSelectedTitle('')}>Close</Button>
          </div>
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {articles.map((item) => (
          <div key={item.title} className="card p-5">
            <BookOpen className="h-7 w-7 text-cyan" />
            <span className="mt-4 inline-flex rounded-full bg-slate-50 px-2.5 py-1 text-xs font-bold text-cyan">{item.category}</span>
            <h3 className="mt-3 text-lg font-black text-navy">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500">{item.readTime}</span>
              <Button variant="secondary" onClick={() => setSelectedTitle(item.title)}>Read Article</Button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2 className="mb-4 text-xl font-black text-navy">Video Resources</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {videos.map((item) => (
            <button key={item.title} onClick={() => setSelectedTitle(item.title)} className="card flex items-center gap-4 p-5 text-left transition hover:-translate-y-0.5 hover:shadow-xl">
              <div className="rounded-xl bg-slate-100 p-4 text-cyan"><PlayCircle className="h-8 w-8" /></div>
              <div>
                <h3 className="text-lg font-black text-navy">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.description}</p>
                <p className="mt-2 text-sm font-bold text-cyan">{item.readTime}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
