import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { analyzeArticle } from '@/lib/analyzer'

const requestSchema = z.object({
  articleText: z.string().min(50, "Le texte doit contenir au moins 50 caractères").max(5000, "Le texte ne peut pas dépasser 5000 caractères"),
  apiKey: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { articleText, apiKey } = requestSchema.parse(body)

    const result = await analyzeArticle(articleText, apiKey)

    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      )
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    // Detect API key / quota errors to signal the frontend
    const isApiKeyError = errorMessage.includes('Incorrect API key')
      || errorMessage.includes('insufficient_quota')
      || errorMessage.includes('rate_limit')
      || errorMessage.includes('billing')
      || errorMessage.includes('exceeded')

    if (isApiKeyError) {
      return NextResponse.json(
        { error: errorMessage, code: 'API_KEY_ERROR' },
        { status: 402 }
      )
    }

    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Analysis failed. Please try again.' },
      { status: 500 }
    )
  }
}
