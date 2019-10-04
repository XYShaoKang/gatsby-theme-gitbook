import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const SearchWarp = styled.div`
  display: ${({ searchDisplay }) =>
    searchDisplay ? `block` : `none`};
  padding: 6px;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  border-top: 1px solid rgba(0, 0, 0, 0.07);
  margin-bottom: 10px;
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

const Search = ({ searchDisplay }) => {
  const [value, setValue] = useState(``)

  const APOLLO_QUERY = gql`
    query MyQuery($key: String!) {
      Search(key: $key) {
        slug
        title
        content
      }
    }
  `
  const { loading, error, data } = useQuery(
    APOLLO_QUERY,
    {
      variables: { key: value },
    }
  )

  return (
    <SearchWarp searchDisplay={searchDisplay}>
      <SearchInput
        placeholder="Type to search"
        value={value}
        onChange={e => {
          setValue(e.target.value)
        }}
      />
      {!loading &&
        !error &&
        data.Search.length > 0 && (
          <TempList>
            {data.Search.map(
              ({ slug, title, content }) => (
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

Search.propTypes = {
  searchDisplay: PropTypes.bool,
}

export default Search
