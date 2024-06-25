import styled from 'styled-components'

const Term = styled.span`
  font-size: 11px;
  line-height: 1.3;
`

const Desc = styled.div`
  color: ${({ theme }) => theme.colors.themeText};
  font-size: 16px;
  margin-bottom: 20px;
  font-size: 14px;
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
      <br />
      ガイドライン、ルール、管理方法などに
      <wbr />
      ついて楽しく学ぶことができます。
    </DescText>
  )
}

export const DescriptionComponent: React.FC = () => {
  return (
    <Desc>
      <HeaderDescText />
      <DescText>
        問題投稿ページでは誰でも問題を投稿でき、
        <wbr />
        他の人が投稿した問題を閲覧できます。
        <br />
        自分の知識を共有して、
        <wbr />
        オープンチャットコミュニティに
        <wbr />
        貢献できます！
      </DescText>
    </Desc>
  )
}
