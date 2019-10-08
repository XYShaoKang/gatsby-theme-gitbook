import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme from 'styled-theming'

const themeSettingButtonColor = theme(`mode`, {
  white: `#a6a6a6`,
  sepia: `#afa790`,
  night: `#62677f`,
})
const themeSettingButtonHoverColor = theme(
  `mode`,
  {
    white: `#444`,
    sepia: `#73553c`,
    night: `#f4f4f5`,
  }
)
const themeSettingBackgroundColor = theme(
  `mode`,
  {
    white: `#fafafa`,
    sepia: `#111111`,
    night: `#2d3143`,
  }
)
const themeSettingBorderColor = theme(`mode`, {
  white: `rgba(0,0,0,.07)`,
  sepia: `#7e888b`,
  night: `#272a3a`,
})

const ThemeSettingWarpper = styled.div`
  position: absolute;
  z-index: 100;
  min-width: 160px;
  padding: 0;
  margin: 2px 0 0;
  font-size: 14px;
  border-color: ${themeSettingBorderColor};
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 1px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background-color: ${themeSettingBackgroundColor};
  ul {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      display: flex;
      justify-content: space-around;
      button {
        cursor: pointer;
        border: 0;
        background-color: transparent;
        color: ${themeSettingButtonColor};
        line-height: 30px;
        font-size: 1em;
        text-transform: capitalize;
      }
      button:hover {
        color: ${themeSettingButtonHoverColor};
      }
    }
    li:first-child {
      button:nth-child(2) {
        font-size: 1.4em;
      }
    }
  }
`

const themes = [
  {
    name: `bodyFontSize`,
    value: [`a`, `A`],
    default: 16,
    fn: (v, state) => {
      const value = state[`bodyFontSize`]
      if (v === `a` && value > 12) {
        return value - 1
      }
      if (v === `A` && value < 40) {
        return value + 1
      }
      return value
    },
  },
  {
    name: `fontFamily`,
    value: [`serif`, `sans`],
    default: `sans`,
    fn: v => v,
  },
  {
    name: `mode`,
    value: [`white`, `sepia`, `night`],
    default: `white`,
    fn: v => v,
  },
]

// TODO: 优化逻辑
const ThemeSetting = ({ setTheme }) => {
  console.log()
  return (
    <ThemeSettingWarpper>
      <ul>
        {themes.map(({ name, value, fn }) => (
          <li key={name}>
            {value.map((v, i) => (
              <button
                key={i}
                onClick={() => {
                  setTheme(state => {
                    return {
                      ...state,
                      [name]: fn(v, state),
                    }
                  })
                }}
              >
                {v}
              </button>
            ))}
          </li>
        ))}
      </ul>
    </ThemeSettingWarpper>
  )
}

ThemeSetting.propTypes = {
  toggleSidebarHandler: PropTypes.func,
  toggleSearchHandler: PropTypes.func,
  pageContext: PropTypes.shape({
    shareTitle: PropTypes.string,
  }),
}

export default ThemeSetting
