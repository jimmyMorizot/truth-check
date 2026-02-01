import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { analyzeArticle } from '@/lib/analyzer'

const requestSchema = z.object({
  articleText: z.string().min(50, "Le texte doit contenir au moins 50 caractères").max(5000, "Le texte ne peut pas dépasser 5000 caractères")
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { articleText } = requestSchema.parse(body)

    const result = await analyzeArticle(articleText)

    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Analysis failed. Please try again.' },
      { status: 500 }
    )
  }
}
