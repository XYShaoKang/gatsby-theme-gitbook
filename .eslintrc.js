/**
 * @type {import("eslint").Linter.Config}
 */
const config = {
  parser: `@typescript-eslint/parser`,
  extends: [
    `plugin:react/recommended`,
    `plugin:@typescript-eslint/recommended`,
    `prettier/@typescript-eslint`,
    `plugin:prettier/recommended`,
  ],
  plugins: [
    `@typescript-eslint`,
    `prettier`,
    `react`,
    `filenames`,
  ],
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
    '@typescript-eslint/explicit-function-return-type': `off`,
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
    {
      files: [`src/**/*.d.ts`],
      rules: {
        'prettier/prettier': [
          `error`,
          { singleQuote: false },
        ],
        quotes: [`error`, `double`],
        '@typescript-eslint/interface-name-prefix': `off`,
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
