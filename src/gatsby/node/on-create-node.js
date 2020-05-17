import { createFilePath } from 'gatsby-source-filesystem'
import Remark from 'remark'
import toString from 'mdast-util-to-string'
import { getSummary } from './get-summary'

export const onCreateNode = async ({
  node,
  getNode,
  actions,
  reporter,
  cache,
}) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({
      node,
      getNode,
      basePath: `pages`,
    })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    const markdownAst = Remark.parse(
      node.rawMarkdownBody
    )
    const heading = markdownAst.children.filter(
      ({ type }) => type === `heading`
    )
    const title =
      heading.length > 0
        ? toString(heading[0])
        : ``
    createNodeField({
      node,
      name: `title`,
      value: title,
    })

    if (slug === `/SUMMARY/`) {
      const list = markdownAst.children.filter(
        node => node.type === `list`
      )[0]
      const summaryData = list
        ? getSummary(list)
        : []
      createNodeField({
        node,
        name: `summaryStr`,
        value: JSON.stringify(
          summaryData,
          null,
          2
        ),
      })
    }
  }
}
