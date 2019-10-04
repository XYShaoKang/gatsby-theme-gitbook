import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Summary from './summary'

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

const Sidebar = () => {
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
    <SummaryWrapper>
      <Header>
        <Link to="/">
          {data.site.siteMetadata.title}
        </Link>
      </Header>
      <Divider />
      <Summary data={summaryData} />
    </SummaryWrapper>
  )
}

export default Sidebar
