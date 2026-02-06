"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Search, Sparkles, FileText, Key } from "lucide-react"
import { AnalysisResult } from "@/types"
import { ApiKeyDialog } from "./api-key-dialog"

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
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false)
  const [customApiKey, setCustomApiKey] = useState<string | null>(null)
  const [pendingText, setPendingText] = useState<string | null>(null)

  // Load saved API key on mount
  useEffect(() => {
    const saved = localStorage.getItem("openai-api-key")
    if (saved) setCustomApiKey(saved)
  }, [])

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

  const submitAnalysis = async (text: string, apiKey?: string | null) => {
    setIsLoading(true)
    setError(null)

    try {
      const body: Record<string, string> = { articleText: text }
      if (apiKey) body.apiKey = apiKey

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const errorData = await response.json()

        if (errorData.code === "API_KEY_ERROR") {
          setPendingText(text)
          setShowApiKeyDialog(true)
          setError("Crédit API épuisé. Veuillez ajouter votre propre clé OpenAI.")
          return
        }

        throw new Error(errorData.error || "Analysis failed")
      }

      const result = await response.json()
      setPendingText(null)
      onAnalysisComplete(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue. Réessayez.")
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: FormData) => {
    await submitAnalysis(data.articleText, customApiKey)
  }

  const handleApiKeySubmit = (apiKey: string) => {
    setCustomApiKey(apiKey)
    setError(null)
    // Retry with the new key and the pending text
    if (pendingText) {
      submitAnalysis(pendingText, apiKey)
    }
  }

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto shadow-2xl border-2 border-[hsl(var(--latte))]/20 dark:border-[hsl(var(--coffee-light))]/30 bg-gradient-to-br from-white to-[hsl(var(--cream))]/20 dark:from-[hsl(var(--espresso))] dark:to-[hsl(var(--coffee-dark))]/70">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(var(--amber))] to-[hsl(var(--caramel))] flex items-center justify-center mb-4 animate-pulse shadow-lg shadow-[hsl(var(--amber))]/30">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl dark:text-[hsl(var(--cream))]">Analyse en cours...</CardTitle>
          <CardDescription className="text-base dark:text-[hsl(var(--latte))]/80">
            L&apos;IA analyse le texte pour évaluer sa crédibilité
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
    <>
      <Card className="w-full max-w-4xl mx-auto shadow-2xl border-2 border-[hsl(var(--latte))]/20 dark:border-[hsl(var(--coffee-light))]/30 bg-gradient-to-br from-white to-[hsl(var(--cream))]/20 dark:from-[hsl(var(--espresso))] dark:to-[hsl(var(--coffee-dark))]/70 transition-all hover:shadow-[hsl(var(--latte))]/30 dark:hover:shadow-[hsl(var(--coffee-light))]/20">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-[hsl(var(--amber))] to-[hsl(var(--caramel))] flex items-center justify-center mb-4 shadow-lg shadow-[hsl(var(--amber))]/25">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-[hsl(var(--cream))] via-[hsl(var(--amber-light))] to-[hsl(var(--latte))] bg-clip-text text-transparent">
            Analyseur de crédibilité
          </CardTitle>
          <CardDescription className="text-base mt-2 dark:text-[hsl(var(--latte))]/80">
            Collez le texte d&apos;un article pour analyser sa crédibilité avec l&apos;IA
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
                  className="min-h-[240px] resize-y text-base border-2 focus:border-[hsl(var(--amber))]/50 dark:focus:border-[hsl(var(--amber))]/40 rounded-xl transition-all focus:ring-2 focus:ring-[hsl(var(--amber))]/20"
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

            {customApiKey && (
              <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[hsl(var(--coffee))]/10 dark:bg-[hsl(var(--coffee))]/30 border border-[hsl(var(--latte))]/20 dark:border-[hsl(var(--coffee-light))]/30">
                <span className="text-xs text-muted-foreground dark:text-[hsl(var(--latte))]/70 flex items-center gap-2">
                  <Key className="w-3 h-3" />
                  Clé API personnelle active
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 text-xs dark:text-[hsl(var(--latte))]/70 dark:hover:text-[hsl(var(--cream))]"
                  onClick={() => {
                    setCustomApiKey(null)
                    localStorage.removeItem("openai-api-key")
                  }}
                >
                  Retirer
                </Button>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full gap-2 text-base h-12 bg-gradient-to-r from-[hsl(var(--amber))] via-[hsl(var(--amber-glow))] to-[hsl(var(--caramel))] hover:from-[hsl(var(--amber-glow))] hover:via-[hsl(var(--amber))] hover:to-[hsl(var(--toffee))] text-white shadow-lg shadow-[hsl(var(--amber))]/30 hover:shadow-xl hover:shadow-[hsl(var(--amber))]/40 transition-all duration-300"
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
              L&apos;analyse prend généralement entre 5 et 15 secondes selon la longueur du texte.
            </p>
          </form>
        </CardContent>
      </Card>

      <ApiKeyDialog
        open={showApiKeyDialog}
        onOpenChange={setShowApiKeyDialog}
        onApiKeySubmit={handleApiKeySubmit}
      />
    </>
  )
}
