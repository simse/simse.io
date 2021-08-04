module.exports = {
  siteMetadata: {
    title: `Simon Sørensen`,
    description: `Hello! My name is Simon, I am 19 years old and I love making beautiful and fast software. Check out my latest project called qc :)`,
    author: `@simse`,
    siteUrl: `https://simse.io`,
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /icons/ // See below to configure properly
        }
      }
    },
    `gatsby-plugin-build-date`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
    {
      resolve: `gatsby-transformer-rehype`,
      options: {
        filter: node => (
          node.internal.type === `GhostPost`
        ),
        plugins: [
          {
            resolve: `gatsby-rehype-prismjs`,
            options: {
              divClassNames: "kg-card kg-code-card",
              classPrefix: "language-",
              inlineCodeMarker: null,
              noInlineHighlight: true,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-ghost`,
      options: {
        apiUrl: `https://ghost.simse.io`,
        contentApiKey: `4a509adc98a9b5f7fa4e7d4924`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/wink.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
