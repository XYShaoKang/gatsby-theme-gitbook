export const flatMapChildren = data =>
  data.reduce(
    (acc, { children, ...d }) =>
      children
        ? [
            ...acc,
            d,
            ...flatMapChildren(children),
          ]
        : [...acc, d],
    []
  )
