import { NextResponse } from 'next/server'
import type { LeadPayload } from '@/lib/quiz/types'
import { validateEmail, validateName, validateWhatsapp } from '@/lib/quiz/validation'
import { getLeadDestination, toGoogleSheetsLead } from '@/lib/quiz/destinations'

/**
 * Sent from the server because Google Apps Script web apps don't answer CORS
 * preflight requests, so a browser JSON POST would be blocked.
 */
async function forwardLead(lead: LeadPayload) {
  const destination = getLeadDestination(lead.quizId)
  if (!destination) throw new Error(`No destination configured for quiz "${lead.quizId}"`)

  const response = await fetch(destination.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toGoogleSheetsLead(lead, destination.defaultCampaign)),
    redirect: 'follow',
    signal: AbortSignal.timeout(15000),
  })
  if (!response.ok) throw new Error(`Google Apps Script responded with ${response.status}`)
}

export async function POST(request: Request) {
  let lead: LeadPayload
  try {
    lead = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const invalid =
    typeof lead?.quizId !== 'string' ||
    validateName(String(lead.name ?? '')) ||
    validateEmail(String(lead.email ?? '')) ||
    validateWhatsapp(String(lead.whatsapp ?? '')) ||
    !Array.isArray(lead.answers)

  if (invalid) {
    return NextResponse.json({ error: 'Invalid lead data' }, { status: 422 })
  }

  try {
    await forwardLead({ ...lead, registeredAt: lead.registeredAt || new Date().toISOString() })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[leads] Failed to forward lead:', error)
    return NextResponse.json({ error: 'Lead could not be delivered' }, { status: 502 })
  }
}
