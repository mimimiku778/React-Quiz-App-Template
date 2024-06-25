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
import { TermComponent } from '../Term'

import { ReactComponent as CopyIcon } from '../../assets/icons/copy_icon_c.svg'

const ResultScreenContainer = styled.div`
  max-width: 900px;
  margin: 60px auto;
  @media ${device.md} {
    width: 90%;
    margin: 0px auto 30px auto;
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
  flex-direction: column;
  @media ${device.md} {
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
  font-size: clamp(18px, 4vw, 24px);
  font-weight: 500;
  line-height: 1.4;
  overflow-wrap: anywhere;
  white-space: break-spaces;
  line-break: anywhere;
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
  overflow-wrap: anywhere;
  white-space: break-spaces;
  line-break: anywhere;

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

const ShareButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  gap: 12px;
`

const ShareTitle = styled.div`
  font-size: 13px;
  font-weight: bold;
  line-height: 1;
  margin: auto 0;
`

const ShareButton = styled.a`
  width: 32px;
  height: 32px;
  display: flex;
`

const LinkButton = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    rect {
      stroke: ${({ theme }) => theme.colors.appLogo};
    }
    path {
      fill: ${({ theme }) => theme.colors.appLogo};
    }
  }
`

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 50px;
`

const PageLink = styled.a`
  color: ${({ theme }) => theme.colors.themeText};
  display: block;
  width: fit-content;
  font-weight: 700;
  font-size: 18px;
`

interface ShareIconProps {
  url: string
  width?: number
  height?: number
  borderRadius?: number
  backgroundColor?: string
}

const ShareIcon = styled.span<ShareIconProps>`
  width: ${({ width }) => width ?? 32}px;
  height: ${({ height }) => height ?? 32}px;
  display: block;
  margin: auto;
  background-image: url(${({ url }) => url});
  background-repeat: no-repeat;
  background-size: contain;
  background-color: ${({ backgroundColor }) => backgroundColor ?? 'inherit'};
  border-radius: ${({ borderRadius }) => borderRadius ?? 6}px;
`

const ResultScreen: FC = () => {
  const { result, questions, setResult } = useQuiz()

  const onClickRetry = () => {
    refreshPage()
  }

  async function copyUrl(text: string) {
    try {
      await window.navigator.clipboard.writeText(text)
      alert('リンクをコピーしました')
    } catch {
      alert('コピーできませんでした\n(非対応ブラウザ)')
    }
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
            const shareTitle = `オプチャ検定｜Q.${id}`
            const shareUrl = `https://openchat-review.me/accreditation?id=${id}`
            const shareText = encodeURIComponent(`${shareTitle}\n${shareUrl}`)
            const shareTwitterUrl = encodeURIComponent(shareUrl)
            const shareTwitterText = encodeURIComponent(`${question}\n${shareTitle}\n`)

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
                <ShareButtonWrapper>
                  <ShareTitle>問題をシェアする</ShareTitle>
                  <LinkButton onClick={() => copyUrl(`${shareTitle}\n${shareUrl}`)}>
                    <CopyIcon width={20} height={20} />
                  </LinkButton>
                  <ShareButton
                    href={`https://twitter.com/intent/tweet?url=${shareTwitterUrl}&text=${shareTwitterText}`}
                    title="Xにポスト"
                    target="_blank"
                  >
                    <ShareIcon
                      url={'https://openchat-review.me/assets/twitter_x.svg'}
                      backgroundColor="#000"
                    />
                  </ShareButton>
                  <ShareButton
                    href={`http://line.me/R/msg/text/?${shareText}`}
                    title="LINEで送る"
                    target="_blank"
                  >
                    <ShareIcon url={'https://openchat-review.me/assets/line.svg'} />
                  </ShareButton>
                </ShareButtonWrapper>
                {/* <Score right={isMatch}>{`${isMatch ? score : 0} 点`}</Score> */}
              </QuestionContainer>
            )
          }
        )}
      </InnerContainer>
      <LinkWrapper>
        <PageLink href="https://openchat-review.me/accreditation/login" target="_blank">
          問題の投稿はこちらから！
        </PageLink>
      </LinkWrapper>
      <Flex flxEnd>
        <Button
          text="トップに戻る"
          onClick={onClickRetry}
          icon={<Refresh />}
          iconPosition="left"
          bold
          big
        />
      </Flex>
      <TermWrapper>
        <TermComponent />
      </TermWrapper>
    </ResultScreenContainer>
  )
}

export default ResultScreen
