module.exports = {
  siteMetadata: {
    title: `simse.io`,
    description: `This is the personal website for Simon Sorensen (also called Simse). Here you'll find my work, experiments and my blog. I welcome you to my small space on the internet.`,
    author: `@simse`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/static/assets`,
        ignore: [`_redirects`]
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `labs`,
        path: `${__dirname}/src/labs`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/src/projects`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/blog`,
        name: "content"
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-relative-images`,
            options: {
              name: 'assets',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-prismjs`

        ],
      }
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: 'src/utils/typography'
      }
    },
    'gatsby-transformer-yaml',
    `gatsby-transformer-screenshot`,
    `gatsby-plugin-netlify-cms`,
    'gatsby-plugin-netlify-cache',
    `gatsby-plugin-favicon`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
      },
    },
  ],
}
