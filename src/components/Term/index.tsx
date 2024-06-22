import styled from 'styled-components'

const Term = styled.span`
  font-size: 11px;
  line-height: 1.3;
`

const TermComponent: React.FC = () => {
  return (
    <Term>
      「オプチャ検定」はLINEオープンチャット非公式の検定です。
      LINEヤフー社はこの内容に関与していません。
      監修しているのは一部のLINEオープンチャット公認メンターです。
    </Term>
  )
}

export default TermComponent
