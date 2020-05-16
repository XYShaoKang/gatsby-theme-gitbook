import preval from 'preval.macro'
import { Segment, modules } from 'segmentit'

import { option } from './segment-dict-option.js'

const OPTION_PATH = `./segment-dict-option`

// dict id.see: https://github.com/bluelovers/node-segment-dict/blob/master/lib/dict.ts#L8
export type IDictID =
  | `jieba-js`
  | `nodejieba`
  | `segment`
  | `stopword`
  | `synonym`

// get dict file text.
// see:
//  https://github.com/bluelovers/node-segment-dict/blob/HEAD/lib/dict.ts#L10
//  https://github.com/linonetwo/segmentit/blob/master/src/knowledge/index.js
function createGetDict() {
  const dictCache: Array<{
    key: string
    dicts: string[]
  }> = preval`
    const { readFileSync } = require('fs')
    const { getDictPath } = require('segment-dict')
    const { sync } = require('glob')
    const { option } = require('${OPTION_PATH}')
    
    module.exports = option.map(({ id, file }) => ({
      key: id + file,
      dicts: sync(getDictPath(id, file)).map((dictPath) =>
        readFileSync(dictPath, 'utf8'),
      ),
    }))
  `
  return (id: IDictID, file: string) =>
    dictCache.filter(
      ({ key }) => key === id + file
    )
}

const getDictText = createGetDict()

export function createSegment() {
  const segment = new Segment()
  segment.use(modules)
  option.forEach(
    ({ id, file, option = [], loadFn }) =>
      getDictText(id, file).forEach(({ dicts }) =>
        dicts.forEach(dict =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          segment[loadFn](dict, ...option)
        )
      )
  )

  return segment
}
