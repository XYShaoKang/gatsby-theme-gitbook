import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, {
  ThemeProvider,
} from 'styled-components'
import theme from 'styled-theming'

import Sidebar from './sidebar'
import GlobalStyle from './global-style'
import BodyHeader from './body-header'

const bodyBackgroundColor = theme(`mode`, {
  white: `#fff`,
  sepia: `#f3eacb`,
  night: `#1c1f2b`,
})
const bodyAColor = theme(`mode`, {
  white: `#000`,
  sepia: `#704214`,
  night: `#bdcadb`,
})

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`

const Body = styled.div`
  width: 100%;
  overflow-y: auto;
  background: ${bodyBackgroundColor};
  color: ${bodyAColor};
`

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 15px 40px;
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

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Wrapper>
          <Sidebar
            sidebarDisplay={sidebarDisplay}
            searchDisplay={searchDisplay}
          />
          <Body>
            <BodyHeader
              toggleSidebarHandler={
                toggleSidebarHandler
              }
              toggleSearchHandler={
                toggleSearchHandler
              }
              setTheme={setTheme}
              pageContext={pageContext}
            />
            <Content>{children}</Content>
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
