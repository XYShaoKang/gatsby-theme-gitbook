/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

import path from 'path'
import fs from 'fs'
import { createFilePath } from 'gatsby-source-filesystem'
import Remark from 'remark'
import toString from 'mdast-util-to-string'

function getSummary(node, obj = {}) {
  if (
    node.type === `listItem` &&
    node.children.length === 1
  ) {
    node = node.children[0]
  }

  const { children } = node

  if (node.type === `paragraph`) {
    const relativePath = node.children[0].url
    const { dir = ``, name } = path.parse(
      relativePath
    )

    return {
      text: toString(node),
      // relativePath,
      slug: path.posix.join(`/`, dir, name, `/`),
    }
  }

  let newChildren = []
  if (children && children.length > 0) {
    if (node.type === `list`) {
      newChildren = children.map(getSummary)
    } else if (node.type === `listItem`) {
      const tempChildren = children.map(
        getSummary
      )
      newChildren = {
        ...tempChildren[0],
        children: tempChildren[1],
      }
    }
  }

  return newChildren
}

export const onPreBootstrap = (
  { reporter },
  options
) => {
  const contentPath =
    options.contentPath || `docs`
  const summaryPath = path.join(
    contentPath,
    `SUMMARY.md`
  )

  if (!fs.existsSync(contentPath)) {
    reporter.info(
      `creating the ${contentPath} directory`
    )
    fs.mkdirSync(contentPath)
  }

  if (!fs.existsSync(summaryPath)) {
    reporter.info(`creating the SUMMARY.md file`)
    fs.writeFileSync(
      summaryPath,
      `# 目录`,
      `utf8`
    )
  }
}

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

// TODO: 按照目录文件 SUMMARY.md 来创建页面
export const createPages = async ({
  graphql,
  actions,
  cache,
}) => {
  const { createPage, createRedirect } = actions

  const {
    data: { allMarkdownRemark },
  } = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
              title
            }
            internal {
              content
            }
          }
        }
      }
    }
  `)

  const createDocPage = (pagePath, node) => {
    createPage({
      path: pagePath,
      component: require.resolve(
        `./src/templates/blog-post.tsx`
      ),
      context: {
        slug: node.fields.slug,
        shareTitle: node.fields.title,
      },
    })
  }

  allMarkdownRemark.edges.forEach(({ node }) => {
    const {
      fields: { slug },
    } = node
    createDocPage(slug, node)
  })

  createRedirect({
    fromPath: `/`,
    toPath: `/README/`,
    isPermanent: true,
    redirectInBrowser: true,
  })
}

export const createSchemaCustomization = ({
  actions,
  schema,
}) => {
  const { createTypes } = actions

  const serializedDataType = `
    type SerachDoc{
      slug: String!
      title: String!
      content: String!
    }
  `
  createTypes(serializedDataType)
}

export const createResolvers = ({
  createResolvers,
}) => {
  createResolvers({
    Query: {
      SerachDocs: {
        type: [`SerachDoc!`],
        resolve(source, args, context, info) {
          const allMarkdownRemark = context.nodeModel.getAllNodes(
            { type: `MarkdownRemark` },
            { connectionType: `MarkdownRemark` }
          )
          const docsData = allMarkdownRemark.map(
            ({
              fields: { slug, title },
              internal: { content },
            }) => {
              return { slug, title, content }
            }
          )

          return docsData
        },
      },
    },
  })
}
