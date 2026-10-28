import { ArrowRight, Clock, Heart, Salad } from 'lucide-react'
import type { QuizConfig } from '@/lib/quiz/types'
import { primaryButtonClass } from './styles'

const HIGHLIGHT_ICONS = [Heart, Clock, Salad]

export function QuizWelcome({ content, onStart }: { content: QuizConfig['welcome']; onStart: () => void }) {
  return (
    <section className="flex flex-1 flex-col justify-center py-8 text-center" aria-labelledby="welcome-title">
      <div aria-hidden="true" className="mx-auto mb-8 flex items-center justify-center">
        <div className="relative flex size-28 items-center justify-center rounded-full bg-accent">
          <div className="flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_16px_40px_-12px_rgba(217,43,112,0.7)]">
            <Salad className="size-9" strokeWidth={1.75} />
          </div>
          <span className="absolute -right-1 top-2 flex size-9 items-center justify-center rounded-full bg-background text-primary shadow-md">
            <Heart className="size-4 fill-current" />
          </span>
        </div>
      </div>

      <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">{content.title}</p>
      <h1 id="welcome-title" className="mt-4 text-balance text-[2rem] font-extrabold leading-[1.12] tracking-tight text-foreground sm:text-[2.5rem]">
        {content.headline}
      </h1>
      <p className="mx-auto mt-5 max-w-sm text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
        {content.description}
      </p>

      <ul className="mt-8 flex flex-wrap justify-center gap-2" aria-label="Qué incluye">
        {content.highlights.map((item, i) => {
          const Icon = HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length]
          return (
            <li
              key={item}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3.5 py-2 text-sm font-medium text-foreground"
            >
              <Icon className="size-4 text-primary" aria-hidden="true" />
              {item}
            </li>
          )
        })}
      </ul>

      <div className="mt-10">
        <button type="button" onClick={onStart} className={primaryButtonClass}>
          {content.cta}
          <ArrowRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
