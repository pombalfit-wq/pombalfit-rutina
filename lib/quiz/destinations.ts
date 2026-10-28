import type { LeadPayload } from './types'

type LeadDestination = {
  url: string
  defaultCampaign: string
}

const DESTINATIONS: Record<string, LeadDestination> = {
  'rutina-pombalfit': {
    url: 'https://script.google.com/macros/s/AKfycbyMJGc1a2inh6ZAOyXKhnfsCkXroUao_zRVz6xdEbzLovLDBDQou-sw3EHTaY1ZgI-P/exec',
    defaultCampaign: 'rutina',
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
  entrenamiento: string
  experiencia: string
  lugar: string
  material: string
  tiempo: string
  etapa: string
}

export function toGoogleSheetsLead(
  lead: LeadPayload,
  defaultCampaign: string,
): GoogleSheetsLead {
  return {
    nombre: lead.name,
    email: lead.email,
    whatsapp: lead.whatsapp,

    edad: lead.answer_1 ?? '',
    objetivo: lead.answer_2 ?? '',
    entrenamiento: lead.answer_3 ?? '',
    experiencia: lead.answer_4 ?? '',
    dificultad: lead.answer_5 ?? '',
    lugar: lead.answer_6 ?? '',
    material: lead.answer_7 ?? '',
    tiempo: lead.answer_8 ?? '',
    etapa: lead.answer_9 ?? '',
    tipoAyuda: lead.answer_10 ?? '',

    situacion: lead.answer_4 ?? '',
    origen: lead.utm_source || 'Directo',
    campana: lead.utm_campaign || defaultCampaign,
  }
}
