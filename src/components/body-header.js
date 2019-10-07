import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAlignJustify,
  faSearch,
  faFont,
} from '@fortawesome/free-solid-svg-icons'

import Share from './share'

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
    color: #ccc;
    font-size: 14px;
  }
`
const BodyHeaderEnd = styled(BodyHeaderStart)``

const BodyHeader = ({
  toggleSidebarHandler,
  toggleSearchHandler,
  pageContext,
}) => (
  <BodyHeaderWarpper>
    <BodyHeaderStart>
      <a href="#" onClick={toggleSidebarHandler}>
        <FontAwesomeIcon icon={faAlignJustify} />
      </a>
      <a href="#" onClick={toggleSearchHandler}>
        <FontAwesomeIcon icon={faSearch} />
      </a>
      <a href="#">
        <FontAwesomeIcon icon={faFont} />
      </a>
    </BodyHeaderStart>
    <BodyHeaderEnd>
      <Share
        shareTitle={pageContext.shareTitle}
      />
    </BodyHeaderEnd>
  </BodyHeaderWarpper>
)

BodyHeader.propTypes = {
  toggleSidebarHandler: PropTypes.func,
  toggleSearchHandler: PropTypes.func,
  pageContext: PropTypes.shape({
    shareTitle: PropTypes.string,
  }),
}

export default BodyHeader
