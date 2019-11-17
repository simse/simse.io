/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

exports.onCreateNode = ({ node }) => {
    fmImagesToRelative(node);
};

const path = require(`path`)
exports.createPages = async ({ actions, graphql, reporter }) => {
    /* Add Blog posts */
    const { createPage } = actions
    const blogPostTemplate = path.resolve(`src/templates/post.js`)
    const result = await graphql(`
        {
            allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] },
                limit: 1000,
                filter: {fileAbsolutePath: {regex: "\/blog/"}}
            ) {
                edges {
                    node {
                        frontmatter {
                            path
                        }
                    }
                }
            }
        }
    `)
    // Handle errors
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: node.frontmatter.path,
            component: blogPostTemplate,
            context: {}, // additional data can be passed via context
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
        if(podcasts.podcasts !== null) {
            createPage({
                path: podcasts.podcasts[0].path,
                component: podcastTemplate,
                context: {
                    id: podcasts.podcasts[0].id
                }
            })
        }
    })

    /* Add podcast episodes */
    const podcastEpisodeTemplate = path.resolve(`src/templates/podcast_episode.js`)
    const podcast_episodes = await graphql(`
        {
            allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] },
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
    podcast_episodes.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: node.frontmatter.path,
            component: podcastEpisodeTemplate,
            context: {
                podcast: node.frontmatter.podcast
            }, // additional data can be passed via context
        })
    })
}