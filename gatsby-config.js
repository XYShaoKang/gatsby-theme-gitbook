export default {
  siteMetadata: {
    title: `GitBook文档（中文版）`,
    description: `GitBook文档（中文版）.`,
    author: `@chrisniael`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: `docs`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: `language-`,
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: `superscript`,
                  extend: `javascript`,
                  definition: {
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      // eslint-disable-next-line @typescript-eslint/camelcase
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              prompt: {
                user: `root`,
                host: `localhost`,
                global: false,
              },
            },
          },
        ],
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(
          `./src/components/layout.tsx`
        ),
      },
    },
    {
      resolve: `gatsby-plugin-codegen`,
      options: {},
    },
  ],
}
