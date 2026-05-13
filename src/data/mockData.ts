import type { Biomarker, Doctor, EducationResource, ImagingResult, MedicationInteraction, PatientProfile, TestHistoryItem, TreatmentItem } from '../types';
import { calculateOAChanceScore } from '../utils/calculateOAChanceScore';

export const patientProfile: PatientProfile = {
  name: 'Maya Thompson',
  age: 42,
  careTeam: 'Northlake Orthopedics',
  primaryJoint: 'Right knee',
  nextReminder: 'Physical therapy check-in on May 18',
};

export const oaScore = calculateOAChanceScore({
  imagingSeverity: 43,
  symptomSeverity: 38,
  inflammationScore: 44,
  geneticRisk: 34,
  nutrientDeficiencyScore: 42,
  treatmentAdherence: 76,
});

export const biomarkers: Biomarker[] = [
  { name: '25(OH) Vitamin D', value: 29, unit: 'ng/mL', idealRange: '40-60', status: 'low', group: 'Blood Panel', explanation: 'Vitamin D supports musculoskeletal health and may influence inflammatory tone.' },
  { name: 'RBC Magnesium', value: 5.2, unit: 'mg/dL', idealRange: '5.5-6.5', status: 'moderate', group: 'Blood Panel', explanation: 'Magnesium supports muscle function, mobility, and inflammatory balance.' },
  { name: 'Omega-3 Index', value: 5.8, unit: '%', idealRange: '8-12', status: 'moderate', group: 'Blood Panel', explanation: 'Omega-3 status helps contextualize inflammation and joint-friendly nutrition.' },
  { name: 'hs-CRP', value: 3.4, unit: 'mg/L', idealRange: '<1.0', status: 'high risk', group: 'Blood Panel', explanation: 'A systemic inflammation marker that can help identify concerning trends.' },
  { name: 'ESR', value: 24, unit: 'mm/hr', idealRange: '<20', status: 'moderate', group: 'Blood Panel', explanation: 'Erythrocyte sedimentation rate adds context for systemic inflammatory activity.' },
  { name: 'Interleukin-6', value: 4.9, unit: 'pg/mL', idealRange: '<2.0', status: 'high risk', group: 'Blood Panel', explanation: 'IL-6 is associated with inflammatory signaling relevant to joint symptoms.' },
  { name: 'TNF-alpha', value: 8.1, unit: 'pg/mL', idealRange: '<5.0', status: 'moderate', group: 'Blood Panel', explanation: 'TNF-alpha helps contextualize inflammatory pathways involved in joint discomfort.' },
  { name: 'COMP', value: 13.2, unit: 'U/L', idealRange: '<12', status: 'moderate', group: 'Blood Panel', explanation: 'Cartilage oligomeric matrix protein can support cartilage turnover monitoring.' },
  { name: 'Leptin', value: 22, unit: 'ng/mL', idealRange: 'contextual', status: 'moderate', group: 'Blood Panel', explanation: 'Leptin can reflect metabolic-inflammatory load relevant to joint stress.' },
  { name: 'Adiponectin', value: 6.4, unit: 'ug/mL', idealRange: '>8', status: 'low', group: 'Blood Panel', explanation: 'Adiponectin can help frame metabolic health and inflammatory balance.' },
  { name: 'Fasting Insulin', value: 12.8, unit: 'uIU/mL', idealRange: '<8', status: 'moderate', group: 'Blood Panel', explanation: 'Insulin resistance patterns can influence inflammation, weight, and mobility planning.' },
  { name: 'Microbiome Diversity', value: 62, unit: 'score', idealRange: '>75', status: 'moderate', group: 'Stool Analysis', explanation: 'Gut diversity supports gut-joint axis monitoring and inflammation context.' },
  { name: 'Stool Butyrate', value: 7.4, unit: 'mmol/kg', idealRange: '>10', status: 'low', group: 'Stool Analysis', explanation: 'Butyrate is a short-chain fatty acid associated with gut barrier and immune balance.' },
  { name: 'Fecal Calprotectin', value: 74, unit: 'ug/g', idealRange: '<50', status: 'moderate', group: 'Stool Analysis', explanation: 'Calprotectin can add context for gut inflammation that may affect systemic inflammatory load.' },
  { name: 'Zonulin', value: 48, unit: 'ng/mL', idealRange: '<35', status: 'moderate', group: 'Stool Analysis', explanation: 'Zonulin is used as a gut barrier context marker in some wellness panels.' },
  { name: '8-OHdG', value: 11.8, unit: 'ng/mg', idealRange: '<8', status: 'high risk', group: 'Urine Test', explanation: 'A marker of oxidative stress and DNA damage that may track inflammatory burden.' },
  { name: 'Urinary CTX-II', value: 310, unit: 'ng/mmol', idealRange: '<250', status: 'moderate', group: 'Urine Test', explanation: 'CTX-II is used in research contexts for cartilage degradation trend awareness.' },
  { name: 'F2-Isoprostane', value: 1.9, unit: 'ng/mg', idealRange: '<1.5', status: 'moderate', group: 'Urine Test', explanation: 'F2-isoprostane supports oxidative stress monitoring alongside symptom changes.' },
  { name: 'Polygenic Risk Score for OA', value: 68, unit: 'percentile', idealRange: '<50', status: 'moderate', group: 'Saliva / Genetic Test', explanation: 'Genetic predisposition helps personalize risk awareness, not diagnosis.' },
  { name: 'AM Cortisol', value: 19.4, unit: 'ug/dL', idealRange: '6-18', status: 'moderate', group: 'Saliva / Genetic Test', explanation: 'Stress physiology can influence sleep, inflammation, pain, and recovery patterns.' },
  { name: 'Collagen / Cartilage Variant Risk', value: 61, unit: 'percentile', idealRange: '<50', status: 'moderate', group: 'Saliva / Genetic Test', explanation: 'Prototype genetics input for connective tissue and cartilage risk awareness.' },
];

export const imagingResults: ImagingResult[] = [
  { name: 'Prenuvo Degeneration Index', value: '42 / 100', status: 'moderate', explanation: 'Mild-to-moderate degenerative pattern noted in knee region.' },
  { name: 'Joint space narrowing', value: 'Mild medial narrowing', status: 'moderate', explanation: 'Useful for longitudinal structural comparison.' },
  { name: 'Cartilage thinning', value: 'Focal thinning', status: 'moderate', explanation: 'Monitored alongside symptoms and mobility trends.' },
  { name: 'Bone marrow lesion indicator', value: 'Not detected', status: 'optimal', explanation: 'No concerning lesion indicator in latest summary.' },
  { name: 'Effusion/inflammation indicator', value: 'Trace effusion', status: 'moderate', explanation: 'May align with recent symptom flare patterns.' },
  { name: 'Osteophyte indicator', value: 'Small marginal osteophyte', status: 'moderate', explanation: 'Bony change indicator used for structural trend discussions.' },
  { name: 'Synovitis indicator', value: 'Mild signal', status: 'moderate', explanation: 'Can help contextualize inflammatory symptoms and swelling patterns.' },
  { name: 'Alignment / load pattern', value: 'Mild varus loading', status: 'moderate', explanation: 'Load distribution can guide physical therapy and orthotics discussion.' },
];

export const initialTreatments: TreatmentItem[] = [
  { id: 1, title: 'Vitamin D supplement', category: 'supplement', dueDate: 'Today', frequency: 'Daily', description: 'Clinician-reviewed repletion support based on low 25(OH) Vitamin D.', adherence: 'On track', complete: true },
  { id: 2, title: 'Omega-3 supplement', category: 'supplement', dueDate: 'Today', frequency: 'Daily with food', description: 'Supports targeted inflammation reduction plan.', adherence: 'Due soon', complete: false },
  { id: 3, title: 'Magnesium support', category: 'supplement', dueDate: 'Tomorrow', frequency: 'Nightly', description: 'Supports mobility, muscle function, and recovery.', adherence: 'On track', complete: false },
  { id: 4, title: 'Physical therapy', category: 'therapy', dueDate: 'May 18', frequency: '2x weekly', description: 'Joint mechanics, strength, gait, and pain-aware mobility plan.', adherence: 'On track', complete: false },
  { id: 5, title: 'Joint-friendly strength/mobility exercises', category: 'lifestyle', dueDate: 'Today', frequency: '4x weekly', description: 'Low-impact plan focused on range of motion and stable loading.', adherence: 'Due soon', complete: false },
  { id: 6, title: 'Follow-up lab testing', category: 'test', dueDate: 'Jul 2', frequency: 'Every 12 weeks', description: 'Repeat biomarkers to compare response over time.', adherence: 'On track', complete: false },
  { id: 7, title: 'Clinician review appointment', category: 'clinician', dueDate: 'Jul 9', frequency: 'Quarterly', description: 'Review trends, imaging summary, medication safety, and next steps.', adherence: 'Needs attention', complete: false },
];

export const testHistory: TestHistoryItem[] = [
  { id: 'jan', date: 'Jan 12, 2026', score: 42, stage: 'Elevated Risk', changedMarkers: ['hs-CRP high', 'Vitamin D low'], crp: 4.6, vitaminD: 22, omega3: 4.9, mobility: 61 },
  { id: 'mar', date: 'Mar 8, 2026', score: 39, stage: 'Baseline Vigilance', changedMarkers: ['Omega-3 improved', 'Mobility stable'], crp: 3.9, vitaminD: 26, omega3: 5.4, mobility: 64 },
  { id: 'may', date: 'May 2, 2026', score: 37, stage: 'Baseline Vigilance', changedMarkers: ['hs-CRP improved', 'Vitamin D improved', 'Trace effusion noted'], crp: 3.4, vitaminD: 29, omega3: 5.8, mobility: 68 },
];

export const doctors: Doctor[] = [
  { name: 'Dr. Elena Rao', specialty: 'Orthopedics', rating: 4.9, distance: 2.1, clinic: 'Northlake Orthopedics', phone: '(312) 555-0134' },
  { name: 'Dr. Samir Patel', specialty: 'Rheumatology', rating: 4.8, distance: 4.7, clinic: 'Lakeshore Rheumatology Group', phone: '(312) 555-0178' },
  { name: 'Jordan Kim, DPT', specialty: 'Physical Therapy', rating: 4.9, distance: 1.6, clinic: 'MotionWorks PT', phone: '(312) 555-0188' },
  { name: 'Nina Alvarez, RD', specialty: 'Clinical Nutrition', rating: 4.7, distance: 5.4, clinic: 'Integrative Nutrition Clinic', phone: '(312) 555-0192' },
  { name: 'Dr. Priya Shah', specialty: 'Endocrinology', rating: 4.6, distance: 6.2, clinic: 'Metro Endocrine Center', phone: '(312) 555-0141' },
  { name: 'Dr. Marcus Lee', specialty: 'Functional Medicine', rating: 4.5, distance: 7.9, clinic: 'Whole Health Partners', phone: '(312) 555-0160' },
];

export const educationResources: EducationResource[] = [
  { title: 'Understanding Osteoarthritis', description: 'A practical overview of joint structure, symptoms, and care pathways.', readTime: '7 min', category: 'Foundations', type: 'article' },
  { title: 'The Gut-Joint Axis', description: 'How microbiome patterns may support inflammation monitoring.', readTime: '6 min', category: 'Microbiome', type: 'article' },
  { title: 'Inflammatory Markers Explained', description: 'A plain-language guide to hs-CRP, IL-6, COMP, and trends.', readTime: '8 min', category: 'Labs', type: 'article' },
  { title: 'Nutrient Repletion Strategies', description: 'Questions to ask clinicians about Vitamin D, omega-3, and magnesium.', readTime: '5 min', category: 'Nutrition', type: 'article' },
  { title: 'How Physical Therapy Helps OA', description: 'Strength, gait, mobility, and pain-aware progression.', readTime: '6 min', category: 'Therapy', type: 'article' },
  { title: 'Understanding Your OA Chance Score', description: 'How prototype risk factors are weighted for decision-support.', readTime: '4 min', category: 'Score', type: 'article' },
  { title: 'Medication Safety and Genetics', description: 'Why medication response can vary by genes and medical history.', readTime: '5 min', category: 'Safety', type: 'article' },
  { title: 'When to Seek Medical Care', description: 'Symptoms and changes that should be discussed with a clinician.', readTime: '4 min', category: 'Care', type: 'article' },
  { title: 'Low-Impact Knee Mobility Session', description: 'Guided movement routine for clinician-approved home practice.', readTime: '12 min', category: 'Video', type: 'video' },
  { title: 'Preparing for Your Orthopedic Visit', description: 'What to bring and how to discuss longitudinal test trends.', readTime: '9 min', category: 'Video', type: 'video' },
];

export const medications: MedicationInteraction[] = [
  { name: 'Warfarin', risk: 'high', category: 'Anticoagulant', genes: ['CYP2C9', 'VKORC1'], concern: 'Genetic variation can affect dosing sensitivity and bleeding risk monitoring.' },
  { name: 'Clopidogrel', risk: 'moderate', category: 'Antiplatelet', genes: ['CYP2C19'], concern: 'Some variants may reduce activation and change expected effectiveness.' },
  { name: 'Codeine', risk: 'high', category: 'Pain medication', genes: ['CYP2D6'], concern: 'Metabolism differences may increase side effects or reduce pain relief.' },
  { name: 'NSAIDs', risk: 'moderate', category: 'Anti-inflammatory', genes: ['CYP2C9'], concern: 'Medical history, kidney function, GI risk, and gene variation may affect safety.' },
  { name: 'Corticosteroids', risk: 'moderate', category: 'Anti-inflammatory', genes: ['NR3C1'], concern: 'Response and adverse effects can vary; review frequency and risk factors.' },
  { name: 'Methotrexate', risk: 'moderate', category: 'DMARD', genes: ['MTHFR', 'SLCO1B1'], concern: 'Genetic and lab context may inform monitoring discussions.' },
];
