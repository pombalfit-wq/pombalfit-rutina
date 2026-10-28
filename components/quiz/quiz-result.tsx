'use client'

import { CheckCircle2, Download, MessageCircle, Sparkles } from 'lucide-react'
import type { QuizConfig, QuizLink } from '@/lib/quiz/types'
import { primaryButtonClass, screenHeadingClass, secondaryButtonClass } from './styles'
import { useFocusOnMount } from './use-focus-on-mount'

function linkProps(link: QuizLink) {
  return link.openInNewTab
    ? { href: link.url, target: '_blank', rel: 'noopener noreferrer' }
    : { href: link.url }
}

export function QuizResult({ content, name }: { content: QuizConfig['result']; name: string }) {
  const headingRef = useFocusOnMount<HTMLHeadingElement>()
  const firstName = name.trim().split(/\s+/)[0] ?? ''
  const title = content.title.replace('{name}', firstName)

  return (
    <div className="flex flex-1 flex-col gap-8 pt-10 sm:pt-14">
      <section className="text-center" aria-labelledby="result-title">
        <div
          aria-hidden="true"
          className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-accent text-primary animate-in zoom-in-50 duration-500 motion-reduce:animate-none"
        >
          <CheckCircle2 className="size-10" strokeWidth={1.75} />
        </div>
        <h1 id="result-title" ref={headingRef} tabIndex={-1} className={`${screenHeadingClass} sm:text-4xl`}>
          {title}
        </h1>
        <p className="mt-3 text-pretty text-lg text-muted-foreground">{content.description}</p>
        <a {...linkProps(content.primaryCta)} className={`${primaryButtonClass} mt-8`}>
          <Download className="size-5" aria-hidden="true" />
          {content.primaryCta.label}
        </a>
      </section>

      <section
        aria-labelledby="upsell-title"
        className="rounded-3xl border border-border bg-secondary p-6 sm:p-8"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
          <Sparkles className="size-3.5" aria-hidden="true" />
          PombalFit
        </span>
        <h2 id="upsell-title" className="mt-4 text-balance text-xl font-bold leading-snug text-foreground sm:text-2xl">
          {content.upsell.title}
        </h2>
        <div className="mt-3 flex flex-col gap-3 text-pretty text-base leading-relaxed text-muted-foreground">
          {content.upsell.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3">
          {content.upsell.consultCta ? (
            <a {...linkProps(content.upsell.consultCta)} className={primaryButtonClass}>
              <MessageCircle className="size-5" aria-hidden="true" />
              {content.upsell.consultCta.label}
            </a>
          ) : null}
          <a {...linkProps(content.upsell.cta)} className={secondaryButtonClass}>
            {content.upsell.cta.label}
          </a>
        </div>
      </section>
    </div>
  )
}
