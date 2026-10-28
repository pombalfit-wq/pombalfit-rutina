import type { QuizConfig } from '../types'

export const recetasQuiz: QuizConfig = {
  id: 'recetas-pombalfit',
  brand: 'PombalFit',
  
  welcome: {
    title: 'Recetas PombalFit',
    headline: 'Descubre qué tipo de recetas encajan mejor contigo',
    description:
      'Responde unas preguntas rápidas y descubre opciones fáciles y saludables pensadas para tu objetivo y tu día a día.',
    cta: 'EMPEZAR',
    highlights: ['5 preguntas', 'Menos de 1 minuto', 'Recetas fáciles'],
  },

  questions: [
    {
      id: 'objetivo',
      title: '¿Cuál es tu principal objetivo ahora mismo?',
      options: [
        { value: 'perder_grasa', label: 'Perder grasa' },
        { value: 'tonificar', label: 'Tonificar y ganar músculo' },
        { value: 'comer_saludable', label: 'Comer más saludable' },
        { value: 'organizar_comidas', label: 'Organizar mejor mis comidas' },
      ],
    },

    {
      id: 'dificultad',
      title: '¿Qué es lo que más te cuesta con la alimentación?',
      options: [
        { value: 'no_se_que_cocinar', label: 'No sé qué cocinar' },
        { value: 'poco_tiempo', label: 'Tengo poco tiempo' },
        { value: 'organizarme', label: 'Me cuesta organizarme' },
        { value: 'antojos', label: 'Tengo antojos o picoteo' },
        { value: 'constancia', label: 'Empiezo bien pero no soy constante' },
      ],
    },

    {
      id: 'edad',
      title: '¿En qué franja de edad estás?',
      options: [
        { value: 'menos_40', label: 'Menos de 40' },
        { value: '40_49', label: '40–49' },
        { value: '50_59', label: '50–59' },
        { value: '60_mas', label: '60 o más' },
      ],
    },

    {
      id: 'frase',
      title: '¿Qué frase te representa más ahora mismo?',
      options: [
        {
          value: 'no_se_empezar',
          label: 'Quiero perder peso y no sé por dónde empezar',
        },
        {
          value: 'sin_resultados',
          label: 'Como bastante bien, pero no veo resultados',
        },
        {
          value: 'ideas_faciles',
          label: 'Necesito ideas fáciles para no aburrirme',
        },
        {
          value: 'sin_dietas',
          label: 'Quiero aprender a comer sin hacer dietas imposibles',
        },
        {
          value: 'alimentacion_entreno',
          label: 'Quiero combinar alimentación y entrenamiento',
        },
      ],
    },

    {
      id: 'tipoAyuda',
      title: '¿Qué tipo de ayuda estás buscando en este momento? 💗',
      options: [
        {
          value: 'solo_recetas',
          label: 'Solo quiero ideas y recetas para cuidarme por mi cuenta',
        },
        {
          value: 'orientacion',
          label: 'Me gustaría mejorar mi alimentación con algo de orientación',
        },
        {
          value: 'plan_personalizado',
          label: 'Busco un plan de nutrición y entrenamiento adaptado a mí',
        },
        {
          value: 'asesoramiento',
          label: 'Me gustaría que me asesoraseis para saber qué opción me conviene',
        },
        {
          value: 'quiero_contacto',
          label: 'Quiero que me contactéis para recibir información',
        },
      ],
    },
  ],

  leadForm: {
    title: '¡Ya casi está! 💗',
    description:
      'Déjanos tus datos para acceder a tus recetas y recomendaciones PombalFit.',
    submitLabel: 'QUIERO MIS RECETAS',
    privacyConsentLabel: 'He leído y acepto la Política de Privacidad.',
    privacyPolicy: {
      label: 'Política de Privacidad',
      url: 'https://pombalfit.com/politica-de-privacidad',
      openInNewTab: true,
    },
  },

  result: {
    title: '¡Listo, {name}! 💗',
    description: 'Ya puedes acceder a tus recetas PombalFit.',

    primaryCta: {
      label: 'VER MIS RECETAS',
      url: 'https://drive.google.com/uc?export=download&id=1Dl3dtuf-X5VaZejDUE7t0_QJV2yetYYY',
      openInNewTab: true,
    },

    upsell: {
      title: '¿Quieres ir un paso más allá?',
      paragraphs: [
        'Las recetas pueden ayudarte, pero los resultados llegan cuando alimentación y entrenamiento están adaptados a ti.',
        'En PombalFit te ayudamos con un plan de nutrición y entrenamiento adaptado a tu objetivo, nivel y estilo de vida.',
      ],

      cta: {
        label: 'QUIERO INFORMACIÓN SOBRE POMBALFIT',
        url: 'https://pombalfit.com',
        openInNewTab: true,
      },

      consultCta: {
        label: 'QUIERO UNA CONSULTA PERSONAL',
        url: `https://wa.me/34684693717?text=${encodeURIComponent(
          'Hola PombalFit, he hecho el quiz de recetas y me gustaría una consulta personal.'
        )}`,
        openInNewTab: true,
      },
    },
  },
}
