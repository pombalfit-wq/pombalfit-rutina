'use client'

import { useRef, useState, type FormEvent } from 'react'
import { Loader2, Lock } from 'lucide-react'
import type { LeadContact, QuizConfig } from '@/lib/quiz/types'
import { buildLeadPayload, readUtmParams, submitLead } from '@/lib/quiz/lead'
import { validateLead, type LeadFormErrors } from '@/lib/quiz/validation'
import { primaryButtonClass, screenHeadingClass } from './styles'
import { useFocusOnMount } from './use-focus-on-mount'
import { QuizTextField } from './quiz-text-field'

type QuizLeadFormProps = {
  config: QuizConfig
  answers: Record<string, string>
  contact: LeadContact
  onContactChange: (contact: LeadContact) => void
  privacyAccepted: boolean
  onPrivacyChange: (accepted: boolean) => void
  onSubmitted: () => void
}

export function QuizLeadForm({
  config,
  answers,
  contact,
  onContactChange,
  privacyAccepted,
  onPrivacyChange,
  onSubmitted,
}: QuizLeadFormProps) {
  const { leadForm } = config
  const headingRef = useFocusOnMount<HTMLHeadingElement>()
  const [errors, setErrors] = useState<LeadFormErrors>({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')
  const submittingRef = useRef(false)

  const updateField = (field: keyof LeadContact, value: string) => {
    const next = { ...contact, [field]: value }
    onContactChange(next)
    if (submitAttempted) setErrors(validateLead(next, privacyAccepted))
  }

  const updatePrivacy = (accepted: boolean) => {
    onPrivacyChange(accepted)
    if (submitAttempted) setErrors(validateLead(contact, accepted))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitAttempted(true)
    const nextErrors = validateLead(contact, privacyAccepted)
    setErrors(nextErrors)

    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      document.getElementById(`lead-${firstInvalid}`)?.focus()
      return
    }

    if (submittingRef.current) return
    submittingRef.current = true
    setStatus('submitting')
    try {
      const payload = buildLeadPayload(
        config,
        answers,
        contact,
        readUtmParams(window.location.search),
        window.location.href,
      )
      await submitLead(payload)
      onSubmitted()
    } catch {
      submittingRef.current = false
      setStatus('error')
    }
  }

  const isSubmitting = status === 'submitting'

  return (
    <section className="flex flex-1 flex-col pt-8 sm:pt-12" aria-labelledby="lead-title">
      <h1 id="lead-title" ref={headingRef} tabIndex={-1} className={screenHeadingClass}>
        {leadForm.title}
      </h1>
      <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground">{leadForm.description}</p>

      <form onSubmit={handleSubmit} noValidate className="mt-7 flex flex-col gap-4">
        <QuizTextField
          id="lead-name"
          label="Nombre"
          value={contact.name}
          onChange={(v) => updateField('name', v)}
          error={errors.name}
          autoComplete="given-name"
          placeholder="Tu nombre"
        />
        <QuizTextField
          id="lead-email"
          label="Email"
          type="email"
          inputMode="email"
          value={contact.email}
          onChange={(v) => updateField('email', v)}
          error={errors.email}
          autoComplete="email"
          placeholder="tu@email.com"
        />
        <QuizTextField
          id="lead-whatsapp"
          label="WhatsApp"
          type="tel"
          inputMode="tel"
          value={contact.whatsapp}
          onChange={(v) => updateField('whatsapp', v)}
          error={errors.whatsapp}
          autoComplete="tel"
          placeholder="+34 600 000 000"
        />

        <div className="mt-1">
          <label htmlFor="lead-privacy" className="flex cursor-pointer items-start gap-3 rounded-xl py-1">
            <input
              id="lead-privacy"
              type="checkbox"
              checked={privacyAccepted}
              onChange={(e) => updatePrivacy(e.target.checked)}
              aria-invalid={Boolean(errors.privacy)}
              aria-describedby={errors.privacy ? 'lead-privacy-error' : undefined}
              className="mt-0.5 size-5 shrink-0 cursor-pointer rounded accent-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
              required
            />
            <span className="text-sm leading-relaxed text-foreground">{leadForm.privacyConsentLabel}</span>
          </label>
          {errors.privacy && (
            <p id="lead-privacy-error" className="mt-1.5 pl-8 text-sm font-medium text-destructive">
              {errors.privacy}
            </p>
          )}
          <a
            href={leadForm.privacyPolicy.url}
            target={leadForm.privacyPolicy.openInNewTab ? '_blank' : undefined}
            rel={leadForm.privacyPolicy.openInNewTab ? 'noopener noreferrer' : undefined}
            className="mt-2 inline-block pl-8 text-sm font-semibold text-primary underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
          >
            {leadForm.privacyPolicy.label}
          </a>
        </div>

        {status === 'error' && (
          <p role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
            Vaya, no hemos podido enviar tus datos. Revisa tu conexión y vuelve a pulsar el botón para intentarlo de nuevo.
          </p>
        )}

        <button type="submit" disabled={isSubmitting} className={`${primaryButtonClass} mt-3`}>
          {isSubmitting ? (
            <>
              <Loader2 className="size-5 animate-spin" aria-hidden="true" />
              <span>ENVIANDO...</span>
            </>
          ) : (
            leadForm.submitLabel
          )}
        </button>

        <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="size-3.5" aria-hidden="true" />
          Tus datos están seguros. Nunca enviamos spam.
        </p>
      </form>
    </section>
  )
}
