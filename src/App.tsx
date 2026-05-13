import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { ClinicianSummary } from './pages/ClinicianSummary';
import { ComprehensiveTesting } from './pages/ComprehensiveTesting';
import { Dashboard } from './pages/Dashboard';
import { DrugGeneticTesting } from './pages/DrugGeneticTesting';
import { EducationResources } from './pages/EducationResources';
import { FindDoctors } from './pages/FindDoctors';
import { MembershipPlans } from './pages/MembershipPlans';
import { OAChanceScore } from './pages/OAChanceScore';
import { TestHistory } from './pages/TestHistory';
import { TreatmentEffectiveness } from './pages/TreatmentEffectiveness';
import { TreatmentPlan } from './pages/TreatmentPlan';
import type { PageId, RiskAnalysisResult } from './types';

const pageLabels: Record<PageId, string> = {
  dashboard: 'Dashboard',
  testing: 'Comprehensive Testing',
  score: 'OA Chance Score',
  history: 'Test History',
  plan: 'Treatment Plan',
  effectiveness: 'Treatment Effectiveness',
  drugs: 'Drug Genetic Testing',
  doctors: 'Find Doctors',
  education: 'Educational Resources',
  membership: 'Membership Plans',
  clinician: 'Clinician Summary',
};

function App() {
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const [riskAnalysis, setRiskAnalysis] = useState<RiskAnalysisResult | null>(null);

  const handleAnalysisComplete = (result: RiskAnalysisResult) => {
    setRiskAnalysis(result);
    setActivePage('score');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'testing': return <ComprehensiveTesting onAnalysisComplete={handleAnalysisComplete} />;
      case 'score': return <OAChanceScore analysis={riskAnalysis} onEditInputs={() => setActivePage('testing')} />;
      case 'history': return <TestHistory />;
      case 'plan': return <TreatmentPlan />;
      case 'effectiveness': return <TreatmentEffectiveness />;
      case 'drugs': return <DrugGeneticTesting />;
      case 'doctors': return <FindDoctors />;
      case 'education': return <EducationResources />;
      case 'membership': return <MembershipPlans />;
      case 'clinician': return <ClinicianSummary />;
      default: return <Dashboard onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <Sidebar activePage={activePage} onNavigate={setActivePage} />
        <main className="min-w-0 flex-1">
          <Topbar activePage={activePage} />
          <div className="border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
            <select
              value={activePage}
              onChange={(event) => setActivePage(event.target.value as PageId)}
              className="w-full rounded-xl border border-slate-300 bg-white p-3 font-bold text-navy"
            >
              {Object.entries(pageLabels).map(([id, label]) => <option key={id} value={id}>{label}</option>)}
            </select>
          </div>
          <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
