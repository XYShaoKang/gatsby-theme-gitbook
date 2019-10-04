module.exports = {
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
        plugins: [],
      },
    },
    `gatsby-plugin-styled-components`,
  ],
}
