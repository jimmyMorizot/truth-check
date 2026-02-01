export interface AnalysisResult {
  score: number // 0-100
  label: string // "Peu crédible", "Moyennement crédible", "Crédible"
  positiveIndicators: string[]
  negativeIndicators: string[]
  summary: string
}
