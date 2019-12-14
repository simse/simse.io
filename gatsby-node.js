/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const {
    fmImagesToRelative
} = require('gatsby-remark-relative-images')
const {
    createFilePath
} = require("gatsby-source-filesystem")

exports.onCreateNode = ({
    node,
    actions,
    getNode
}) => {
    fmImagesToRelative(node);

    const {
        createNodeField
    } = actions
    // you only want to operate on `Mdx` nodes. If you had content from a
    // remote CMS you could also check to see if the parent node was a
    // `File` node here
    if (node.internal.type === "Mdx") {
        const value = createFilePath({
            node,
            getNode
        })
        createNodeField({
            // Name of the field you are adding
            name: "slug",
            // Individual MDX node
            node,
            // Generated value based on filepath with "blog" prefix. you
            // don't need a separating "/" before the value because
            // createFilePath returns a path with the leading "/".
            value: `/blog${value}`,
        })
    }
};

const path = require(`path`)
exports.createPages = async ({
    actions,
    graphql,
    reporter
}) => {
    /* Add Blog posts */
    const {
        createPage
    } = actions

    const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
                category
            }
          }
        }
      }
    }
  `)
    if (result.errors) {
        reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
    }
    // Create blog post pages.
    const posts = result.data.allMdx.edges
    // you'll call `createPage` for each result
    posts.forEach(({
        node
    }, index) => {
        createPage({
            // This is the slug you created before
            // (or `node.frontmatter.slug`)
            path: node.fields.slug,
            // This component will wrap our MDX content
            component: path.resolve(`./src/templates/post.js`),
            // You can use the values in this context in
            // our page layout component
            context: {
                id: node.id,
                category: node.frontmatter.category
            },
        })
    })

    /* Add podcast */
    const podcastTemplate = path.resolve(`src/templates/podcast.js`)
    const podcasts = await graphql(`
        {
        allDataYaml {
            nodes {
                    podcasts {
                        path
                        id
                    }
                }
            }
        }
    `)
    // Handle errors
    if (podcasts.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }
    podcasts.data.allDataYaml.nodes.forEach((podcasts) => {
        if (podcasts.podcasts !== null) {
            podcasts.podcasts.forEach((podcast) => {
                createPage({
                    path: podcast.path,
                    component: podcastTemplate,
                    context: {
                        id: podcast.id
                    }
                })
            })
        }
    })

    /* Add podcast episodes */
    const podcastEpisodeTemplate = path.resolve(`src/templates/podcast_episode.js`)
    const podcast_episodes = await graphql(`
        {
            allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___episode] },
                limit: 1000,
                filter: {fileAbsolutePath: {regex: "\/podcast/"}}
            ) {
                edges {
                    node {
                        frontmatter {
                            path
                            podcast
                        }
                    }
                }
            }
        }
    `)
    // Handle errors
    if (podcast_episodes.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }
    podcast_episodes.data.allMarkdownRemark.edges.forEach(({
        node
    }) => {
        createPage({
            path: node.frontmatter.path,
            component: podcastEpisodeTemplate,
            context: {
                podcast: node.frontmatter.podcast,
            }, // additional data can be passed via context
        })
    })
}