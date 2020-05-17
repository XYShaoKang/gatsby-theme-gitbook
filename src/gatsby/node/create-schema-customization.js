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
