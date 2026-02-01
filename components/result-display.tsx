"use client"

import { AnalysisResult } from "@/types"
import { CredibilityGauge } from "./credibility-gauge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react"

interface ResultDisplayProps {
  result: AnalysisResult
  onReset: () => void
}

export function ResultDisplay({ result, onReset }: ResultDisplayProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <Card>
        <CardHeader>
          <CardTitle>Résultat de l'analyse</CardTitle>
          <CardDescription>{result.summary}</CardDescription>
        </CardHeader>
        <CardContent>
          <CredibilityGauge score={result.score} label={result.label} />
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {result.positiveIndicators.length > 0 && (
          <Card className="border-green-200 dark:border-green-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle2 className="h-5 w-5" />
                Points positifs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.positiveIndicators.map((indicator, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600 dark:text-green-500 flex-shrink-0" />
                    <span className="text-sm">{indicator}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {result.negativeIndicators.length > 0 && (
          <Card className="border-red-200 dark:border-red-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <XCircle className="h-5 w-5" />
                Points négatifs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.negativeIndicators.map((indicator, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 mt-0.5 text-red-600 dark:text-red-500 flex-shrink-0" />
                    <span className="text-sm">{indicator}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex justify-center pt-4">
        <Button onClick={onReset} variant="outline" className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Nouvelle analyse
        </Button>
      </div>
    </div>
  )
}
