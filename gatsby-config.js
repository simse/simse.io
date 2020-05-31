module.exports = {
    siteMetadata: {
        title: `Simon Sørensen`,
        description: `Simon's personal website.`,
        author: `@simse`,
        siteUrl: 'https://simse.io'
    },
    plugins: [
        `gatsby-plugin-sitemap`,
        `gatsby-plugin-robots-txt`,
        `gatsby-plugin-netlify-cms`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sass`,
        `gatsby-plugin-transition-link`,
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
              trackingId: "UA-131675946-2",
              defer: true,
            },
        },
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
                defaultQuality: 100,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `blog`,
                path: `${__dirname}/content/blog`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `podcast`,
                path: `${__dirname}/content/podcast`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `projects`,
                path: `${__dirname}/content/project`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    'gatsby-remark-relative-images',
                    `gatsby-remark-smartypants`,
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 1200,
                            withWebp: true,
                            wrapperStyle: 'transform: scale(1.1);'
                        },
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                gatsbyRemarkPlugins: [
                    'gatsby-remark-embed-video',
                    'gatsby-remark-relative-images',
                    `gatsby-remark-smartypants`,
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 1200,
                            withWebp: true,
                            wrapperStyle: 'transform: scale(1.2);margin:70px 0;display:block;'
                        },
                    },
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            // Class prefix for <pre> tags containing syntax highlighting;
                            // defaults to 'language-' (e.g. <pre class="language-js">).
                            // If your site loads Prism into the browser at runtime,
                            // (e.g. for use with libraries like react-live),
                            // you may use this to prevent Prism from re-processing syntax.
                            // This is an uncommon use-case though;
                            // If you're unsure, it's best to use the default value.
                            classPrefix: "language-",
                            // This is used to allow setting a language for inline code
                            // (i.e. single backticks) by creating a separator.
                            // This separator is a string and will do no white-space
                            // stripping.
                            // A suggested value for English speakers is the non-ascii
                            // character '›'.
                            inlineCodeMarker: null,
                            // This lets you set up language aliases.  For example,
                            // setting this to '{ sh: "bash" }' will let you use
                            // the language "sh" which will highlight using the
                            // bash highlighter.
                            aliases: {},
                            // This toggles the display of line numbers globally alongside the code.
                            // To use it, add the following line in gatsby-browser.js
                            // right after importing the prism color scheme:
                            //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
                            // Defaults to false.
                            // If you wish to only show line numbers on certain code blocks,
                            // leave false and use the {numberLines: true} syntax below
                            showLineNumbers: false,
                            // If setting this to true, the parser won't handle and highlight inline
                            // code used in markdown i.e. single backtick code like `this`.
                            noInlineHighlight: false,
                            // This adds a new language definition to Prism or extend an already
                            // existing language definition. More details on this option can be
                            // found under the header "Add new language definition or extend an
                            // existing language" below.
                            languageExtensions: [{
                                language: "superscript",
                                extend: "javascript",
                                definition: {
                                    superscript_types: /(SuperType)/,
                                },
                                insertBefore: {
                                    function: {
                                        superscript_keywords: /(superif|superelse)/,
                                    },
                                },
                            }, ],
                            // Customize the prompt used in shell output
                            // Values below are default
                            prompt: {
                                user: "root",
                                host: "localhost",
                                global: false,
                            },
                            // By default the HTML entities <>&'" are escaped.
                            // Add additional HTML escapes by providing a mapping
                            // of HTML entities and their escape value IE: { '}': '&#123;' }
                            escapeEntities: {},
                        },
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `simse.io`,
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