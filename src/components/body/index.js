import React from 'react'
import {
  useStaticQuery,
  graphql,
  Link,
} from 'gatsby'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme from 'styled-theming'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons'

import BodyHeader from './body-header'
import { flatMapChildren } from '../../utils'

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

const BodyWrapper = styled.div`
  width: 100%;
  overflow-y: auto;
  background: ${bodyBackgroundColor};
  color: ${bodyAColor};
`

const Content = styled.div`
  display: flex;
  height: 100%;
  & > section {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px 15px 40px;
    flex: 1;
    width: 0;
  }
`

const navigationColor = theme(`mode`, {
  white: `#ccc`,
  sepia: `#afa790`,
  night: `#383f52`,
})
const navigationHoverColor = theme(`mode`, {
  white: `#444`,
  sepia: `#73553c`,
  night: `#fffff5`,
})

const Navigation = styled.div`
  max-width: 150px;
  min-width: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 40px;
  flex: 0.03 0 auto;
  a {
    color: ${navigationColor};
    transition: color 1s;
  }
  a:hover {
    color: ${navigationHoverColor};
  }
`

const Body = ({
  children,
  pageContext,
  toggleSidebarHandler,
  toggleSearchHandler,
  setTheme,
}) => {
  const data = useStaticQuery(graphql`
    query SummaryStrQuery {
      allMarkdownRemark(
        filter: {
          fields: { slug: { eq: "/SUMMARY/" } }
        }
      ) {
        totalCount
        edges {
          node {
            fields {
              summaryStr
            }
          }
        }
      }
    }
  `)

  const {
    summaryStr,
  } = data.allMarkdownRemark.edges[0].node.fields
  const summaryData = JSON.parse(summaryStr)
  const summaryArray = flatMapChildren(
    summaryData
  )

  const currentIndex = summaryArray.findIndex(
    ({ slug }) => slug === pageContext.slug
  )

  const prevHref =
    currentIndex > 0
      ? summaryArray[currentIndex - 1].slug
      : ``
  const nextHref =
    currentIndex < summaryArray.length - 1
      ? summaryArray[currentIndex + 1].slug
      : ``

  return (
    <BodyWrapper>
      <BodyHeader
        toggleSidebarHandler={
          toggleSidebarHandler
        }
        toggleSearchHandler={toggleSearchHandler}
        setTheme={setTheme}
        pageContext={pageContext}
      />
      <Content>
        <Navigation>
          {prevHref && (
            <Link to={prevHref}>
              <FontAwesomeIcon
                icon={faAngleLeft}
              />
            </Link>
          )}
        </Navigation>
        {children}
        <Navigation>
          {nextHref && (
            <Link to={nextHref}>
              <FontAwesomeIcon
                icon={faAngleRight}
              />
            </Link>
          )}
        </Navigation>
      </Content>
    </BodyWrapper>
  )
}

Body.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Body
