'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { LeadContact, QuizConfig } from '@/lib/quiz/types'
import { QuizHeader } from './quiz-header'
import { QuizWelcome } from './quiz-welcome'
import { QuizQuestionScreen } from './quiz-question'
import { QuizLeadForm } from './quiz-lead-form'
import { QuizWhatsapp } from './quiz-whatsapp'
import { QuizResult } from './quiz-result'
import { cn } from '@/lib/utils'

const AUTO_ADVANCE_DELAY_MS = 280

type Direction = 'forward' | 'back'

/**
 * Step layout:
 * 0 = welcome
 * 1..n = questions
 * n + 1 = lead form
 * n + 2 = WhatsApp community
 * n + 3 = result
 */
export function QuizApp({ config }: { config: QuizConfig }) {
  const totalQuestions = config.questions.length
  const leadStep = totalQuestions + 1
  const whatsappStep = totalQuestions + 2
  const resultStep = totalQuestions + 3

  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState<Direction>('forward')
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [contact, setContact] = useState<LeadContact>({
    name: '',
    email: '',
    whatsapp: '',
  })
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current)
    },
    [],
  )

  const goTo = useCallback((next: number, dir: Direction) => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current)
      advanceTimer.current = null
    }

    setDirection(dir)
    setStep(next)
    window.scrollTo({ top: 0 })
  }, [])

  const start = () => {
    setHasStarted(true)
    goTo(1, 'forward')
  }

  const goBack = () => {
    if (step > 0 && step < resultStep) {
      goTo(step - 1, 'back')
    }
  }

  const selectAnswer = (questionId: string, value: string) => {
    if (advanceTimer.current) return

    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))

    advanceTimer.current = setTimeout(() => {
      advanceTimer.current = null
      goTo(step + 1, 'forward')
    }, AUTO_ADVANCE_DELAY_MS)
  }

  const isQuestion = step >= 1 && step <= totalQuestions

  const question = isQuestion
    ? config.questions[step - 1]
    : null

  const progress =
    step === 0
      ? 0
      : step >= resultStep
        ? 1
        : step / (totalQuestions + 2)

  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-hidden bg-gradient-to-b from-secondary via-background to-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-accent/70 blur-3xl"
      />

      <QuizHeader
        brand={config.brand}
        progress={progress}
        showProgress={step > 0}
        canGoBack={step > 0 && step < resultStep}
        onBack={goBack}
        stepLabel={
          isQuestion
            ? `Pregunta ${step} de ${totalQuestions}`
            : step === leadStep
              ? 'Tus datos'
              : step === whatsappStep
                ? 'Último paso'
                : null
        }
      />

      <main className="relative mx-auto flex w-full max-w-lg flex-1 flex-col px-5 pb-10 sm:px-6">
        <div
          key={step}
          className={cn(
            'flex flex-1 flex-col animate-in fade-in duration-300 ease-out motion-reduce:animate-none',
            direction === 'forward'
              ? 'slide-in-from-right-8'
              : 'slide-in-from-left-8',
          )}
        >
          {step === 0 && (
            <QuizWelcome
              content={config.welcome}
              onStart={start}
            />
          )}

          {question && (
            <QuizQuestionScreen
              question={question}
              selectedValue={answers[question.id]}
              onSelect={(value) =>
                selectAnswer(question.id, value)
              }
              autoFocusHeading={hasStarted}
            />
          )}

          {step === leadStep && (
            <QuizLeadForm
              config={config}
              answers={answers}
              contact={contact}
              onContactChange={setContact}
              privacyAccepted={privacyAccepted}
              onPrivacyChange={setPrivacyAccepted}
              onSubmitted={() =>
                goTo(whatsappStep, 'forward')
              }
            />
          )}

          {step === whatsappStep && (
            <QuizWhatsapp
              onContinue={() =>
                goTo(resultStep, 'forward')
              }
            />
          )}

          {step === resultStep && (
            <QuizResult
              content={config.result}
              name={contact.name}
            />
          )}
        </div>
      </main>
    </div>
  )
}
