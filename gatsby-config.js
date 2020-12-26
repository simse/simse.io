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
        contentApiKey: `1701af313f55d48b5f07abd057`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    /*{
      resolve: `gatsby-plugin-ghost-images`,
      options: {
          // An array of node types and image fields per node
          // Image fields must contain a valid absolute path to the image to be downloaded
          lookup: [
              {
                  type: `GhostPost`,
                  imgTags: [`feature_image`],
              }
          ],
          // Additional condition to exclude nodes 
          // Takes precedence over lookup
          exclude: node => (
              node.ghostId === undefined
          ),
          // Additional information messages useful for debugging
          verbose: true,
      },
  },*/
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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
