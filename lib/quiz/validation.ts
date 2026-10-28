import type { LeadContact } from './types'

export type LeadFormErrors = Partial<Record<keyof LeadContact | 'privacy', string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_PATTERN = /^\+?\d{9,15}$/

export function normalizePhone(value: string) {
  return value.replace(/[\s().-]/g, '')
}

export function validateName(value: string) {
  const name = value.trim()
  if (!name) return 'Escribe tu nombre.'
  if (name.length < 2) return 'El nombre es demasiado corto.'
  if (name.length > 80) return 'El nombre es demasiado largo.'
  return undefined
}

export function validateEmail(value: string) {
  const email = value.trim()
  if (!email) return 'Escribe tu email.'
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) return 'Introduce un email válido.'
  return undefined
}

export function validateWhatsapp(value: string) {
  const phone = normalizePhone(value.trim())
  if (!phone) return 'Escribe tu número de WhatsApp.'
  if (!PHONE_PATTERN.test(phone)) return 'Introduce un número válido (9 a 15 dígitos).'
  return undefined
}

export function validateLead(contact: LeadContact, privacyAccepted: boolean): LeadFormErrors {
  const errors: LeadFormErrors = {
    name: validateName(contact.name),
    email: validateEmail(contact.email),
    whatsapp: validateWhatsapp(contact.whatsapp),
    privacy: privacyAccepted ? undefined : 'Debes aceptar la Política de Privacidad.',
  }
  return Object.fromEntries(Object.entries(errors).filter(([, v]) => v)) as LeadFormErrors
}
