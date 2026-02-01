"use client"

import { AnalysisResult } from "@/types"
import { CredibilityGauge } from "./credibility-gauge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, RotateCcw, TrendingUp, AlertTriangle, Info } from "lucide-react"

interface ResultDisplayProps {
  result: AnalysisResult
  onReset: () => void
}

export function ResultDisplay({ result, onReset }: ResultDisplayProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Carte principale avec le score */}
      <Card className="shadow-2xl border-2 border-orange-100 dark:border-orange-900/30 bg-gradient-to-br from-white to-orange-50/30 dark:from-gray-950 dark:to-orange-950/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-full blur-3xl -z-0"></div>
        <CardHeader className="relative z-10 text-center pb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 text-orange-800 dark:text-orange-200 text-sm font-medium mb-4 mx-auto">
            <TrendingUp className="w-4 h-4" />
            Analyse terminée
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
            Résultat de l'analyse
          </CardTitle>
          <CardDescription className="text-base mt-2 font-medium">
            {result.summary}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 pt-2">
          <CredibilityGauge score={result.score} label={result.label} />
        </CardContent>
      </Card>

      {/* Grille des indicateurs */}
      <div className="grid md:grid-cols-2 gap-6">
        {result.positiveIndicators.length > 0 && (
          <Card className="border-2 border-green-200 dark:border-green-900/50 shadow-xl bg-gradient-to-br from-white to-green-50/30 dark:from-gray-950 dark:to-green-950/10 animate-in slide-in-from-left duration-500">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-green-700 dark:text-green-400 text-xl">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                Points positifs
              </CardTitle>
              <CardDescription>
                Éléments renforçant la crédibilité
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.positiveIndicators.map((indicator, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-xl bg-green-50/50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30 animate-in slide-in-from-left"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CheckCircle2 className="h-5 w-5 mt-0.5 text-green-600 dark:text-green-500 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{indicator}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {result.negativeIndicators.length > 0 && (
          <Card className="border-2 border-red-200 dark:border-red-900/50 shadow-xl bg-gradient-to-br from-white to-red-50/30 dark:from-gray-950 dark:to-red-950/10 animate-in slide-in-from-right duration-500">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-red-700 dark:text-red-400 text-xl">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
                  <XCircle className="h-5 w-5 text-white" />
                </div>
                Points négatifs
              </CardTitle>
              <CardDescription>
                Éléments diminuant la crédibilité
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.negativeIndicators.map((indicator, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 animate-in slide-in-from-right"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <XCircle className="h-5 w-5 mt-0.5 text-red-600 dark:text-red-500 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{indicator}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Disclaimer */}
      <Card className="border-amber-200 dark:border-amber-900/50 bg-gradient-to-br from-amber-50/50 to-yellow-50/50 dark:from-amber-950/10 dark:to-yellow-950/10">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                Note importante
              </p>
              <p className="text-xs text-amber-800/80 dark:text-amber-300/70 leading-relaxed">
                Cette analyse est automatique et indicative. Elle ne remplace pas une vérification factuelle approfondie par des experts. Utilisez ce score comme un premier indicateur, puis vérifiez les sources et faits par vous-même.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bouton Nouvelle analyse */}
      <div className="flex justify-center pt-2">
        <Button
          onClick={onReset}
          size="lg"
          className="gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <RotateCcw className="h-5 w-5" />
          Nouvelle analyse
        </Button>
      </div>
    </div>
  )
}
