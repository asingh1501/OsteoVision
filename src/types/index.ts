import type { LucideIcon } from 'lucide-react';

export type Status = 'optimal' | 'moderate' | 'high risk' | 'low' | 'improved' | 'worsened' | 'stable';
export type RiskCategory = 'Proactive / Low Risk' | 'Baseline Vigilance / Moderate Risk' | 'Elevated Risk' | 'High Risk';

export interface NavItem {
  id: PageId;
  label: string;
  icon: LucideIcon;
}

export type PageId =
  | 'dashboard'
  | 'testing'
  | 'score'
  | 'history'
  | 'plan'
  | 'effectiveness'
  | 'drugs'
  | 'doctors'
  | 'education'
  | 'membership'
  | 'clinician';

export interface PatientProfile {
  name: string;
  age: number;
  careTeam: string;
  primaryJoint: string;
  nextReminder: string;
}

export interface Biomarker {
  name: string;
  value: string | number;
  unit: string;
  idealRange: string;
  status: Status;
  group: 'Blood Panel' | 'Stool Analysis' | 'Urine Test' | 'Saliva / Genetic Test';
  explanation: string;
}

export interface ImagingResult {
  name: string;
  value: string;
  status: Status;
  explanation: string;
}

export interface TreatmentItem {
  id: number;
  title: string;
  category: 'supplement' | 'therapy' | 'lifestyle' | 'test' | 'clinician';
  dueDate: string;
  frequency: string;
  description: string;
  adherence: 'On track' | 'Due soon' | 'Needs attention';
  complete: boolean;
}

export interface TestHistoryItem {
  id: string;
  date: string;
  score: number;
  stage: string;
  changedMarkers: string[];
  crp: number;
  vitaminD: number;
  omega3: number;
  mobility: number;
}

export interface Doctor {
  name: string;
  specialty: string;
  rating: number;
  distance: number;
  clinic: string;
  phone: string;
}

export interface EducationResource {
  title: string;
  description: string;
  readTime: string;
  category: string;
  type: 'article' | 'video';
}

export interface MedicationInteraction {
  name: string;
  risk: 'low' | 'moderate' | 'high';
  category: string;
  genes: string[];
  concern: string;
}

export interface InsuranceProfile {
  provider: string;
  memberId: string;
  groupNumber: string;
  policyHolder: string;
  relationship: string;
  phone: string;
}

export interface CareTeamProfile {
  primaryCarePhysician: string;
  primaryClinic: string;
  physicianPhone: string;
  physicianEmail: string;
  preferredHospital: string;
  portalUsername: string;
  orthopedicDoctor: string;
  rheumatologist: string;
  physicalTherapist: string;
  nutritionist: string;
  insuranceProvider: string;
  integrationStatus: string;
  lastSharedSummary: string;
  consentToShare: boolean;
}

export interface ReminderPreferences {
  method: string;
  timing: string;
  caregiverContact: string;
}

export interface TreatmentCalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  category: 'supplement' | 'therapy' | 'exercise' | 'test' | 'appointment' | 'lifestyle' | 'check-in';
  status: 'pending' | 'completed' | 'missed' | 'upcoming';
  why: string;
  instructions: string;
  frequency: string;
}

export interface OnboardingProfile {
  fullName: string;
  age: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  insuranceProvider: string;
  memberId: string;
  groupNumber: string;
  policyHolderName: string;
  relationshipToPolicyHolder: string;
  insurancePhone: string;
  primaryCarePhysician: string;
  physicianClinic: string;
  physicianPhone: string;
  physicianEmail: string;
  preferredHospital: string;
  portalUsername: string;
  organizeRecords: boolean;
  consentToShare: boolean;
  orthopedicDoctor: string;
  rheumatologist: string;
  physicalTherapist: string;
  nutritionist: string;
  diagnosisStatus: string;
  affectedJoints: string[];
  currentMedications: string;
  allergies: string;
  majorConditions: string;
  recentTests: string;
}

export interface AnalysisInputs {
  vitaminD: number;
  rbcMagnesium: number;
  omega3: number;
  hsCrp: number;
  esr: number;
  il6: number;
  tnfAlpha: number;
  comp: number;
  leptin: number;
  adiponectin: number;
  fastingInsulin: number;
  oxidativeStress: number;
  urinaryCtxII: number;
  f2Isoprostane: number;
  microbiomeDiversity: number;
  stoolButyrate: number;
  calprotectin: number;
  zonulin: number;
  geneticPercentile: number;
  amCortisol: number;
  collagenRisk: number;
  imagingSeverity: number;
  cartilageThickness: number;
  jointSpaceNarrowing: number;
  effusionSeverity: number;
  boneMarrowLesion: number;
  symptomSeverity: number;
  mobilityScore: number;
  treatmentAdherence: number;
}

export interface RiskAnalysisResult {
  score: number;
  category: RiskCategory;
  drivers: string[];
  inputs: AnalysisInputs;
  factorScores: {
    imagingSeverity: number;
    symptomMobilityScore: number;
    inflammationScore: number;
    geneticRisk: number;
    nutrientDeficiencyScore: number;
    treatmentAdherence: number;
  };
}
