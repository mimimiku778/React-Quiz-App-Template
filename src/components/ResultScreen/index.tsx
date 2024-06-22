import { FC, useEffect } from 'react'
import styled, { css } from 'styled-components'

import { AppLogo, Refresh } from '../../config/icons'
import { useQuiz } from '../../context/QuizContext'
import { device } from '../../styles/BreakPoints'
import { Flex, LogoContainer, ResizableBox } from '../../styles/Global'
import { refreshPage } from '../../utils/helpers'

import Button from '../ui/Button'
import CodeSnippet from '../ui/CodeSnippet'
import QuizImage from '../ui/QuizImage'
import ResultOverview from './ResultOverview'
import RightAnswer from './RightAnswer'
import TermComponent from '../Term'

const ResultScreenContainer = styled.div`
  max-width: 900px;
  margin: 60px auto;
  @media ${device.md} {
    width: 90%;
    margin: 30px auto;
    padding-top: 40px;
  }
`

const InnerContainer = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 4px;
  margin: 0 auto;
  margin-bottom: 40px;
  padding: 40px 90px 90px 90px;
  @media ${device.md} {
    padding: 15px;
  }
`

const QuestionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  @media ${device.md} {
    flex-direction: column;
  }
`

const QuestionId = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.darkerGray};
  margin-bottom: calc(clamp(13px, calc(10px + 6 * ((100vw - 600px) / 1320)), 16px) * -1);
  padding-bottom: 8px;
  margin-top: -8px;
  @media ${device.md} {
    text-align: right;
  }
`

const QuestionNumber = styled.h6`
  font-size: clamp(16px, 5vw, 24px);
  font-weight: 500;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.primaryText};
`

const QuestionStyle = styled.span`
  font-size: clamp(16px, 5vw, 24px);
  font-weight: 500;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.primaryText};
  margin-bottom: 20px;
  @media ${device.md} {
    margin-bottom: 10px;
  }
`

interface AnswerProps {
  correct?: boolean
  wrong?: boolean
}

const Answer = styled.li<AnswerProps>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 90%;
  @media ${device.md} {
    width: 100%;
  }
  background: ${({ theme }) => theme.colors.answerBg};
  border-radius: 16px;
  font-size: clamp(16px, 5vw, 18px);
  font-weight: 600;
  line-height: 1.4;
  padding: 15px;
  color: ${({ theme }) => theme.colors.secondaryText};
  margin-top: clamp(13px, calc(10px + 6 * ((100vw - 600px) / 1320)), 16px);

  // if user answer matches to correct answer make answer background success color otherwise danger color
  ${({ correct }) =>
    correct &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.success};
      background-color: ${({ theme }) => theme.colors.successLight};
    `}

  ${({ wrong }) =>
    wrong &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.danger};
      background-color: ${({ theme }) => theme.colors.dangerLight};
    `}

  span {
    margin-right: 14px;
  }

  @media ${device.md} {
    font-weight: 400;
  }
`

const TermWrapper = styled.div`
  margin-top: 2rem;
  color: ${({ theme }) => theme.colors.darkerGray};
`

/* const Score = styled.span<{ right: boolean }>`
  font-weight: 500;
  font-size: 16px;
  color: ${({ right, theme }) =>
    right ? `${theme.colors.success}` : `${theme.colors.danger}`};
  margin-top: 4px;
  @media ${device.md} {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    margin-right: 10px;
  }
` */

const ResultScreen: FC = () => {
  const { result, questions, setResult } = useQuiz()

  const onClickRetry = () => {
    refreshPage()
  }

  useEffect(() => {
    if (!result.length) {
      setResult([{ ...questions[0], selectedAnswer: '', isMatch: '' }])
    }
  }, [])

  return (
    <ResultScreenContainer>
      <LogoContainer>
        <AppLogo />
      </LogoContainer>
      <InnerContainer>
        <ResultOverview result={result} />
        {result.map(
          (
            {
              question,
              choices,
              code,
              image,
              correctAnswers,
              selectedAnswer,
              /* score, */
              isMatch,
              explanation,
              contributor,
              source,
              id,
            },
            index: number
          ) => {
            return (
              <QuestionContainer key={question}>
                <ResizableBox width="100%">
                  <Flex gap="4px">
                    {questions.length < 1 && (
                      <QuestionNumber>{`${index + 1}. `}</QuestionNumber>
                    )}
                    <QuestionStyle>{question}</QuestionStyle>
                  </Flex>
                  {id && <QuestionId>問題ID {id}</QuestionId>}
                  <div>
                    {code && <CodeSnippet code={code} language="javascript" />}
                    {image && <QuizImage image={image} />}
                    <ul>
                      {choices.map((ans: string, index: number) => {
                        // Convert index to alphabet character
                        const label = String.fromCharCode(65 + index)
                        const correct =
                          selectedAnswer.includes(ans) && correctAnswers.includes(ans)
                        const wrong =
                          selectedAnswer.includes(ans) && !correctAnswers.includes(ans)

                        return (
                          <Answer key={ans} correct={correct} wrong={wrong}>
                            <span>{label}.</span>
                            {ans}
                          </Answer>
                        )
                      })}
                    </ul>
                    <RightAnswer
                      correctAnswers={correctAnswers}
                      choices={choices}
                      isMatch={isMatch}
                      explanation={explanation}
                      contributor={contributor}
                      source={source}
                      id={id}
                    />
                  </div>
                </ResizableBox>
                {/* <Score right={isMatch}>{`${isMatch ? score : 0} 点`}</Score> */}
              </QuestionContainer>
            )
          }
        )}
      </InnerContainer>
      <Flex flxEnd>
        <Button
          text="TOP"
          onClick={onClickRetry}
          icon={<Refresh />}
          iconPosition="left"
          bold
        />
      </Flex>
      <TermWrapper>
        <TermComponent />
      </TermWrapper>
    </ResultScreenContainer>
  )
}

export default ResultScreen
