import { QuizApp } from '@/components/quiz/quiz-app'
import { recetasQuiz } from '@/lib/quiz/configs/recetas'

export default function Page() {
  return <QuizApp config={recetasQuiz} />
}
