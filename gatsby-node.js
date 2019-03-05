/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark` && node.frontmatter.type === 'blog') {
    const slug = createFilePath({ node, getNode, basePath: `blog` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    createNodeField({
      node,
      name: `featuredImage`,
      value: '../../static' + node.frontmatter.image,
    })
  }

  if (node.internal.type === `MarkdownRemark` && node.frontmatter.type === 'project') {
    const slug = createFilePath({ node, getNode, basePath: `project` })
    createNodeField({
      node,
      name: `slug`,
      value: '/project' + slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              type
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {

      if(node.frontmatter.type == 'blog') {
        createPage({
          path: '/blog' + node.fields.slug,
          component: path.resolve(`./src/templates/blog.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        })
      }

      if(node.frontmatter.type == 'project') {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/project.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        })
      }
    })
  })
}
