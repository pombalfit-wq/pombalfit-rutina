import type { LeadContact, LeadPayload, QuizConfig, UtmParams } from './types'
import { normalizePhone } from './validation'

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const

export function readUtmParams(search: string): UtmParams {
  const params = new URLSearchParams(search)
  return Object.fromEntries(
    UTM_KEYS.map((key) => [key, params.get(key)?.trim().slice(0, 200) || null]),
  ) as UtmParams
}

export function buildLeadPayload(
  config: QuizConfig,
  answers: Record<string, string>,
  contact: LeadContact,
  utm: UtmParams,
  pageUrl: string | null,
): LeadPayload {
  const detailed = config.questions.map((question) => {
    const value = answers[question.id] ?? ''
    const option = question.options.find((o) => o.value === value)
    return {
      questionId: question.id,
      question: question.title,
      answer: option?.label ?? '',
      answerValue: value,
    }
  })

  return {
    quizId: config.id,
    name: contact.name.trim(),
    email: contact.email.trim().toLowerCase(),
    whatsapp: normalizePhone(contact.whatsapp.trim()),
answer_1: detailed[0]?.answer || null,
answer_2: detailed[1]?.answer || null,
answer_3: detailed[2]?.answer || null,
answer_4: detailed[3]?.answer || null,
answer_5: detailed[4]?.answer || null,
answers: detailed,
    registeredAt: new Date().toISOString(),
    pageUrl,
    ...utm,
  }
}

/**
 * Sends the lead to our own API route, which forwards it to the configured
 * webhook / CRM / email tool. Swap the destination in app/api/leads/route.ts.
 */
export async function submitLead(payload: LeadPayload) {
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error('No se pudo enviar el formulario')
}
