import styled from 'styled-components'

const Term = styled.span`
  font-size: 11px;
  line-height: 1.3;
`

const Desc = styled.div`
  color: ${({ theme }) => theme.colors.darkerGray};
  font-size: 16px;
  margin-bottom: 20px;
  font-size: 13px;
  line-height: 1.4;
`

const DescText = styled.p`
  word-break: keep-all;
  overflow-wrap: anywhere;
  text-align: center;
  margin: 8px;
`

export const TermComponent: React.FC = () => {
  return (
    <Term>
      このサイトはLINEオープンチャット非公式です。
      LINEヤフー社はこの内容に関与していません。
      監修しているのは一部のLINEオープンチャット公認メンターです。
    </Term>
  )
}

export const HeaderDescText: React.FC = () => {
  return (
    <DescText>
      オプチャ検定は、LINEオープンチャットの
      <wbr />
      利用に関連する知識を深める場所です。
    </DescText>
  )
}

export const DescriptionComponent: React.FC = () => {
  return (
    <Desc>
      <HeaderDescText />
      <DescText>
        誰でも問題を投稿でき、
        <wbr />
        自分の知識を共有することで
        <wbr />
        オープンチャットコミュニティに
        <wbr />
        貢献できます！
      </DescText>
    </Desc>
  )
}
