/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const fs = require(`fs`)
const {
  createFilePath,
} = require(`gatsby-source-filesystem`)
const Remark = require(`remark`)
const toString = require(`mdast-util-to-string`)
const JsSearch = require(`js-search`)
const nodejieba = require(`nodejieba`)

// 创建搜索
const search = new JsSearch.Search(`slug`)
search.tokenizer = {
  tokenize(text) {
    return nodejieba
      .tag(text, true)
      .filter(({ tag }) => tag !== `x`)
      .map(({ word }) => word)
  },
}
search.addIndex(`slug`)
search.addIndex(`title`)
search.addIndex(`content`)

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

exports.onPreBootstrap = (
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

exports.onCreateNode = ({
  node,
  getNode,
  actions,
  reporter,
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

    // 添加搜索数据
    const doc = {
      slug,
      title: title,
      content: node.internal.content,
    }
    search.addDocuments([doc])

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
exports.createPages = async ({
  graphql,
  actions,
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
          }
        }
      }
    }
  `)

  const createDocPage = (pagePath, node) => {
    createPage({
      path: pagePath,
      component: path.resolve(
        `./src/templates/blog-post.js`
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

exports.createSchemaCustomization = ({
  actions,
  schema,
}) => {
  const { createTypes } = actions

  const typeDefs = `
    type SerachResult {
      slug: String!
      title: String!
      content: String!
    }
  `
  createTypes(typeDefs)
}

exports.createResolvers = ({
  createResolvers,
}) => {
  createResolvers({
    Query: {
      Search: {
        type: [`SerachResult!`],
        args: {
          key: `String!`,
        },
        resolve(source, args, context, info) {
          const { key } = args
          const result = search.search(key)

          return result
        },
      },
    },
  })
}
