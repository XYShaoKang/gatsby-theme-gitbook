import {
  createGlobalStyle,
  css,
} from 'styled-components'

const GlobalStyle = createGlobalStyle`${css`
  html {
    font-size: 62.5%;
  }
  body {
    padding: 0;
    margin: 0;
    text-rendering: optimizeLegibility;
    font-family: 'Helvetica Neue', Helvetica,
      Arial, sans-serif;
    font-size: 14px;
    letter-spacing: 0.2px;
    text-size-adjust: 100%;
  }
  a {
    color: #4183c4;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
  * {
    -webkit-font-smoothing: antialiased;
  }
`}`
export default GlobalStyle
