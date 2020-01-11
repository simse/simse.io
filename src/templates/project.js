import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from '../components/layout'
import SEO from '../components/seo'

export default function Template({
    data,
    pageContext // this prop will be injected by the GraphQL query below.
}) {
    return (
        <Layout>
            <SEO title={"hello world"} />
            <h1>hello</h1>
        </Layout>
    )
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
        id
        body
        frontmatter {
            name
        }
    }
  }
`