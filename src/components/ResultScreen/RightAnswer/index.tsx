import { FC } from 'react'
import styled from 'styled-components'

import { HighlightedText } from '../../../styles/Global'
import { Contributor, Source } from '../../../data/QuizQuestions'

interface RightAnswerProps {
  correctAnswers: string[]
  choices: string[]
  isMatch: boolean
  explanation?: string
  contributor?: Contributor
  source?: Source
  id?: number
}

const RightAnswerContainer = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkerGray};
  margin-top: 15px;
  line-height: 1.5;
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

const SourceLinkWrapper = styled.div`
  word-break: break-all;
  overflow-wrap: break-word;
  line-break: anywhere;
  color: ${({ theme }) => theme.colors.darkerGray};
  margin-top: 15px;
  line-height: 1.5;
  font-size: 14px;
`

const SourceLink = styled.a`
  color: ${({ theme }) => theme.colors.themeText};
`

const ContributorWrapper = styled.div`
  font-size: 13px;
  word-break: break-all;
  overflow-wrap: break-word;
  line-break: anywhere;
  margin-top: 20px;
  line-height: 1.5;
`

const ContributorLabel = styled.span`
  color: ${({ theme }) => theme.colors.darkerGray};
`

const ContributorRoomWrapper = styled.div`
  margin-top: 4px;
`

const ContributorRoomName = styled.a`
  letter-spacing: -0.1px;
  color: unset;
`

const RightAnswer: FC<RightAnswerProps> = ({
  correctAnswers,
  choices,
  isMatch,
  explanation,
  contributor,
  source,
  id,
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
      {source && (
        <SourceLinkWrapper>
          {`出典URL: `}
          <HighlightedText themeText>
            <SourceLink href={source.url} target="_blank">
              {source.title}
            </SourceLink>
          </HighlightedText>
        </SourceLinkWrapper>
      )}
      {contributor && (
        <ContributorWrapper>
          <ContributorLabel>出題者: </ContributorLabel>
          {contributor.name}
          {contributor.roomName && contributor.url && (
            <ContributorRoomWrapper>
              <ContributorLabel>出題者のオプチャ: </ContributorLabel>
              <ContributorRoomName href={contributor.url} target="_blank">
                {contributor.roomName}
              </ContributorRoomName>
            </ContributorRoomWrapper>
          )}
        </ContributorWrapper>
      )}
    </>
  )
}

export default RightAnswer
