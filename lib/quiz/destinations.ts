import type { LeadPayload } from './types'

/**
 * Where each quiz sends its leads. When duplicating the quiz (e.g. "rutinas"),
 * add an entry here with its own Apps Script URL and default campaign.
 */
type LeadDestination = {
  url: string
  defaultCampaign: string
}

const DESTINATIONS: Record<string, LeadDestination> = {
  'recetas-pombalfit': {
    url: 'https://script.google.com/macros/s/AKfycbyMJGc1a2inh6ZAOyXKhnfsCkXroUao_zRVz6xdEbzLovLDBDQou-sw3EHTaY1ZgI-P/exec',
    defaultCampaign: 'recetas',
  },
}

export function getLeadDestination(quizId: string): LeadDestination | null {
  return DESTINATIONS[quizId] ?? null
}

export type GoogleSheetsLead = {
  nombre: string
  email: string
  whatsapp: string
  objetivo: string
  dificultad: string
  edad: string
  situacion: string
  tipoAyuda: string
  origen: string
  campana: string
}

export function toGoogleSheetsLead(
  lead: LeadPayload,
  defaultCampaign: string,
): GoogleSheetsLead {
  return {
    nombre: lead.name,
    email: lead.email,
    whatsapp: lead.whatsapp,
    objetivo: lead.answer_1 ?? '',
    dificultad: lead.answer_2 ?? '',
    edad: lead.answer_3 ?? '',
    situacion: lead.answer_4 ?? '',
    tipoAyuda: lead.answer_5 ?? '',
    origen: lead.utm_source || 'Directo',
    campana: lead.utm_campaign || defaultCampaign,
  }
}
