type HaveChildrenArray<T> = {
  children?: HaveChildrenArray<T>[]
} & Partial<T>

type OtherPropArray<T> = Omit<
  HaveChildrenArray<T>,
  // eslint-disable-next-line quotes
  'children'
>

/**
 * @func
 * @sig [a] -> [b]
 * @param {Array} data
 * @returns {Array}
 * @example
 *
 *           flatMapChildren([
 *             {
 *               slug: 1,
 *               children: [
 *                 { slug: 2, children: [{ slug: 3 }] },
 *                 { slug: 4 },
 *               ],
 *             },
 *             { slug: 5 },
 *           ])
 *           // =>
 *           [ { slug: 1 }, { slug: 2 }, { slug: 3 }, { slug: 4 }, { slug: 5 } ]
 *
 */

export const flatMapChildren = <T>(
  data: HaveChildrenArray<T>[]
): Array<OtherPropArray<T>> =>
  data.reduce(
    (
      acc: Array<OtherPropArray<T>>,
      { children, ...d }
    ) =>
      children
        ? [
            ...acc,
            d,
            ...flatMapChildren(children),
          ]
        : [...acc, d],
    []
  )
