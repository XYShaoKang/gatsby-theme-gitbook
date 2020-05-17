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
