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
import { HeaderDescText, TermComponent } from '../Term'

const QuizContainer = styled.div<{ selectedAnswer: boolean; isSingle: boolean }>`
  width: 900px;
  min-height: ${({ isSingle }) => (!isSingle ? '500px' : '0')};
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 4px;
  padding: 30px 60px ${({ isSingle }) => (!isSingle ? '80px' : '0')} 60px;
  margin-bottom: ${({ isSingle }) => (!isSingle ? '70px' : '0')};
  position: relative;
  @media ${device.md} {
    width: 100%;
    padding: 15px 15px ${({ isSingle }) => (!isSingle ? '80px' : '0')} 15px;
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

const TopBtn = styled.div<{ isSingle: boolean }>`
  color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
  margin-top: ${({ isSingle }) => (!isSingle ? '-1rem' : '3rem')};
  margin-bottom: 1rem;
  cursor: pointer;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  border-radius: 10px;
  min-height: 40px;
  min-width: 150px;
`

const TermWrapper = styled.div`
  color: ${({ theme }) => theme.colors.white};
`

const SiteDescWrapper = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 16px;
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

  const isSingleQuiz = quizDetails.totalQuestions === 1

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

  const isSelected = selectedAnswer.length > 0

  useEffect(() => {
    isSelected && isSingleQuiz && onClickNext()
  }, [isSelected])

  const handleModal = () => {
    setCurrentScreen(ScreenTypes.ResultScreen)
    document.body.style.overflow = 'auto'
  }

  // to prevent scrolling when modal is opened
  useEffect(() => {
    if (showResultModal && isSingleQuiz) {
      setCurrentScreen(ScreenTypes.ResultScreen)
      return
    }

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
    <PageCenter initPaddingTop>
      <LogoContainer>
        <AppLogo />
      </LogoContainer>
      <QuizContainer selectedAnswer={selectedAnswer.length > 0} isSingle={isSingleQuiz}>
        <QuizHeader
          isSingle={isSingleQuiz}
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
        {!isSingleQuiz && (
          <ButtonWrapper>
            {contributor && (
              <ContributorWrapper>
                <>
                  <ContributorNameLabel>出題者</ContributorNameLabel>
                  <ContributorWrapper>{contributor.name}</ContributorWrapper>
                </>
              </ContributorWrapper>
            )}
            <Button
              text={activeQuestion === questions.length - 1 ? '完了' : '次へ'}
              onClick={onClickNext}
              icon={<Next />}
              iconPosition="right"
              disabled={selectedAnswer.length === 0}
            />
          </ButtonWrapper>
        )}
      </QuizContainer>
      {!isSingleQuiz && (
        <TopBtn onClick={onClickRetry} isSingle={isSingleQuiz}>
          トップに戻る
        </TopBtn>
      )}
      {/* timer or finish quiz modal*/}
      {(showTimerModal || (showResultModal && !isSingleQuiz)) && (
        <ModalWrapper
          title={showResultModal ? '完了!' : '時間切れ!'}
          subtitle={!isSingleQuiz ? `合計 ${result.length} 個の問題に回答しました。` : ''}
          onClick={handleModal}
          icon={showResultModal ? <CheckIcon /> : <TimerIcon />}
          buttonTitle={!isSingleQuiz ? `結果を見る` : '解説を見る'}
        />
      )}

      {isSingleQuiz && (
        <>
          <TopBtn onClick={onClickRetry} isSingle={isSingleQuiz}>
            <div>トップへ</div>
          </TopBtn>
          <SiteDescWrapper>
            <HeaderDescText />
          </SiteDescWrapper>
          <TermWrapper>
            <TermComponent />
          </TermWrapper>
        </>
      )}
    </PageCenter>
  )
}

export default QuestionScreen
