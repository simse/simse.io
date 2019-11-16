module.exports = {
    siteMetadata: {
        title: `Simon Sørensen`,
        description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
        author: `@gatsbyjs`,
    },
    plugins: [
        `gatsby-plugin-netlify-cms`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sass`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-yaml`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/data/`,
            },
        },
        {
            resolve: "gatsby-plugin-react-svg",
            options: {
                rule: {
                    include: /assets/ // See below to configure properly
                }
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/static/assets`,
                name: 'images',
            },
        },
        `gatsby-transformer-sharp`,
        {
            resolve: 'gatsby-plugin-sharp',
            options: {
                useMozJpeg: false,
                stripMetadata: true,
                defaultQuality: 75,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `blog`,
                path: `${__dirname}/blog`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    'gatsby-remark-relative-images',
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 1200,
                        },
                    },
                ],
            },
        },
        {
            resolve: "gatsby-plugin-ackee-tracker",
            options: {
                // Domatin ID found when adding a domain in the admin panel.
                domainId: '389453d6-2eb6-4142-9dd1-c03f0d3a2ce7',
                // URL to Server eg: "https://analytics.test.com".
                server: 'https://analytics.simse.io',
                // Disabled analytic tracking when running localy
                ignoreLocalhost: true,
                // If enabled it will collect info on OS, BrowserInfo, Device  & ScreenSize
                detailed: false
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
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}
