'use client'

import { useState } from 'react'

type QuizWhatsappProps = {
  onContinue: () => void
}

export function QuizWhatsapp({ onContinue }: QuizWhatsappProps) {
  const [whatsappClicked, setWhatsappClicked] = useState(false)

  const whatsappUrl =
    'https://chat.whatsapp.com/Krv47ke51IrFkIdmSNddfG'

  const handleWhatsappClick = () => {
    setWhatsappClicked(true)
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="flex flex-1 flex-col justify-center py-10 text-center">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-4 text-4xl" aria-hidden="true">
          🎁
        </div>

        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground">
          ¡Tu recetario está casi listo!
        </h1>

        <p className="mt-4 text-pretty text-base leading-7 text-muted-foreground">
          Antes de acceder a tus recetas, únete gratis a la comunidad de
          WhatsApp PombalFit 💗
        </p>

        <p className="mt-3 text-pretty text-sm leading-6 text-muted-foreground">
          Compartimos recetas, consejos y contenido para ayudarte a seguir
          cuidándote.
        </p>

        <button
          type="button"
          onClick={handleWhatsappClick}
          className="mt-8 w-full rounded-2xl bg-[#25D366] px-6 py-4 text-base font-bold text-white shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        >
          UNIRME AL GRUPO DE WHATSAPP →
        </button>

        <div className="mt-5">
          <button
            type="button"
            onClick={onContinue}
            disabled={!whatsappClicked}
            className="w-full rounded-2xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-sm transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            {whatsappClicked
              ? 'YA ME HE UNIDO · CONTINUAR →'
              : 'ÚNETE AL GRUPO PARA CONTINUAR'}
          </button>
        </div>

        {!whatsappClicked && (
          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            Pulsa primero el botón de WhatsApp para continuar y acceder a tus
            recetas.
          </p>
        )}
      </div>
    </section>
  )
}
