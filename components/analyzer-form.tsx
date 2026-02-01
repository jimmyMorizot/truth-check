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
import { AlertCircle, Search, Sparkles, FileText } from "lucide-react"
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
      <Card className="w-full max-w-4xl mx-auto shadow-2xl border-2 border-orange-100 dark:border-orange-900/30 bg-gradient-to-br from-white to-orange-50/30 dark:from-gray-950 dark:to-orange-950/10">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mb-4 animate-pulse">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Analyse en cours...</CardTitle>
          <CardDescription className="text-base">
            L'IA analyse le texte pour évaluer sa crédibilité
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-4 w-3/4 rounded-full" />
          <Skeleton className="h-4 w-1/2 rounded-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-2 border-orange-100 dark:border-orange-900/30 bg-gradient-to-br from-white to-orange-50/30 dark:from-gray-950 dark:to-orange-950/10 transition-all hover:shadow-orange-200/50 dark:hover:shadow-orange-900/30">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mb-4">
          <FileText className="w-7 h-7 text-white" />
        </div>
        <CardTitle className="text-2xl bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
          Analyseur de crédibilité
        </CardTitle>
        <CardDescription className="text-base mt-2">
          Collez le texte d'un article pour analyser sa crédibilité avec l'IA
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-3">
            <div className="relative">
              <Textarea
                {...register("articleText")}
                placeholder="Collez ici le texte de l'article à analyser...

Par exemple: un extrait d'article de presse, un post sur les réseaux sociaux, ou tout autre contenu textuel dont vous souhaitez vérifier la crédibilité."
                className="min-h-[240px] resize-y text-base border-2 focus:border-orange-300 dark:focus:border-orange-700 rounded-xl transition-all"
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center justify-between text-sm px-1">
              <span className={`font-medium transition-colors ${
                charCount < 50
                  ? "text-red-500"
                  : charCount > 5000
                  ? "text-red-500"
                  : charCount > 4500
                  ? "text-orange-500"
                  : "text-muted-foreground"
              }`}>
                {charCount}/5000 caractères {charCount < 50 && `(minimum: 50)`}
              </span>
              {errors.articleText && (
                <span className="text-destructive font-medium flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.articleText.message}
                </span>
              )}
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="border-2 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="h-5 w-5" />
              <AlertDescription className="text-base">{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full gap-2 text-base h-12 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={isLoading || charCount < 50 || charCount > 5000}
          >
            {isLoading ? (
              <>
                <Sparkles className="h-5 w-5 animate-spin" />
                Analyse en cours...
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                Analyser la crédibilité
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground px-4">
            L'analyse prend généralement entre 5 et 15 secondes selon la longueur du texte.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
