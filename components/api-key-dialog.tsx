"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Key, ExternalLink, AlertTriangle } from "lucide-react"

interface ApiKeyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onApiKeySubmit: (apiKey: string) => void
}

export function ApiKeyDialog({ open, onOpenChange, onApiKeySubmit }: ApiKeyDialogProps) {
  const [apiKey, setApiKey] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("openai-api-key") || ""
    }
    return ""
  })
  const [saveKey, setSaveKey] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = apiKey.trim()
    if (!trimmed.startsWith("sk-")) return

    if (saveKey) {
      localStorage.setItem("openai-api-key", trimmed)
    }
    onApiKeySubmit(trimmed)
    onOpenChange(false)
  }

  const isValid = apiKey.trim().startsWith("sk-")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg dark:bg-[hsl(var(--coffee-dark))] dark:border-[hsl(var(--coffee-light))]/30">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(var(--coffee))] to-[hsl(var(--coffee-light))] dark:from-[hsl(var(--latte))] dark:to-[hsl(var(--cream))] flex items-center justify-center mb-2">
            <Key className="w-6 h-6 text-white dark:text-[hsl(var(--espresso))]" />
          </div>
          <DialogTitle className="text-center dark:text-[hsl(var(--cream))]">
            Clé API OpenAI requise
          </DialogTitle>
          <DialogDescription className="text-center dark:text-[hsl(var(--latte))]/80">
            Le crédit de l&apos;API par défaut est épuisé. Ajoutez votre propre clé OpenAI pour continuer à utiliser TruthCheck.
          </DialogDescription>
        </DialogHeader>

        <Alert className="border-[hsl(var(--latte))]/30 dark:border-[hsl(var(--coffee-light))]/40 dark:bg-[hsl(var(--coffee))]/30">
          <AlertTriangle className="h-4 w-4 text-[hsl(var(--coffee))] dark:text-[hsl(var(--latte))]" />
          <AlertDescription className="text-xs dark:text-[hsl(var(--latte))]/80">
            Votre clé est envoyée uniquement au serveur de TruthCheck pour effectuer l&apos;analyse.
            Elle n&apos;est jamais partagée avec des tiers.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key" className="dark:text-[hsl(var(--cream))]">
              Clé API OpenAI
            </Label>
            <Input
              id="api-key"
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="font-mono dark:border-[hsl(var(--coffee-light))]/40 dark:focus:border-[hsl(var(--latte))]/50"
              autoFocus
            />
            {apiKey.length > 0 && !isValid && (
              <p className="text-xs text-destructive">
                La clé doit commencer par &quot;sk-&quot;
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="save-key"
              checked={saveKey}
              onChange={(e) => setSaveKey(e.target.checked)}
              className="rounded border-[hsl(var(--coffee-light))]"
            />
            <Label htmlFor="save-key" className="text-xs text-muted-foreground dark:text-[hsl(var(--latte))]/70 cursor-pointer">
              Sauvegarder la clé dans le navigateur (localStorage)
            </Label>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="dark:border-[hsl(var(--coffee-light))]/40 dark:text-[hsl(var(--latte))] dark:hover:bg-[hsl(var(--coffee))]/50"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={!isValid}
              className="bg-gradient-to-r from-[hsl(var(--coffee))] to-[hsl(var(--coffee-light))] dark:from-[hsl(var(--latte))] dark:to-[hsl(var(--cream))] text-white dark:text-[hsl(var(--espresso))] hover:shadow-lg transition-all"
            >
              <Key className="w-4 h-4 mr-2" />
              Utiliser cette clé
            </Button>
          </DialogFooter>
        </form>

        <p className="text-xs text-center text-muted-foreground dark:text-[hsl(var(--latte))]/60">
          Pas de clé ?{" "}
          <a
            href="https://platform.openai.com/api-keys"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline hover:text-[hsl(var(--cream))] transition-colors"
          >
            Créez-en une sur OpenAI
            <ExternalLink className="w-3 h-3" />
          </a>
        </p>
      </DialogContent>
    </Dialog>
  )
}
