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
import { LoginPage } from './pages/LoginPage';
import { OnboardingHealthProfile } from './pages/OnboardingHealthProfile';
import { TestHistory } from './pages/TestHistory';
import { TreatmentEffectiveness } from './pages/TreatmentEffectiveness';
import { TreatmentPlan } from './pages/TreatmentPlan';
import type { OnboardingProfile, PageId, RiskAnalysisResult } from './types';

const pageLabels: Partial<Record<PageId, string>> = {
  dashboard: 'Dashboard',
  testing: 'Comprehensive Testing',
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
  const [userName, setUserName] = useState<string | null>(() => localStorage.getItem('osteovision_user'));
  const [onboardingComplete, setOnboardingComplete] = useState(() => localStorage.getItem('osteovision_onboarding_complete') === 'true');
  const [, setOnboardingProfile] = useState<OnboardingProfile | null>(() => {
    const saved = localStorage.getItem('osteovision_onboarding_profile');
    return saved ? JSON.parse(saved) as OnboardingProfile : null;
  });
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const [riskAnalysis, setRiskAnalysis] = useState<RiskAnalysisResult | null>(null);

  const handleAnalysisComplete = (result: RiskAnalysisResult) => {
    setRiskAnalysis(result);
    setActivePage('score');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'testing': return <ComprehensiveTesting onStartAnalysis={() => setActivePage('score')} />;
      case 'score': return <OAChanceScore analysis={riskAnalysis} onAnalysisComplete={handleAnalysisComplete} onEditInputs={() => setActivePage('testing')} />;
      case 'history': return <TestHistory />;
      case 'plan': return <TreatmentPlan analysis={riskAnalysis} />;
      case 'effectiveness': return <TreatmentEffectiveness />;
      case 'drugs': return <DrugGeneticTesting />;
      case 'doctors': return <FindDoctors />;
      case 'education': return <EducationResources />;
      case 'membership': return <MembershipPlans />;
      case 'clinician': return <ClinicianSummary analysis={riskAnalysis} />;
      default: return <Dashboard onNavigate={setActivePage} analysis={riskAnalysis} />;
    }
  };

  if (!userName) {
    return <LoginPage onLogin={(name, isNewAccount) => {
      localStorage.setItem('osteovision_user', name);
      if (isNewAccount) {
        localStorage.removeItem('osteovision_onboarding_complete');
        localStorage.removeItem('osteovision_onboarding_profile');
        setOnboardingComplete(false);
        setOnboardingProfile(null);
      }
      setUserName(name);
    }} />;
  }

  if (!onboardingComplete) {
    return (
      <OnboardingHealthProfile
        onSkip={() => {
          localStorage.setItem('osteovision_onboarding_complete', 'true');
          setOnboardingComplete(true);
        }}
        onComplete={(profile) => {
          localStorage.setItem('osteovision_onboarding_profile', JSON.stringify(profile));
          localStorage.setItem('osteovision_onboarding_complete', 'true');
          setOnboardingProfile(profile);
          setOnboardingComplete(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <Sidebar activePage={activePage} onNavigate={setActivePage} showScore={Boolean(riskAnalysis)} />
        <main className="min-w-0 flex-1">
          <Topbar activePage={activePage} userName={userName} onSignOut={() => {
            localStorage.removeItem('osteovision_user');
            setUserName(null);
          }} />
          <div className="border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
            <select
              value={activePage}
              onChange={(event) => setActivePage(event.target.value as PageId)}
              className="w-full rounded-xl border border-slate-300 bg-white p-3 font-bold text-navy"
            >
              {(activePage === 'score' || riskAnalysis) && <option value="score">{riskAnalysis ? 'OA Chance Score' : 'Risk Analysis'}</option>}
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
