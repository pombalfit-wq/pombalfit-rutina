import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type QuizTextFieldProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  type?: 'text' | 'email' | 'tel'
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode']
  autoComplete?: string
  placeholder?: string
}

export function QuizTextField({
  id,
  label,
  value,
  onChange,
  error,
  type = 'text',
  inputMode,
  autoComplete,
  placeholder,
}: QuizTextFieldProps) {
  const errorId = `${id}-error`

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-foreground">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        required
        className={cn(
          'h-14 w-full rounded-2xl border-2 bg-background px-4 text-base text-foreground placeholder:text-muted-foreground/60 transition-colors',
          'focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15',
          error ? 'border-destructive' : 'border-input hover:border-primary/40',
        )}
      />
      {error && (
        <p id={errorId} className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
