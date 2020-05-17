import path from 'path'
import toString from 'mdast-util-to-string'

export function getSummary(node, obj = {}) {
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
