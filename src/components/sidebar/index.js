import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { Link } from 'gatsby'
import posed from 'react-pose'
import PropTypes from 'prop-types'

import Summary from './summary'
import Search from './search'

const SummaryWrapper = styled.div`
  background: #fafafa;
`
const Header = styled.div`
  /* padding: 10px 15px; */
`
const Divider = styled.div`
  height: 1px;
  margin: 7px 0;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.07);
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

const Sidebar = ({
  sidebarDisplay,
  searchDisplay,
}) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
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

  return (
    <SidebarWrapper
      sidebarDisplay={sidebarDisplay}
    >
      <Search searchDisplay={searchDisplay} />

      <SummaryWrapper>
        <Header>
          <Link to="/">
            {data.site.siteMetadata.title}
          </Link>
        </Header>
        <Divider />
        <Summary data={summaryData} />
      </SummaryWrapper>
    </SidebarWrapper>
  )
}

Sidebar.propTypes = {
  sidebarDisplay: PropTypes.bool,
  searchDisplay: PropTypes.bool,
}

export default Sidebar
