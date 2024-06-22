import { createContext, useContext } from 'react'
import { QuizContextTypes, ScreenTypes } from '../types'
import { react } from '../data/QuizQuestions/react'

export const initialState: QuizContextTypes = {
  currentScreen: ScreenTypes.SplashScreen,
  setCurrentScreen: () => {},
  quizTopic: 'ブロンズ',
  selectQuizTopic: () => {},
  questions: [],
  setQuestions: () => {},
  result: [],
  setResult: () => {},
  timer: 15,
  setTimer: () => {},
  endTime: 0,
  setEndTime: () => {},
  quizDetails: {
    totalQuestions: react.totalQuestions,
    totalScore: 0,
    totalTime: 0,
    selectedQuizTopic: 'ブロンズ',
  },
}

export const QuizContext = createContext<QuizContextTypes>(initialState)

export function useQuiz() {
  return useContext(QuizContext)
}
