import type { QuizConfig } from '../types'

export const rutinaQuiz: QuizConfig = {
  id: 'rutina-pombalfit',
  brand: 'PombalFit',

  welcome: {
    title: 'Rutina PombalFit',
    headline: '¿Quieres empezar a entrenar después de los 40 y no sabes por dónde empezar?',
    description:
      'Cuéntanos un poquito sobre ti y recibe GRATIS nuestra Guía definitiva para empezar a entrenar a partir de los 40, con un entrenamiento de 30 minutos para que puedas empezar desde casa.',
    cta: 'QUIERO MI RUTINA GRATIS',
    highlights: [
      'Especial mujeres +40',
      'Entrenamiento de fuerza',
      'Desde casa',
    ],
  },

  questions: [
    {
      id: 'edad',
      title: '¿Qué edad tienes?',
      options: [
        { value: 'menos_40', label: 'Menos de 40' },
        { value: '40_44', label: '40–44 años' },
        { value: '45_49', label: '45–49 años' },
        { value: '50_54', label: '50–54 años' },
        { value: '55_59', label: '55–59 años' },
        { value: '60_mas', label: '60 años o más' },
      ],
    },

    {
      id: 'objetivo',
      title: '¿Qué te gustaría conseguir principalmente con el entrenamiento?',
      options: [
        { value: 'perder_grasa', label: 'Perder grasa' },
        { value: 'tonificar', label: 'Tonificar y verme más firme' },
        { value: 'piernas_gluteos', label: 'Mejorar piernas y glúteos' },
        { value: 'fuerza_musculo', label: 'Ganar fuerza y masa muscular' },
        { value: 'energia', label: 'Tener más energía' },
        { value: 'forma_fisica', label: 'Mejorar mi forma física' },
        { value: 'sentirme_mejor', label: 'Cuidarme y sentirme mejor' },
      ],
    },

    {
      id: 'entrenamientoActual',
      title: '¿Entrenas actualmente?',
      options: [
        { value: 'nada', label: 'No entreno actualmente' },
        { value: 'ocasional', label: 'Entreno de vez en cuando' },
        { value: '1_2_dias', label: 'Entreno 1–2 días por semana' },
        { value: '3_dias', label: 'Entreno 3 días por semana' },
        { value: '4_mas', label: 'Entreno 4 o más días por semana' },
      ],
    },

    {
      id: 'experiencia',
      title: '¿Qué experiencia tienes entrenando?',
      options: [
        {
          value: 'principiante',
          label: 'Prácticamente ninguna, quiero empezar desde cero',
        },
        {
          value: 'abandono',
          label: 'He empezado varias veces, pero termino dejándolo',
        },
        {
          value: 'dudas',
          label: 'Entreno, pero no sé si estoy haciendo lo correcto',
        },
        {
          value: 'sin_resultados',
          label: 'Entreno regularmente, pero no consigo los resultados que busco',
        },
        {
          value: 'constante',
          label: 'Tengo experiencia y soy bastante constante',
        },
      ],
    },

    {
      id: 'dificultad',
      title: '¿Qué es lo que MÁS te está costando?',
      options: [
        { value: 'ejercicios', label: 'No sé qué ejercicios hacer' },
        { value: 'constancia', label: 'Me cuesta ser constante' },
        { value: 'tiempo', label: 'No tengo tiempo' },
        { value: 'sin_resultados', label: 'Entreno, pero no veo resultados' },
        { value: 'motivacion', label: 'Me falta motivación' },
        {
          value: 'progresar',
          label: 'No sé qué pesos utilizar ni cómo progresar',
        },
        {
          value: 'alimentacion',
          label: 'Siento que la alimentación está frenando mis resultados',
        },
        {
          value: 'no_se_empezar',
          label: 'Simplemente no sé por dónde empezar',
        },
      ],
    },

    {
      id: 'lugar',
      title: '¿Dónde prefieres entrenar?',
      options: [
        { value: 'casa', label: 'En casa' },
        { value: 'gimnasio', label: 'En el gimnasio' },
        { value: 'ambos', label: 'Combinar casa y gimnasio' },
      ],
    },

    {
      id: 'material',
      title: '¿Qué material tienes disponible para entrenar?',
      options: [
        { value: 'mancuernas', label: 'Mancuernas' },
        { value: 'bandas', label: 'Bandas elásticas' },
        { value: 'pesas', label: 'Kettlebell / pesas' },
        { value: 'banco', label: 'Banco o step' },
        { value: 'otro', label: 'Otro material' },
        { value: 'ninguno', label: 'No tengo material' },
      ],
    },

    {
      id: 'tiempo',
      title: '¿Cuánto tiempo podrías dedicar a cada entrenamiento?',
      options: [
        { value: '15_20', label: '15–20 minutos' },
        { value: '30', label: '30 minutos' },
        { value: '45', label: '45 minutos' },
        { value: '60', label: '60 minutos' },
        { value: 'depende', label: 'Depende del día' },
      ],
    },

    {
      id: 'etapa',
      title: '¿En qué etapa te encuentras actualmente?',
      options: [
        {
          value: 'antes',
          label: 'Todavía no estoy en perimenopausia',
        },
        { value: 'perimenopausia', label: 'Perimenopausia' },
        { value: 'menopausia', label: 'Menopausia' },
        { value: 'posmenopausia', label: 'Posmenopausia' },
        { value: 'no_se', label: 'No lo sé' },
        { value: 'no_responder', label: 'Prefiero no responder' },
      ],
    },

    {
      id: 'tipoAyuda',
      title: '¿Qué tipo de ayuda estás buscando en este momento? 💗',
      options: [
        {
          value: 'solo_rutina',
          label: 'Solo quiero una rutina para entrenar por mi cuenta',
        },
        {
          value: 'orientacion',
          label: 'Me gustaría tener algo de orientación para entrenar mejor',
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
    title: '¡Ya casi tienes tu guía! 💗',
    description:
      'Déjanos tus datos para guardar tus respuestas y acceder gratis a tu guía de entrenamiento PombalFit.',
    submitLabel: 'CONTINUAR Y CONSEGUIR MI GUÍA',
    privacyConsentLabel: 'He leído y acepto la Política de Privacidad.',
    privacyPolicy: {
      label: 'Política de Privacidad',
      url: 'https://pombalfit.com/politica-de-privacidad',
      openInNewTab: true,
    },
  },

  result: {
    title: '¡Tu guía está preparada, {name}! 💗',
    description:
      'Ya puedes acceder a tu Guía definitiva para empezar a entrenar a partir de los 40.',

    primaryCta: {
      label: 'DESCARGAR MI GUÍA GRATIS',
      url: 'PONDREMOS_AQUI_EL_ENLACE_DE_LA_GUIA',
      openInNewTab: true,
    },

    upsell: {
      title: '¿Quieres dar un paso más?',
      paragraphs: [
        'Esta rutina es un fantástico punto de partida, pero conseguir resultados requiere constancia y una estructura que puedas mantener.',
        'En PombalFit combinamos entrenamiento, alimentación y seguimiento para ayudarte a avanzar con un plan adaptado a tu nivel y a tu día a día.',
      ],

      cta: {
        label: 'QUIERO CONOCER POMBALFIT',
        url: 'https://pombalfit.com',
        openInNewTab: true,
      },

      consultCta: {
        label: 'HABLAR CON POMBALFIT POR WHATSAPP',
        url: `https://wa.me/34684693717?text=${encodeURIComponent(
          'Hola PombalFit, he hecho el quiz de rutina y me gustaría recibir información.'
        )}`,
        openInNewTab: true,
      },
    },
  },
}
