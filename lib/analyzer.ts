import OpenAI from 'openai'
import { openai as defaultClient } from './openai-client'
import { FAKE_NEWS_DETECTION_SYSTEM_PROMPT, buildAnalysisPrompt } from './prompts'
import { z } from 'zod'

const analysisResultSchema = z.object({
  score: z.number().min(0).max(100),
  label: z.enum(['Peu crédible', 'Moyennement crédible', 'Crédible']),
  positiveIndicators: z.array(z.string()),
  negativeIndicators: z.array(z.string()),
  summary: z.string(),
})

export type AnalysisResult = z.infer<typeof analysisResultSchema>

export async function analyzeArticle(articleText: string, apiKey?: string): Promise<AnalysisResult> {
  const client = apiKey ? new OpenAI({ apiKey }) : defaultClient

  const completion = await client.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [
      { role: 'system', content: FAKE_NEWS_DETECTION_SYSTEM_PROMPT },
      { role: 'user', content: buildAnalysisPrompt(articleText) },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.3,
    max_tokens: 1000,
  })

  const rawResult = completion.choices[0].message.content
  if (!rawResult) throw new Error('Empty response from OpenAI')

  const parsed = JSON.parse(rawResult)
  return analysisResultSchema.parse(parsed)
}
