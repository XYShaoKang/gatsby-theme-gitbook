import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, {
  ThemeProvider,
} from 'styled-components'

import Sidebar from './sidebar'
import GlobalStyle from './global-style'
import CodeThemes from './code-theme'
import Body from './body'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`

const Layout = ({ children, pageContext }) => {
  const [
    sidebarDisplay,
    toggleSidebar,
  ] = useState(true)
  const toggleSidebarHandler = e => {
    e.preventDefault()
    toggleSidebar(state => !state)
  }

  const [searchDisplay, toggleSearch] = useState(
    false
  )
  const toggleSearchHandler = e => {
    e.preventDefault()
    if (sidebarDisplay) {
      // 当侧边栏时显示时,正常执行隐藏显示切换逻辑
      toggleSearch(state => !state)
    } else {
      // 当侧边栏时隐藏时,点击搜索按钮应显示侧边栏和搜索栏
      toggleSidebar(true)
      toggleSearch(true)
    }
  }

  const [theme, setTheme] = useState({
    mode: `white`,
    bodyFontSize: 16,
    fontFamily: `sans`,
  })

  const CodeTheme =
    CodeThemes[theme.mode] || CodeThemes[`white`]

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <CodeTheme />
        <Wrapper>
          <Sidebar
            sidebarDisplay={sidebarDisplay}
            searchDisplay={searchDisplay}
          />
          <Body
            pageContext={pageContext}
            toggleSidebarHandler={
              toggleSidebarHandler
            }
            toggleSearchHandler={
              toggleSearchHandler
            }
            setTheme={setTheme}
          >
            {children}
          </Body>
        </Wrapper>
      </ThemeProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
