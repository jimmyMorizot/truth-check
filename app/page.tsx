"use client"

import { useState } from "react"
import { AnalyzerForm } from "@/components/analyzer-form"
import { ResultDisplay } from "@/components/result-display"
import { AnalysisResult } from "@/types"
import { ShieldCheck, Sparkles, TrendingUp } from "lucide-react"

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)

  const handleReset = () => {
    setAnalysisResult(null)
  }

  return (
    <div className="relative">
      {/* Hero Section avec gradient */}
      {!analysisResult && (
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/20 dark:via-amber-950/20 dark:to-yellow-950/20 py-12 mb-8 rounded-3xl mx-4 sm:mx-8">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Propulsé par GPT-4
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 dark:from-orange-400 dark:via-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
              Détectez les Fake News
              <br />
              en quelques secondes
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Notre IA analyse la crédibilité de vos articles en évaluant le langage, les sources, la cohérence et les biais potentiels.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-12">
              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-orange-100 dark:border-orange-900/30">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-1">Analyse IA</h3>
                <p className="text-sm text-muted-foreground">Détection avancée avec GPT-4</p>
              </div>

              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-amber-100 dark:border-amber-900/30">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-1">Score précis</h3>
                <p className="text-sm text-muted-foreground">De 0 à 100% de crédibilité</p>
              </div>

              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-yellow-100 dark:border-yellow-900/30">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-3">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-1">Instantané</h3>
                <p className="text-sm text-muted-foreground">Résultats en quelques secondes</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-4 pb-8">
        {!analysisResult ? (
          <AnalyzerForm onAnalysisComplete={setAnalysisResult} />
        ) : (
          <ResultDisplay result={analysisResult} onReset={handleReset} />
        )}
      </div>
    </div>
  )
}
