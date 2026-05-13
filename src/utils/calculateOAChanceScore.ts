import type { RiskCategory } from '../types';

export interface OAFactors {
  imagingSeverity: number;
  symptomSeverity: number;
  inflammationScore: number;
  geneticRisk: number;
  nutrientDeficiencyScore: number;
  treatmentAdherence: number;
}

export function calculateOAChanceScore(factors: OAFactors): { score: number; category: RiskCategory } {
  const weighted =
    factors.imagingSeverity * 0.3 +
    factors.symptomSeverity * 0.2 +
    factors.inflammationScore * 0.18 +
    factors.geneticRisk * 0.12 +
    factors.nutrientDeficiencyScore * 0.1 +
    (100 - factors.treatmentAdherence) * 0.1;

  const score = Math.round(Math.max(0, Math.min(100, weighted)));
  let category: RiskCategory = 'Proactive / Low Risk';
  if (score >= 66) category = 'High Risk';
  else if (score >= 41) category = 'Elevated Risk';
  else if (score >= 21) category = 'Baseline Vigilance / Moderate Risk';
  return { score, category };
}
