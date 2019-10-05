import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, {
  createGlobalStyle,
  css,
} from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAlignJustify,
  faSearch,
  faFont,
  faShareAlt,
} from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookF,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import posed from 'react-pose'

import Sidebar from './sidebar'
import Search from './search'

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

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`

const SidebarBox = posed.div({
  hidden: { marginLeft: -300 },
  visible: { marginLeft: 0 },
})
const SidebarWrapper = styled(
  ({
    children,
    sidebarDisplay,
    ...otherProps
  }) => (
    <SidebarBox
      pose={sidebarDisplay ? `visible` : `hidden`}
      {...otherProps}
    >
      {children}
    </SidebarBox>
  )
)`
  width: 300px;
  border-right: 1px solid #e8e8e8;
  overflow-y: auto;
  flex-shrink: 0;
  a {
    padding: 10px 15px;
    display: block;
    color: #364149;
    &.selected {
      color: #008cff;
    }
    :hover {
      color: #008cff;
      text-decoration: none;
    }
  }
`
const Body = styled.div`
  width: 100%;
  overflow-y: auto;
`
const BodyHeader = styled.div`
  overflow: visible;
  height: 50px;
  padding: 0 8px;
  font-size: 0.85em;
  color: #7e888b;
  background: 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const BodyHeaderStart = styled.div`
  display: flex;
  a {
    display: block;
    padding: 0 15px;
    color: #ccc;
    font-size: 14px;
  }
`
const BodyHeaderEnd = styled(BodyHeaderStart)``

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 15px 40px;
`

const Layout = ({ children }) => {
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

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <SidebarWrapper
          sidebarDisplay={sidebarDisplay}
        >
          <Search searchDisplay={searchDisplay} />
          <Sidebar />
        </SidebarWrapper>
        <Body>
          <BodyHeader>
            <BodyHeaderStart>
              <a
                href="#"
                onClick={toggleSidebarHandler}
              >
                <FontAwesomeIcon
                  icon={faAlignJustify}
                />
              </a>
              <a
                href="#"
                onClick={toggleSearchHandler}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faFont} />
              </a>
            </BodyHeaderStart>
            <BodyHeaderEnd>
              <a href="#">
                <FontAwesomeIcon
                  icon={faTwitter}
                />
              </a>
              <a href="#">
                <FontAwesomeIcon
                  icon={faFacebookF}
                />
              </a>
              <a href="#">
                <FontAwesomeIcon
                  icon={faShareAlt}
                />
              </a>
            </BodyHeaderEnd>
          </BodyHeader>
          <Content>{children}</Content>
        </Body>
      </Wrapper>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
