import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from '../components/layout'
import '../styles/blog-post.scss'

export default function Template({
    data, // this prop will be injected by the GraphQL query below.
}) {
    const { markdownRemark } = data // data.markdownRemark holds your post data
    const { frontmatter, html } = markdownRemark
    let thumbnail  = frontmatter.thumbnail.childImageSharp.fluid

    return (
        <Layout>
            <div className="blog-post-container">
                <div className="blog-post">
                    <h1 className="blog-post-title">{frontmatter.title}</h1>
                    <h2 className="blog-post-meta">{frontmatter.date}</h2>

                    <div className="blog-post-image">
                        <Img fluid={thumbnail} />
                    </div>

                    <div
                        className="blog-post-content"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </div>
            </div>
        </Layout>
    )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        category
        thumbnail {
            childImageSharp {
                fluid(maxWidth: 2000, maxHeight: 650) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
      }
    }
  }
`