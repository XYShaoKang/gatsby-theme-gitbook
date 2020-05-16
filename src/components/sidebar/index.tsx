import React, { FC } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'
import posed from 'react-pose'
import theme from 'styled-theming'

import Summary from './summary'
import Search from './search'
import { SidebarQuery } from './__generated__/SidebarQuery'

const sidebarBackgroundColor = theme(`mode`, {
  white: `#fafafa`,
  sepia: `#111111`,
  night: `#2d3143`,
})
const sidebarAColor = theme(`mode`, {
  white: `#364149`,
  sepia: `#877f6a`,
  night: `#c1c6d7`,
})
const sidebarAChangeColor = theme(`mode`, {
  white: `#008cff`,
  sepia: `#704214`,
  night: `#f4f4f5`,
})
const sidebarAChangeBackgroundColor = theme(
  `mode`,
  {
    white: `#fafafa`,
    sepia: `#111111`,
    night: `#252737`,
  }
)

const SummaryWrapper = styled.div`
  /* background: ${sidebarBackgroundColor}; */
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

const SidebarWrapperCss = css`
  background: ${sidebarBackgroundColor};
  width: 300px;
  border-right: 1px solid #e8e8e8;
  overflow-y: auto;
  flex-shrink: 0;
  a {
    padding: 10px 15px;
    display: block;
    color: ${sidebarAColor};
    &.selected {
      color: ${sidebarAChangeColor};
      background: ${sidebarAChangeBackgroundColor};
    }
    :hover {
      color: ${sidebarAChangeColor};
      text-decoration: none;
    }
  }
`

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
  ${SidebarWrapperCss}
`

interface SidebarProps {
  sidebarDisplay: boolean
  searchDisplay: boolean
}

const Sidebar: FC<SidebarProps> = ({
  sidebarDisplay,
  searchDisplay,
}) => {
  const data: SidebarQuery = useStaticQuery(graphql`
    query SidebarQuery {
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

  const summaryStr =
    data.allMarkdownRemark.edges[0].node.fields
      ?.summaryStr ?? `{}`
  const summaryData = JSON.parse(summaryStr)

  return (
    <SidebarWrapper
      sidebarDisplay={sidebarDisplay}
    >
      <Search searchDisplay={searchDisplay} />

      <SummaryWrapper>
        <Header>
          <Link to="/">
            {data.site?.siteMetadata?.title ??
              `Home`}
          </Link>
        </Header>
        <Divider />
        <Summary data={summaryData} />
      </SummaryWrapper>
    </SidebarWrapper>
  )
}

export default Sidebar
