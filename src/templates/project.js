import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from '../components/layout'
import SEO from '../components/seo'
import "../styles/project.scss"

export default function Template({
    data,
    pageContext // this prop will be injected by the GraphQL query below.
}) {
    return (
        <Layout>
            <SEO title={data.mdx.frontmatter.name} />
            
            <div className="project-page">
                <MDXRenderer>{data.mdx.body}</MDXRenderer>
            </div>
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