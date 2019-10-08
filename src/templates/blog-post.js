import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

const Setion = styled.section`
  -webkit-tap-highlight-color: transparent;
  font-size: ${props =>
    props.theme.bodyFontSize / 10 + `rem`};
  word-wrap: break-word;
  line-height: 1.7;
  & > :first-child {
    margin-top: 0 !important;
  }
  h1 {
    font-size: 2em;
  }
  h2 {
    font-size: 1.75em;
  }
  h3 {
    font-size: 1.5em;
  }
  h4 {
    font-size: 1.25em;
  }
  h5 {
    font-size: 1em;
  }
  h6 {
    font-size: 1em;
    color: #777;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 1.275em;
    margin-bottom: 0.85em;
    font-weight: 700;
  }
`

export default ({ data }) => {
  const post = data.markdownRemark

  return (
    <Setion
      dangerouslySetInnerHTML={{
        __html: post.html,
      }}
    />
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(
      fields: { slug: { eq: $slug } }
    ) {
      html
      frontmatter {
        title
      }
    }
  }
`
