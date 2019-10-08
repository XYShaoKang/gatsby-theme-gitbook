import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAlignJustify,
  faSearch,
  faFont,
} from '@fortawesome/free-solid-svg-icons'
import theme from 'styled-theming'

import Share from './share'
import ThemeSetting from './theme-setting'

const bodyHeaderAColor = theme(`mode`, {
  white: `#ccc`,
  sepia: `#afa790`,
  night: `#3b3f54`,
})
const bodyHeaderAHoverColor = theme(`mode`, {
  white: `#444`,
  sepia: `#73553c`,
  night: `#fffff5`,
})

const BodyHeaderWarpper = styled.div`
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
    color: ${bodyHeaderAColor};
    font-size: 14px;
    :hover {
      color: ${bodyHeaderAHoverColor};
    }
  }
`
const BodyHeaderEnd = styled(BodyHeaderStart)``

const BodyHeader = ({
  toggleSidebarHandler,
  toggleSearchHandler,
  setTheme,
  pageContext,
}) => {
  const [
    themeSettingDisplay,
    toggleThemeSettingDisplay,
  ] = useState(false)
  const toggleThemeSettingDisplayHandler = () => {
    toggleThemeSettingDisplay(state => !state)
  }
  return (
    <BodyHeaderWarpper>
      <BodyHeaderStart>
        <a
          href="#"
          onClick={toggleSidebarHandler}
        >
          <FontAwesomeIcon
            icon={faAlignJustify}
          />
        </a>
        <a href="#" onClick={toggleSearchHandler}>
          <FontAwesomeIcon icon={faSearch} />
        </a>
        <div>
          <a
            href="#"
            onClick={
              toggleThemeSettingDisplayHandler
            }
          >
            <FontAwesomeIcon icon={faFont} />
          </a>
          {themeSettingDisplay && (
            <ThemeSetting setTheme={setTheme} />
          )}
        </div>
      </BodyHeaderStart>
      <BodyHeaderEnd>
        <Share
          shareTitle={pageContext.shareTitle}
        />
      </BodyHeaderEnd>
    </BodyHeaderWarpper>
  )
}

BodyHeader.propTypes = {
  toggleSidebarHandler: PropTypes.func,
  toggleSearchHandler: PropTypes.func,
  pageContext: PropTypes.shape({
    shareTitle: PropTypes.string,
  }),
}

export default BodyHeader
