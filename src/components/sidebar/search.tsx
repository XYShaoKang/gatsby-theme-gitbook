import React, { useState, FC } from 'react'
import styled, { css } from 'styled-components'
import {
  Link,
  useStaticQuery,
  graphql,
} from 'gatsby'
import posed from 'react-pose'

import { useJsSearch } from '../../hooks/use-search'
import { SerachDataQuery } from './__generated__/SerachDataQuery'

const SearchBox = posed.div({
  show: { marginTop: 0 },
  hide: { marginTop: -52 },
})

const SearchWarpCss = css`
  display: block;
  padding: 6px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  border-top: 1px solid rgba(0, 0, 0, 0.07);
`

const SearchWarp = styled(
  ({
    children,
    searchDisplay,
    ...otherProps
  }) => (
    <SearchBox
      pose={searchDisplay ? `show` : `hide`}
      {...otherProps}
    >
      {children}
    </SearchBox>
  )
)`
  ${SearchWarpCss}
`

const SearchInput = styled.input`
  width: 100%;
  background: 0 0;
  border: 1px solid transparent;
  box-shadow: none;
  outline: 0;
  line-height: 22px;
  padding: 7px;
  color: inherit;
`

// TODO: 优化搜索结果显示
const TempList = styled.ul`
  position: absolute;
  height: 93%;
  width: 294px;
  background: rgba(43, 43, 43, 0.8);
  list-style: none;
  padding: 0;
  margin: 0;
  li > a {
    color: white;
  }
`

interface SearchProps {
  searchDisplay: boolean
}

const Search: FC<SearchProps> = ({
  searchDisplay,
}: SearchProps) => {
  const [value, setValue] = useState(``)

  const {
    SerachDocs: serachDocs,
  }: SerachDataQuery = useStaticQuery(
    graphql`
      query SerachDataQuery {
        SerachDocs {
          slug
          title
          content
        }
      }
    `
  )
  const [index] = useJsSearch(serachDocs ?? [])

  const searchResult = index?.search(value) ?? []

  return (
    <SearchWarp searchDisplay={searchDisplay}>
      <SearchInput
        placeholder="Type to search"
        value={value}
        onChange={e => {
          setValue(e.target.value)
        }}
      />
      {value &&
        serachDocs &&
        searchResult.length > 0 && (
          <TempList>
            {searchResult.map(
              ({ slug, title }) => (
                <li key={slug}>
                  <Link to={slug}>{title}</Link>
                </li>
              )
            )}
          </TempList>
        )}
    </SearchWarp>
  )
}

export default Search
