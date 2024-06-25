import { ReactNode } from 'react'
import { ReactComponent as Bronze } from '../assets/icons/bronze.svg'
import { ReactComponent as Silver } from '../assets/icons/silver.svg'
import { ReactComponent as Glod } from '../assets/icons/gold.svg'
import { javascript } from './QuizQuestions/javascript'
import { python } from './QuizQuestions/python'
import { react } from './QuizQuestions/react'

type QuizTopic = {
  title: string
  icon: ReactNode
  disabled?: boolean
}

export const quizTopics: QuizTopic[] = [
  {
    title: react.topic,
    icon: <Bronze />,
  },
  {
    title: 'シルバー',
    icon: <Silver />,
    disabled: !javascript,
  },
  {
    title: 'ゴールド',
    icon: <Glod />,
    disabled: !python,
  },
]
