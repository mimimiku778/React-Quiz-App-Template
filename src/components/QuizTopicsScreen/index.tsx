import styled from 'styled-components'

import { AppLogo } from '../../config/icons'
import { useQuiz } from '../../context/QuizContext'
import { quizTopics } from '../../data/quizTopics'
import { device } from '../../styles/BreakPoints'
import {
  CenterCardContainer,
  HighlightedText,
  LogoContainer,
  PageCenter,
} from '../../styles/Global'
import { ScreenTypes } from '../../types'

import Button from '../ui/Button'

const Heading = styled.h2`
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 10px;
  text-align: center;
  line-height: 1.5;
`

const DetailText = styled.p`
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  text-align: center;
`

const SelectButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 60%;
  gap: 30px;
  margin-top: 40px;
  margin-bottom: 45px;
  @media ${device.md} {
    row-gap: 20px;
    column-gap: 20px;
    max-width: 100%;
  }
`

interface SelectButtonProps {
  active: boolean
  disabled?: boolean
}

const SelectButton = styled.div<SelectButtonProps>`
  background-color: ${({ disabled, theme }) =>
    disabled ? `${theme.colors.disabledCard}` : `${theme.colors.selectTopicBg}`};
  border: ${({ active, theme }) =>
    active
      ? `2px solid ${theme.colors.themeColor}`
      : `1px solid ${theme.colors.disabledButton}`};
  transition: background-color 0.4s ease-out;
  border-radius: 10px;
  padding: 14px 10px;
  display: flex;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  @media ${device.md} {
    padding: 10px;
    tap-highlight-color: transparent;
    -webkit-tap-highlight-color: transparent;
  }
`

const SelectButtonText = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-left: 10px;
  @media ${device.md} {
    font-size: 16px;
    font-weight: 500;
  }
`
const Term = styled.div`
  font-size: 11px;
  color: #777;
  margin-top: 1rem;
  line-height: 1.5;
`

const QuizTopicsScreen: React.FC = () => {
  const { quizTopic, selectQuizTopic, setCurrentScreen } = useQuiz()

  const goToQuizDetailsScreen = () => {
    setCurrentScreen(ScreenTypes.QuizDetailsScreen)
  }

  return (
    <PageCenter light justifyCenter>
      <CenterCardContainer>
        <LogoContainer>
          <AppLogo />
        </LogoContainer>
        <Heading>
          <HighlightedText>オプチャ検定 </HighlightedText>の練習問題に挑戦しよう！
        </Heading>
        {quizTopics.length > 1 && <DetailText>検定レベルを選択してください。</DetailText>}
        <SelectButtonContainer>
          {quizTopics.map(({ title, icon, disabled }) => (
            <SelectButton
              key={title}
              active={quizTopic === title}
              onClick={() => !disabled && selectQuizTopic(title)}
              disabled={disabled}
            >
              {icon}
              <SelectButtonText>{title}</SelectButtonText>
            </SelectButton>
          ))}
        </SelectButtonContainer>
        <Button text="挑戦する" onClick={goToQuizDetailsScreen} bold />
      </CenterCardContainer>
      <Term>
        「オプチャ検定」はLINEオープンチャット非公式の検定です。
        LINEヤフー社はこの内容に関与していません。
        監修しているのは一部のLINEオープンチャット公認メンターです。
      </Term>
    </PageCenter>
  )
}

export default QuizTopicsScreen
