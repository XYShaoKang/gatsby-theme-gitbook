import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Item = ({
  item: { text, slug, children },
}) => (
  <li>
    <Link to={slug} activeClassName="selected">
      {text}
    </Link>
    {children && children.length > 0 && (
      <ul>
        <List data={children} />
      </ul>
    )}
  </li>
)

const List = ({ data }) =>
  data.map((d, i) => <Item key={i} item={d} />)

const Summary = styled(({ className, data }) => (
  <ul className={className}>
    <List data={data} />
  </ul>
))`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    list-style: none;
    box-sizing: border-box;
  }

  ul {
    padding-left: 20px;
  }
`

export default Summary
