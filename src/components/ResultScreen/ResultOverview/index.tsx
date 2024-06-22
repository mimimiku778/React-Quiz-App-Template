import { FC, useRef } from 'react'
import styled from 'styled-components'

import { useQuiz } from '../../../context/QuizContext'
import { device } from '../../../styles/BreakPoints'
import { HighlightedText } from '../../../styles/Global'
import { convertSeconds } from '../../../utils/helpers'
import { Result } from '../../../types'

const ResultOverviewStyle = styled.div`
  text-align: center;
  margin-bottom: 70px;
  @media ${device.md} {
    margin-bottom: 30px;
  }
  p {
    margin-top: 15px;
    font-weight: 500;
    font-size: 18px;
  }
`

const Score = styled.div<{ right: boolean }>`
  color: ${({ right, theme }) =>
    right ? `${theme.colors.success}` : `${theme.colors.danger}`};
  font-size: 26px;
  font-weight: bold;
`

interface ResultOverviewProps {
  result: Result[]
}

const ResultOverview: FC<ResultOverviewProps> = ({ result }) => {
  const { quizDetails, endTime } = useQuiz()

  const isInit = useRef(0)

  if (isInit.current !== endTime) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as any,
    })

    isInit.current = endTime
  }

  const totalQuestionAttempted = result.length

  const obtainedScore = result
    .filter((item) => item.isMatch && typeof item.score === 'number')
    .reduce((accumulator, currentValue) => accumulator + (currentValue.score || 0), 0)

  // Passed if 60 or more than 60% marks
  const calculateStatus =
    (obtainedScore / quizDetails.totalScore) * 100 >= 90 ? '合格' : '不合格'

  const endTimeString = convertSeconds(endTime)

  return (
    <ResultOverviewStyle>
      {quizDetails.totalQuestions === 1 && totalQuestionAttempted && (
        <p>
          <HighlightedText>
            <Score right={!!obtainedScore}>
              {obtainedScore ? '正解' : result[0].selectedAnswer ? '不正解' : '時間切れ'}
            </Score>
          </HighlightedText>
        </p>
      )}
      <p>
        練習レベル <HighlightedText> {quizDetails.selectedQuizTopic} </HighlightedText>{' '}
      </p>
      {quizDetails.totalQuestions > 1 && (
        <>
          <p>
            結果 <HighlightedText> {calculateStatus}</HighlightedText>
          </p>
          <p>
            正解 <HighlightedText> {obtainedScore} </HighlightedText>/{' '}
            {quizDetails.totalScore}
          </p>
        </>
      )}
      {/* <p>
        回答した問題数: <HighlightedText> {totalQuestionAttempted} </HighlightedText>/{' '}
        {quizDetails.totalQuestions}
      </p> */}
      <p>
        経過時間{' '}
        <HighlightedText>{endTimeString ? endTimeString : '0 秒'}</HighlightedText>
      </p>
    </ResultOverviewStyle>
  )
}

export default ResultOverview
