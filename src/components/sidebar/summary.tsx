import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

interface ItemType {
  text: string
  slug: string
  children?: ItemType[]
}
interface ItemProps {
  item: ItemType
  level: string[]
}

const Item: FC<ItemProps> = ({
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

interface ListProps {
  data: ItemType[]
  level?: string[]
}

const List: FC<ListProps> = ({ data, level }) => (
  <>
    {data.map((d, i) => (
      <Item
        key={i}
        item={d}
        level={
          level
            ? [...level, `${i + 1}`]
            : [`${i}`]
        }
      />
    ))}
  </>
)

const SummaryCss = css`
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

const Summary = styled(({ className, data }) => (
  <ul className={className}>
    <List data={data} />
  </ul>
))`
  ${SummaryCss}
`

export default Summary
