export type QuizOption = {
  value: string
  label: string
}

export type QuizQuestion = {
  id: string
  title: string
  options: QuizOption[]
}

export type QuizLink = {
  label: string
  url: string
  openInNewTab?: boolean
}

/**
 * Everything that makes a quiz unique lives in a QuizConfig.
 * To create a new quiz (e.g. "Rutinas PombalFit"), duplicate a file in
 * lib/quiz/configs and render <QuizApp config={...} /> from a new route.
 * Keep it serializable (no functions) so it can be passed from Server Components.
 */
export type QuizConfig = {
  id: string
  brand: string
  welcome: {
    title: string
    headline: string
    description: string
    cta: string
    highlights: string[]
  }
  questions: QuizQuestion[]
  leadForm: {
    title: string
    description: string
    submitLabel: string
    privacyConsentLabel: string
    privacyPolicy: QuizLink
  }
  result: {
    /** Use {name} as a placeholder for the user's first name. */
    title: string
    description: string
    primaryCta: QuizLink
    upsell: {
      title: string
      paragraphs: string[]
      cta: QuizLink
      consultCta?: QuizLink
    }
  }
}

export type LeadContact = {
  name: string
  email: string
  whatsapp: string
}

export type UtmParams = {
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_term: string | null
  utm_content: string | null
}

export type LeadAnswer = {
  questionId: string
  question: string
  answer: string
  answerValue: string
}

/** Flat, CRM/webhook-friendly payload sent to /api/leads. */
export type LeadPayload = LeadContact &
  UtmParams & {
    quizId: string
    registeredAt: string
   answer_1: string | null
answer_2: string | null
answer_3: string | null
answer_4: string | null
answer_5: string | null
answers: LeadAnswer[]
    pageUrl: string | null
  }
