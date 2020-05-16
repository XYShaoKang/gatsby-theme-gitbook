import * as JsSearch from 'js-search'
import { createSegment } from '../utils/create-segment'
import { useState, useEffect } from 'react'

interface SerachDoc {
  slug: string
  title: string
  content: string
}

const segment = createSegment()

export const useJsSearch = (
  SerachDocs: SerachDoc[]
) => {
  const [search, setSearch] = useState<
    JsSearch.Search<SerachDoc>
  >()
  useEffect(() => {
    console.log(`useJsSearch useEffect`)
    const search = new JsSearch.Search<SerachDoc>(
      `slug`
    )

    search.tokenizer = {
      tokenize(text) {
        const result = text.split(`\n`).reduce(
          (arr: string[], str) =>
            arr.concat(
              segment.doSegment(str, {
                simple: true,
                stripPunctuation: true,
              })
            ),
          []
        )

        return result
      },
    }
    search.addIndex(`slug`)
    search.addIndex(`title`)
    search.addIndex(`content`)

    search.addDocuments(SerachDocs ?? [])
    setSearch(search)
  }, [SerachDocs])
  return [search]
}
