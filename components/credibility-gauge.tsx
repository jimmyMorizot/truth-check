"use client"

import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

interface CredibilityGaugeProps {
  score: number
  label: string
}

export function CredibilityGauge({ score, label }: CredibilityGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score)
    }, 100)
    return () => clearTimeout(timer)
  }, [score])

  const getScoreColor = (score: number) => {
    if (score < 40) return "destructive"
    if (score < 70) return "warning"
    return "success"
  }

  const getProgressColor = (score: number) => {
    if (score < 40) return "bg-destructive"
    if (score < 70) return "bg-[hsl(var(--amber))]"
    return "bg-green-500"
  }

  const badgeVariant = getScoreColor(score) as "destructive" | "default"

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Score de crédibilité</h3>
        <Badge variant={badgeVariant} className="text-sm px-3 py-1">
          {label}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">0%</span>
          <span className="text-3xl font-bold">{animatedScore}%</span>
          <span className="text-sm text-muted-foreground">100%</span>
        </div>

        <div className="relative">
          <Progress
            value={animatedScore}
            className="h-4"
            indicatorClassName={getProgressColor(score)}
          />
        </div>
      </div>

      <p className="text-sm text-muted-foreground text-center">
        {score < 40 && "Ce texte présente plusieurs indicateurs de faible crédibilité."}
        {score >= 40 && score < 70 && "Ce texte présente des éléments mitigés concernant sa crédibilité."}
        {score >= 70 && "Ce texte présente plusieurs indicateurs de crédibilité."}
      </p>
    </div>
  )
}
