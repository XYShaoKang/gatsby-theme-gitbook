import React, { useState, FC } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShareAlt,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookF,
  faTwitter,
  faWeibo,
  faGooglePlus,
  faVk,
} from '@fortawesome/free-brands-svg-icons'

interface SiteType {
  key: string
  name: string
  Icon: IconDefinition
  display: boolean
  handle: SiteHandle
}

interface SiteHandle {
  (arg: { title: string; href: string }): void
}

const shareSite: Array<SiteType> = [
  {
    key: `weibo`,
    name: `Weibo`,
    Icon: faWeibo,
    display: true,
    handle: ({ title, href }) => {
      window.open(
        `http://service.weibo.com/share/share.php?content=utf-8&url=` +
          encodeURIComponent(href) +
          `&title=` +
          encodeURIComponent(title)
      )
    },
  },
  {
    key: `facebook`,
    name: `Facebook`,
    Icon: faFacebookF,
    display: false,
    handle: ({ href }) => {
      window.open(
        `http://www.facebook.com/sharer/sharer.php?s=100&p[url]=` +
          encodeURIComponent(href)
      )
    },
  },
  {
    key: `twitter`,
    name: `Twitter`,
    Icon: faTwitter,
    display: false,
    handle: ({ href }) => {
      window.open(
        `http://twitter.com/home?status=` +
          encodeURIComponent(
            document.title + ` ` + href
          )
      )
    },
  },
  {
    key: `google`,
    name: `Google +`,
    Icon: faGooglePlus,
    display: false,
    handle: ({ href }) => {
      window.open(
        `https://plus.google.com/share?url=` +
          encodeURIComponent(href)
      )
    },
  },
  {
    key: `vk`,
    name: `Vk`,
    Icon: faVk,
    display: false,
    handle: ({ href }) => {
      window.open(
        `http://vkontakte.ru/share.php?url=` +
          encodeURIComponent(href)
      )
    },
  },
]

const ShareSiteList = styled.ul`
  position: absolute;
  top: 50px;
  min-width: 160px;
  padding: 0;
  margin: 2px 0 0;
  background-color: #fafafa;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 1px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background-clip: padding-box;
  right: 1%;
  z-index: 100;
  li {
    list-style: none;
    text-align: center;
    padding: 8px 4px;
  }
  a {
    color: #a6a6a6;
    text-decoration: none;
  }
  a:hover {
    color: #444;
  }
`

interface Props {
  shareTitle: string
}

const Share: FC<Props> = ({
  shareTitle = ``,
}) => {
  const [
    showMoreShareSite,
    toggleShowMoreShareSite,
  ] = useState(false)

  const shareHandler = (handle: SiteHandle) => (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ): void => {
    e.preventDefault()
    const shareData = {
      title: shareTitle,
      href: location.href,
    }
    handle(shareData)
  }
  return (
    <>
      {shareSite
        .filter(({ display }) => display)
        .map(({ Icon, handle, key }) => (
          <a
            href="#"
            key={key}
            onClick={shareHandler(handle)}
          >
            <FontAwesomeIcon icon={Icon} />
          </a>
        ))}
      <a
        href="#"
        onClick={e => {
          e.preventDefault()
          toggleShowMoreShareSite(state => !state)
        }}
      >
        <FontAwesomeIcon icon={faShareAlt} />
      </a>
      {showMoreShareSite && (
        <ShareSiteList>
          {shareSite.map(
            ({ name, handle, key }) => (
              <li
                key={key}
                onClick={shareHandler(handle)}
              >
                <a href="#">{name}</a>
              </li>
            )
          )}
        </ShareSiteList>
      )}
    </>
  )
}

export default Share
