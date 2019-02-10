import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Navbar from '../components/navbar'

import '../styles/blog-post.scss'

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <div className="blog-post">
      <Navbar type="white" />

      <div className="post-header">
        <div>
          <h1 className="title">{post.frontmatter.title}</h1>
          <p className="tagline">{post.frontmatter.subtitle}</p>

          <p className="meta"><span style={{textTransform: 'capitalize'}}>{post.frontmatter.category}</span> &mdash; {post.frontmatter.date} &mdash; Simon Sorensen</p>
        </div>


        <div className="image">
          <Img fluid={post.fields.featuredImage.childImageSharp.fluid} />
        </div>
      </div>

      <div class="content">
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </div>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        featuredImage {
          childImageSharp{
            fluid(maxWidth: 3000, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      frontmatter {
        date(formatString: "MMMM Do, YYYY")
        title
        subtitle
        category
      }
    }
  }
`
