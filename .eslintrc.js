/**
 * @type {import("eslint").Linter.Config}
 */
const config = {
  parser: `babel-eslint`,
  extends: [
    `google`,
    `eslint:recommended`,
    `plugin:react/recommended`,
    `prettier`,
    `prettier/react`,
  ],
  plugins: [`prettier`, `react`, `filenames`],
  parserOptions: {
    ecmaVersion: 2016,
    sourceType: `module`,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  globals: {
    before: true,
    after: true,
    spyOn: true,
    __PATH_PREFIX__: true,
    __BASE_PATH__: true,
    __ASSET_PREFIX__: true,
  },
  rules: {
    'prettier/prettier': `error`,
    'arrow-body-style': [
      `error`,
      `as-needed`,
      { requireReturnForObjectLiteral: true },
    ],
    'no-unused-expressions': [
      `error`,
      {
        allowTaggedTemplates: true,
      },
    ],
    'consistent-return': [`error`],
    'filenames/match-regex': [
      `error`,
      `^[a-z-\\d\\.]+$`,
      true,
    ],
    'no-console': `off`,
    'no-inner-declarations': `off`,
    quotes: [`error`, `backtick`],
    'react/display-name': `off`,
    'react/jsx-key': `warn`,
    'react/no-unescaped-entities': `off`,
    'react/prop-types': `off`,
    'react/self-closing-comp': [
      `error`,
      {
        component: true,
        html: true,
      },
    ],
    'require-jsdoc': `off`,
    'valid-jsdoc': `off`,
  },
  overrides: [
    {
      files: [`gatsby-browser.js`, `.cache/**/*`],
      env: {
        browser: true,
      },
      globals: {
        ___loader: false,
        ___emitter: false,
      },
    },
  ],
  settings: {
    react: {
      version: `16.4.2`,
    },
  },
}

module.exports = config
