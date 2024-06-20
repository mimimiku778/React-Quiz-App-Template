import { ReactNode } from 'react'
import { ReactComponent as Bronze } from '../assets/icons/bronze.svg'
import { ReactComponent as Silver } from '../assets/icons/silver.svg'
import { ReactComponent as Glod } from '../assets/icons/gold.svg'

type QuizTopic = {
  title: string
  icon: ReactNode
  disabled?: boolean
}

export const quizTopics: QuizTopic[] = [
  {
    title: 'ブロンズ',
    icon: <Bronze />,
  },
  {
    title: 'シルバー',
    icon: <Silver />,
    disabled: true,
  },
  {
    title: 'ゴールド',
    icon: <Glod />,
    disabled: true,
  },
]
