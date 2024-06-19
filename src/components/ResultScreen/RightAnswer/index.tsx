import { FC } from 'react'
import styled from 'styled-components'

import { HighlightedText } from '../../../styles/Global'

interface RightAnswerProps {
  correctAnswers: string[]
  choices: string[]
  isMatch: boolean
  explanation?: string
}

const RightAnswerContainer = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkerGray};
  margin-top: 15px;
  line-height: 1.2;
`

const Correct = styled.span`
  font-weight: 500;
  font-size: 16px;
  color: #12b40e;
  margin-bottom: 15px;
  display: block;
`
const InCorrect = styled.span`
  font-weight: 500;
  font-size: 16px;
  color: #ff143e;
  margin-bottom: 15px;
  display: block;
`

const RightAnswer: FC<RightAnswerProps> = ({
  correctAnswers,
  choices,
  isMatch,
  explanation,
}) => {
  return (
    <>
      <RightAnswerContainer>
        {isMatch && <Correct>正解</Correct>}
        {!isMatch && (
          <>
            <InCorrect>不正解</InCorrect>
            {`正解: `}
            {correctAnswers.map((item: string, index: number) => {
              const label = String.fromCharCode(65 + choices.indexOf(item))

              return (
                <HighlightedText key={index} themeText>
                  {`${label} (${item})${index !== correctAnswers.length - 1 ? ', ' : ''}`}
                </HighlightedText>
              )
            })}
          </>
        )}
      </RightAnswerContainer>
      {explanation && (
        <RightAnswerContainer>
          {`解説: `}
          <HighlightedText themeText>{explanation}</HighlightedText>
        </RightAnswerContainer>
      )}
    </>
  )
}

export default RightAnswer
