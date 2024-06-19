/* import { javascript } from './javascript'
import { python } from './python' */
import { react } from './react'

// Question Types
// 1. MCQs | Multiple Choice | single
// 2. boolean | true/false | single
// 3. MAQs | Multiple Answers | multiple

type Choice = string
type CorrectAnswers = string[]

export type Contributor = { name: string; roomName?: string; url?: string }

export type Source = { title: string; url: string; }

export type Question = {
  question: string
  choices: Choice[]
  type: 'MCQs' | 'MAQs' | 'boolean'
  correctAnswers: CorrectAnswers
  score: number
  code?: string
  image?: string
  contributor?: Contributor
  explanation?: string
  source?: Source
  id?: number
}

export type Topic = {
  topic: string
  totalQuestions: number
  totalScore: number
  totalTime: number
  questions: Question[]
}

export const quiz: Record<string, Topic> = {
  'ブロンズ': react,
  /* 'シルバー': javascript,
  'ゴールド': python, */
}
