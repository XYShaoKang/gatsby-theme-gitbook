const option = [
  {
    id: `segment`,
    file: `dict.txt`,
    loadFn: `loadDict`,
  },
  {
    id: `segment`,
    file: `dict2.txt`,
    loadFn: `loadDict`,
  },
  {
    id: `segment`,
    file: `names/*`,
    loadFn: `loadDict`,
  },
  {
    id: `segment`,
    file: `pangu/wildcard.txt`,
    option: [`WILDCARD`, true],
    loadFn: `loadDict`,
  },
  {
    id: `segment`,
    file: `dict_synonym/*`,
    loadFn: `loadDict`,
  },
  {
    id: `stopword`,
    file: `*`,
    loadFn: `loadStopwordDict`,
  },
]

module.exports = { option }
