const axios = require(`axios`)

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
    const { createNode } = actions
  
    // Data can come from anywhere, but for now create it manually
    const response = await axios.get("https://api.health.simse.io/v1/summary")
    // console.log(response)

    response.data.weight.history.forEach(weightNode => {
        const nodeContent = JSON.stringify(weightNode)
  
        const nodeMeta = {
            id: createNodeId(`weight-${weightNode.weight}`),
            parent: null,
            children: [],
            internal: {
                type: `WeightNode`,
                mediaType: `text/plain`,
                content: nodeContent,
                contentDigest: createContentDigest(weightNode)
            }
        }
    
        const node = Object.assign({}, weightNode, nodeMeta)
        createNode(node)
    })
  }