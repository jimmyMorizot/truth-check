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
        <div className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--cream))]/40 via-[hsl(var(--latte))]/30 to-[hsl(var(--cream))]/40 dark:from-[hsl(var(--espresso))] dark:via-[hsl(var(--coffee-dark))] dark:to-[hsl(var(--coffee))] py-12 mb-8 rounded-3xl mx-4 sm:mx-8">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--latte))]/20 dark:bg-[hsl(var(--coffee))]/80 text-[hsl(var(--coffee-dark))] dark:text-[hsl(var(--latte))] text-sm font-medium mb-6 border border-[hsl(var(--latte))]/30 dark:border-[hsl(var(--coffee-light))]/30">
              <Sparkles className="w-4 h-4" />
              Propulsé par GPT-4
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-[hsl(var(--coffee))] via-[hsl(var(--coffee-light))] to-[hsl(var(--coffee))] dark:from-[hsl(var(--latte))] dark:via-[hsl(var(--cream))] dark:to-[hsl(var(--latte))] bg-clip-text text-transparent">
              Détectez les Fake News
              <br />
              en quelques secondes
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 dark:text-[hsl(var(--latte))]/90">
              Notre IA analyse la crédibilité de vos articles en évaluant le langage, les sources, la cohérence et les biais potentiels.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-12">
              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/50 dark:bg-[hsl(var(--coffee))]/40 backdrop-blur-sm border border-[hsl(var(--latte))]/30 dark:border-[hsl(var(--coffee-light))]/40">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(var(--coffee))] to-[hsl(var(--coffee-light))] dark:from-[hsl(var(--latte))] dark:to-[hsl(var(--cream))] flex items-center justify-center mb-3 shadow-lg">
                  <ShieldCheck className="w-6 h-6 text-white dark:text-[hsl(var(--espresso))]" />
                </div>
                <h3 className="font-semibold mb-1 dark:text-[hsl(var(--cream))]">Analyse IA</h3>
                <p className="text-sm text-muted-foreground dark:text-[hsl(var(--latte))]/80">Détection avancée avec GPT-4</p>
              </div>

              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/50 dark:bg-[hsl(var(--coffee))]/40 backdrop-blur-sm border border-[hsl(var(--latte))]/30 dark:border-[hsl(var(--coffee-light))]/40">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(var(--coffee-light))] to-[hsl(var(--latte))] dark:from-[hsl(var(--cream))] dark:to-[hsl(var(--latte))] flex items-center justify-center mb-3 shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white dark:text-[hsl(var(--espresso))]" />
                </div>
                <h3 className="font-semibold mb-1 dark:text-[hsl(var(--cream))]">Score précis</h3>
                <p className="text-sm text-muted-foreground dark:text-[hsl(var(--latte))]/80">De 0 à 100% de crédibilité</p>
              </div>

              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/50 dark:bg-[hsl(var(--coffee))]/40 backdrop-blur-sm border border-[hsl(var(--latte))]/30 dark:border-[hsl(var(--coffee-light))]/40">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(var(--latte))] to-[hsl(var(--cream))] dark:from-[hsl(var(--latte))] dark:to-[hsl(var(--cream))] flex items-center justify-center mb-3 shadow-lg">
                  <Sparkles className="w-6 h-6 text-white dark:text-[hsl(var(--espresso))]" />
                </div>
                <h3 className="font-semibold mb-1 dark:text-[hsl(var(--cream))]">Instantané</h3>
                <p className="text-sm text-muted-foreground dark:text-[hsl(var(--latte))]/80">Résultats en quelques secondes</p>
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
