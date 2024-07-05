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
import { DescriptionComponent, TermComponent } from '../Term'

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
  padding: ${({ active, theme }) => (active ? `13px 9px` : `14px 10px`)};
  display: flex;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  @media ${device.md} {
    padding: ${({ active, theme }) => (active ? `9px` : `10px`)};
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

const TermWrapper = styled.div`
  color: ${({ theme }) => theme.colors.darkerGray};
`

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 12px;
  margin: 40px 0 10px 0;
`

const PageLink = styled.a`
  color: ${({ theme }) => theme.colors.themeText};
  display: block;
  width: fit-content;
  font-weight: 700;
  font-size: 14px;
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
          <HighlightedText>オプチャ検定 </HighlightedText>に挑戦しよう！
        </Heading>
        {quizTopics.filter((t) => !t.disabled).length > 1 && (
          <DetailText>検定レベルを選択してください。</DetailText>
        )}
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
      <LinkWrapper>
        <PageLink href="https://openchat-review.me/accreditation/login" target="_blank">
          オプチャ検定｜問題投稿ページ
        </PageLink>
      </LinkWrapper>
      <TermWrapper>
        <DescriptionComponent />
      </TermWrapper>
      <TermWrapper>
        <TermComponent />
      </TermWrapper>
    </PageCenter>
  )
}

export default QuizTopicsScreen
