// Type definitions for segmentit v2.03
// Project: https://github.com/linonetwo/segmentit
// Definitions by: ShaoKang <https://github.com/XYShaoKang>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// TODO: 完善其他类型
declare module "segmentit" {
  interface Option {
    simple?: boolean
    stripPunctuation?: boolean
    convertSynonym?: boolean
    stripStopword?: boolean
  }
  class Segment {
    public use(
      Module: Array | Record<string, any>
    ): Segment
    public loadDict(
      dict: string | string[],
      type = "TABLE",
      convertToLower: boolean = false
    ): Segment
    public getDict(type: string): object
    public loadSynonymDict(
      dict: string | string[]
    ): Segment
    loadStopwordDict(
      dict: string | string[]
    ): Segment
    doSegment(
      text: string,
      options?: Option
    ): Array<any>
    toString(words: Array<string>): string
    split(
      words: Array<string>,
      s: number | string
    ): Array<any>
    indexOf(
      words: Array<string>,
      s: number | string,
      cur: number
    ): number
  }

  const modules: (
    | typeof URLTokenizer
    | typeof WildcardTokenizer
    | typeof PunctuationTokenizer
    | typeof ForeignTokenizer
    | typeof DictTokenizer
    | typeof ChsNameTokenizer
    | typeof ChsNameOptimizer
    | typeof DictOptimizer
  )[]
}
