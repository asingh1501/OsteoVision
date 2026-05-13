import { BookOpen, PlayCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { educationResources } from '../data/mockData';

export function EducationResources() {
  const articles = educationResources.filter((item) => item.type === 'article');
  const videos = educationResources.filter((item) => item.type === 'video');

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {articles.map((item) => (
          <div key={item.title} className="card p-5">
            <BookOpen className="h-7 w-7 text-violet" />
            <span className="mt-4 inline-flex rounded-full bg-lavender px-2.5 py-1 text-xs font-bold text-violet">{item.category}</span>
            <h3 className="mt-3 text-lg font-black text-navy">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500">{item.readTime}</span>
              <Button variant="secondary">Read Article</Button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2 className="mb-4 text-xl font-black text-navy">Video Resources</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {videos.map((item) => (
            <div key={item.title} className="card flex items-center gap-4 p-5">
              <div className="rounded-2xl bg-gradient-to-br from-cyan to-violet p-4 text-white"><PlayCircle className="h-8 w-8" /></div>
              <div>
                <h3 className="text-lg font-black text-navy">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.description}</p>
                <p className="mt-2 text-sm font-bold text-violet">{item.readTime}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
