import styled from 'styled-components'

import { AppLogo, StartIcon } from '../../config/icons'
import { useQuiz } from '../../context/QuizContext'
import {
  CenterCardContainer,
  HighlightedText,
  LogoContainer,
  PageCenter,
} from '../../styles/Global'
import { ScreenTypes } from '../../types'
import { convertSeconds, refreshPage } from '../../utils/helpers'

import Button from '../ui/Button'

const AppTitle = styled.h2`
  font-weight: 700;
  font-size: 26px;
  color: ${({ theme }) => theme.colors.themeColor};
  line-height: 1.5;
`

const DetailTextContainer = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-top: 15px;
  margin-bottom: 40px;
  text-align: center;
  max-width: 500px;
`

const DetailText = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-top: 15px;
  line-height: 1.3;
`

const Paragraph = styled.p`
  font-size: 15px;
  font-weight: 500;
  margin-top: 15px;
  line-height: 1.3;
`

const TopBtn = styled.div`
  color: ${({ theme }) => theme.colors.themeText};
  font-size: 15px;
  margin-top: 2rem;
  margin-bottom: -2rem;
  cursor: pointer;
  font-weight: 700;
`

const QuizDetailsScreen = () => {
  const { setCurrentScreen, quizDetails } = useQuiz()

  const { selectedQuizTopic, totalQuestions, /* totalScore, */ totalTime } = quizDetails

  const goToQuestionScreen = () => {
    setCurrentScreen(ScreenTypes.QuestionScreen)
  }

  const onClickRetry = () => {
    refreshPage()
  }

  return (
    <PageCenter light justifyCenter>
      <CenterCardContainer>
        <LogoContainer>
          <AppLogo />
        </LogoContainer>
        <Paragraph>問題集からランダムで出題されます。</Paragraph>
        <DetailTextContainer>
          <DetailText>
            検定レベル <HighlightedText>{selectedQuizTopic}</HighlightedText>
          </DetailText>
          <DetailText>
            出題数 <HighlightedText>{totalQuestions}</HighlightedText> 問
          </DetailText>
          {/* <DetailText>
            合計点数: <HighlightedText>{totalScore}</HighlightedText> 点
          </DetailText> */}
          <DetailText>
            制限時間 <HighlightedText>{convertSeconds(totalTime)}</HighlightedText>
          </DetailText>
        </DetailTextContainer>
        <Button
          text="スタート"
          icon={<StartIcon />}
          iconPosition="left"
          onClick={goToQuestionScreen}
          bold
        />
      </CenterCardContainer>
      <TopBtn onClick={onClickRetry}>トップに戻る</TopBtn>
    </PageCenter>
  )
}

export default QuizDetailsScreen
