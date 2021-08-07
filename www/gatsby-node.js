/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
/*const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.onCreateNode = async ({
  node,
  actions,
  store,
  createNodeId,
  cache
}) => {
  // Check that we are modifying right node types.
  const nodeTypes = [`GhostPost`, `GhostPage`];
  if (!nodeTypes.includes(node.internal.type)) {
    return;
  }

  const { createNode } = actions;

  // Download image and create a File node with gatsby-transformer-sharp.
  const fileNode = await createRemoteFileNode({
    url: node.feature_image,
    store,
    cache,
    createNode,
    parentNodeId: node.id,
    createNodeId
  });

  if (fileNode) {
    // Link File node to GhostPost node at field image.
    node.localFeatureImage___NODE = fileNode.id;
  }
};*/

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
      query {
        allWpPost {
            edges {
                node {
                    slug
                    title
                    databaseId
                }
            }
          }
      }
    `)

  result.data.allWpPost.edges.forEach(({ node }, i, edges) => {
    // Ignore data schema "ghost" post
    if (node.slug === "data-schema") return

    let previousPost = null
    let nextPost = null

    if (edges[i - 1]) {
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
    }

    createPage({
      path: "blog/" + node.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        id: node.databaseId,
        previousPost: previousPost,
        nextPost: nextPost
      },
    })
  })
}