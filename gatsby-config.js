module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
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
      resolve: `gatsby-source-ghost`,
      options: {
        apiUrl: `https://ghost.simse.io`,
        contentApiKey: `1701af313f55d48b5f07abd057`,
      },
    },
    /*{
      resolve: `gatsby-transformer-rehype`,
      options: {
          filter: node => (
              // this is an example (any node type can be selected)
              node.internal.type === `GhostPost`
          ),
          plugins: [
              {
                  resolve: `gatsby-rehype-inline-images`,
                  // all options are optional and can be omitted
                  options: {
                      // all images larger are scaled down to maxWidth (default: maxWidth = imageWidth)
                      // maxWidth: 2000,
                      withWebp: true,
                      // disable, if you need to save memory
                      useImageCache: true,
                  }
              },
          ],
      },
    },*/
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
