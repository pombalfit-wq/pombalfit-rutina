import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

type QuizHeaderProps = {
  brand: string
  progress: number
  showProgress: boolean
  canGoBack: boolean
  onBack: () => void
  stepLabel: string | null
}

export function QuizHeader({ brand, progress, showProgress, canGoBack, onBack, stepLabel }: QuizHeaderProps) {
  const percent = Math.round(progress * 100)

  return (
    <header className="relative z-10 mx-auto w-full max-w-lg px-5 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6">
      <div className="flex h-12 items-center justify-between">
        <div className="w-24">
          <button
            type="button"
            onClick={onBack}
            className={cn(
              '-ml-2 inline-flex h-11 items-center gap-1 rounded-full pl-1 pr-3 text-sm font-semibold text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25',
              canGoBack ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
            aria-hidden={!canGoBack}
            tabIndex={canGoBack ? 0 : -1}
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
            Atrás
          </button>
        </div>

        <span className="text-base font-extrabold tracking-tight text-foreground">
          Pombal<span className="text-primary">Fit</span>
          <span className="sr-only">{` · ${brand}`}</span>
        </span>

        <div className="w-24 text-right text-xs font-medium text-muted-foreground" aria-live="polite">
          {stepLabel && (
            <>
              <span aria-hidden="true">{stepLabel.replace('Pregunta ', '').replace(' de ', '/')}</span>
              <span className="sr-only">{stepLabel}</span>
            </>
          )}
        </div>
      </div>

      <div
        className={cn('mt-2 h-1 w-full overflow-hidden rounded-full bg-accent transition-opacity duration-300', showProgress ? 'opacity-100' : 'opacity-0')}
        role="progressbar"
        aria-label="Progreso del cuestionario"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-hidden={!showProgress}
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </header>
  )
}
