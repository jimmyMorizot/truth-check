"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Search } from "lucide-react"
import { AnalysisResult } from "@/types"

const formSchema = z.object({
  articleText: z.string()
    .min(50, "Le texte doit contenir au moins 50 caractères")
    .max(5000, "Le texte ne peut pas dépasser 5000 caractères")
})

type FormData = z.infer<typeof formSchema>

interface AnalyzerFormProps {
  onAnalysisComplete: (result: AnalysisResult) => void
}

export function AnalyzerForm({ onAnalysisComplete }: AnalyzerFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const articleText = watch("articleText", "")
  const charCount = articleText?.length || 0

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ articleText: data.articleText }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Analysis failed")
      }

      const result = await response.json()
      onAnalysisComplete(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue. Réessayez.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Analyse en cours...</CardTitle>
          <CardDescription>L'IA analyse le texte pour évaluer sa crédibilité</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Analyseur de crédibilité</CardTitle>
        <CardDescription>
          Collez le texte d'un article pour analyser sa crédibilité avec l'IA
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Textarea
              {...register("articleText")}
              placeholder="Collez ici le texte de l'article à analyser..."
              className="min-h-[200px] resize-y"
              disabled={isLoading}
            />
            <div className="flex items-center justify-between text-sm">
              <span className={charCount < 50 || charCount > 5000 ? "text-destructive" : "text-muted-foreground"}>
                {charCount}/5000 caractères
              </span>
              {errors.articleText && (
                <span className="text-destructive">{errors.articleText.message}</span>
              )}
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full gap-2"
            disabled={isLoading || charCount < 50 || charCount > 5000}
          >
            {isLoading ? (
              <>Analyse en cours...</>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Analyser
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
