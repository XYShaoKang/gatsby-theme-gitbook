import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

const Item = ({
  item: { text, slug, children },
  level,
}) => {
  const levelStr = level.join(`.`)
  return (
    <li>
      <Link to={slug} activeClassName="selected">
        <b>{levelStr === `0` ? `` : levelStr}</b>
        {` ${text}`}
      </Link>
      {children && children.length > 0 && (
        <ul>
          <List
            data={children}
            level={[...level]}
          />
        </ul>
      )}
    </li>
  )
}

Item.propTypes = {
  item: PropTypes.shape({
    text: PropTypes.string,
    slug: PropTypes.string,
    children: PropTypes.array,
  }),
}

const List = ({ data, level }) =>
  data.map((d, i) => (
    <Item
      key={i}
      item={d}
      level={level ? [...level, i + 1] : [i]}
    />
  ))

const Summary = styled(({ className, data }) => (
  <ul className={className}>
    <List data={data} />
  </ul>
))/* CSS */ `
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

Summary.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      slug: PropTypes.string,
      children: PropTypes.array,
    })
  ),
}

export default Summary
