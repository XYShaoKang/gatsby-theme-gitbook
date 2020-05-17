// TODO: 按照目录文件 SUMMARY.md 来创建页面
export const createPages = async ({
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
        `../../templates/blog-post.tsx`
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
