import { FC, useRef } from 'react'
import styled from 'styled-components'

import { device } from '../../../styles/BreakPoints'

import CodeSnippet from '../../ui/CodeSnippet'
import Answer from '../Answer'
import QuizImage from '../../ui/QuizImage'

const QuestionContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 40px;
  max-width: 88%;
  @media ${device.sm} {
    max-width: 100%;
  }
`

const AnswersContainer = styled.div`
  max-width: 78%;
  @media ${device.sm} {
    max-width: 100%;
  }
`

const QuestionStyle = styled.h2`
  font-size: clamp(18px, 4vw, 24px);
  font-weight: 500;
  margin-bottom: 25px;
  color: ${({ theme }) => theme.colors.primaryText};
  line-height: 1.4;
  overflow-wrap: anywhere;
  white-space: break-spaces;
  line-break: anywhere;
`

interface QuestionTypes {
  question: string
  code?: string
  image?: string
  type: string
  choices: string[]
  selectedAnswer: string[]
  handleAnswerSelection: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  id?: number
}

const Question: FC<QuestionTypes> = ({
  question,
  code,
  image,
  type,
  choices,
  selectedAnswer,
  handleAnswerSelection,
}) => {
  const isInit = useRef('')

  if (isInit.current !== question) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as any,
    })

    isInit.current = question
  }

  return (
    <QuestionContainer>
      <QuestionStyle>{question}</QuestionStyle>
      {/* if question contains code snippet then show code */}
      {code && <CodeSnippet code={code} language="javascript" />}
      {/* if question contains an image */}
      {image && <QuizImage image={image} />}
      <AnswersContainer>
        {choices.map((choice, index) => (
          <Answer
            choice={choice}
            index={index}
            key={index}
            onChange={(e) => handleAnswerSelection(e, index)}
            type={type}
            selectedAnswer={selectedAnswer}
          />
        ))}
      </AnswersContainer>
    </QuestionContainer>
  )
}

export default Question
