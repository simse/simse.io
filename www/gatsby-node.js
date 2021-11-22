/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
      query {
        allGraphCmsBlogPost {
          nodes {
            title
            slug
            id
          }
        }
      }
    `)

  result.data.allGraphCmsBlogPost.nodes.forEach((post) => {
    let previousPost = null
    let nextPost = null

    /*if (edges[i - 1]) {
      previousPost = {
        title: edges[i - 1].node.title,
        slug: edges[i - 1].node.slug,
      }
    }

    if (edges[i + 1]) {
      nextPost = {
        title: edges[i + 1].node.title,
        slug: edges[i + 1].node.slug,
      }
    }*/

    // console.log(post)

    createPage({
      path: "blog/" + post.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        id: post.id,
        previousPost: previousPost,
        nextPost: nextPost
      },
    })
  })

  // Create project pages
  const projects = await graphql(`
      query {
        allGraphCmsProject {
          nodes {
            id
            slug
          }
        }
      }
    `)

  projects.data.allGraphCmsProject.nodes.forEach((project) => {
    createPage({
      path: "project/" + project.slug,
      component: path.resolve(`./src/templates/project-page.js`),
      context: {
        id: project.id,
      },
    })
  })
}