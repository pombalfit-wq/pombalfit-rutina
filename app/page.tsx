import { QuizApp } from '@/components/quiz/quiz-app'
import { rutinaQuiz } from '@/lib/quiz/configs/rutina'

export default function Page() {
  return <QuizApp config={rutinaQuiz} />
}
