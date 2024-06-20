import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

import { AppLogo, CheckIcon, Next, TimerIcon } from '../../config/icons'
import { useQuiz } from '../../context/QuizContext'
import { useTimer } from '../../hooks'
import { device } from '../../styles/BreakPoints'
import { PageCenter } from '../../styles/Global'
import { ScreenTypes } from '../../types'

import Button from '../ui/Button'
import ModalWrapper from '../ui/ModalWrapper'
import Question from './Question'
import QuizHeader from './QuizHeader'
import { refreshPage } from '../../utils/helpers'

const QuizContainer = styled.div<{ selectedAnswer: boolean }>`
  width: 900px;
  min-height: 500px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 4px;
  padding: 30px 60px 80px 60px;
  margin-bottom: 70px;
  position: relative;
  @media ${device.md} {
    width: 100%;
    padding: 15px 15px 80px 15px;
  }
  button {
    span {
      svg {
        path {
          fill: ${({ selectedAnswer, theme }) =>
            selectedAnswer ? `${theme.colors.buttonText}` : `${theme.colors.darkGray}`};
        }
      }
    }
  }
`

const LogoContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  @media ${device.md} {
    margin-top: 10px;
    margin-bottom: 20px;
    svg {
      width: 185px;
      height: 80px;
    }
  }
`

const ButtonWrapper = styled.div`
  position: absolute;
  width: 100%;
  padding: 0 60px;
  left: 0;
  bottom: 30px;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  @media ${device.sm} {
    padding: 0 15px;
  }
`
const ContributorWrapper = styled.div`
  font-size: 12px;
  word-break: break-all;
  overflow-wrap: break-word;
  line-break: anywhere;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.darkerGray};
`

const ContributorNameLabel = styled.div`
  margin-bottom: 6px;
`

const TopBtn = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: 15px;
  margin-top: -1rem;
  margin-bottom: 1rem;
  cursor: pointer;
`

const QuestionScreen: FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<number>(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([])
  const [showTimerModal, setShowTimerModal] = useState<boolean>(false)
  const [showResultModal, setShowResultModal] = useState<boolean>(false)

  const {
    questions,
    quizDetails,
    result,
    setResult,
    setCurrentScreen,
    timer,
    setTimer,
    setEndTime,
  } = useQuiz()

  const currentQuestion = questions[activeQuestion]

  const { question, type, choices, code, image, correctAnswers, contributor, id } =
    currentQuestion

  const onClickNext = () => {
    const isMatch: boolean =
      selectedAnswer.length === correctAnswers.length &&
      selectedAnswer.every((answer) => correctAnswers.includes(answer))

    // adding selected answer, and if answer matches key to result array with current question
    setResult([...result, { ...currentQuestion, selectedAnswer, isMatch }])

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1)
    } else {
      // how long does it take to finish the quiz
      const timeTaken = quizDetails.totalTime - timer
      setEndTime(timeTaken)
      setShowResultModal(true)
    }
    setSelectedAnswer([])
  }

  const handleAnswerSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target

    if (type === 'MAQs') {
      if (selectedAnswer.includes(name)) {
        setSelectedAnswer((prevSelectedAnswer) =>
          prevSelectedAnswer.filter((element) => element !== name)
        )
      } else {
        setSelectedAnswer((prevSelectedAnswer) => [...prevSelectedAnswer, name])
      }
    }

    if (type === 'MCQs' || type === 'boolean') {
      if (checked) {
        setSelectedAnswer([name])
      }
    }
  }

  const handleModal = () => {
    setCurrentScreen(ScreenTypes.ResultScreen)
    document.body.style.overflow = 'auto'
  }

  // to prevent scrolling when modal is opened
  useEffect(() => {
    if (showTimerModal || showResultModal) {
      document.body.style.overflow = 'hidden'
    }
  }, [showTimerModal, showResultModal])

  // timer hooks, handle conditions related to time
  useTimer(timer, quizDetails, setEndTime, setTimer, setShowTimerModal, showResultModal)

  const onClickRetry = () => {
    refreshPage()
  }

  return (
    <PageCenter>
      <LogoContainer>
        <AppLogo />
      </LogoContainer>
      <QuizContainer selectedAnswer={selectedAnswer.length > 0}>
        <QuizHeader
          activeQuestion={activeQuestion}
          totalQuestions={quizDetails.totalQuestions}
          timer={timer}
        />
        <Question
          question={question}
          code={code}
          image={image}
          choices={choices}
          type={type}
          handleAnswerSelection={handleAnswerSelection}
          selectedAnswer={selectedAnswer}
          id={id}
        />
        <ButtonWrapper>
          <ContributorWrapper>
            {contributor && (
              <>
                <ContributorNameLabel>出題者</ContributorNameLabel>
                <ContributorWrapper>{contributor.name}</ContributorWrapper>
              </>
            )}
          </ContributorWrapper>
          <Button
            text={activeQuestion === questions.length - 1 ? '完了' : '次へ'}
            onClick={onClickNext}
            icon={<Next />}
            iconPosition="right"
            disabled={selectedAnswer.length === 0}
          />
        </ButtonWrapper>
      </QuizContainer>
      <TopBtn onClick={onClickRetry}>TOPに戻る</TopBtn>
      {/* timer or finish quiz modal*/}
      {(showTimerModal || showResultModal) && (
        <ModalWrapper
          title={showResultModal ? '完了!' : '時間切れ!'}
          subtitle={`合計 ${result.length} 個の問題に回答しました。`}
          onClick={handleModal}
          icon={showResultModal ? <CheckIcon /> : <TimerIcon />}
          buttonTitle="結果を見る"
        />
      )}
    </PageCenter>
  )
}

export default QuestionScreen
