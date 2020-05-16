import {
  createGlobalStyle,
  css,
} from 'styled-components'
import theme from 'styled-theming'

const globalAColor = theme(`mode`, {
  white: `#4183c4`,
  sepia: `inherit`,
  night: `#3eb1d0`,
})
const globalFontFamily = theme(`fontFamily`, {
  serif: `Georgia, serif`,
  sans: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
})

const GlobalStyle = createGlobalStyle`${css`
  html {
    font-size: 62.5%;
  }
  body {
    padding: 0;
    margin: 0;
    text-rendering: optimizeLegibility;
    font-family: ${globalFontFamily};
    font-size: 14px;
    letter-spacing: 0.2px;
    text-size-adjust: 100%;
  }
  a {
    color: ${globalAColor};
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
