import React from "react"
import { graphql } from "gatsby"

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
          <p className="tagline">Every blog must have a great first post. Is this one of them?</p>

          <p className="meta">Python &mdash; February 9th &mdash; Simon Sorensen</p>
        </div>


        <div className="image">
          <img className="" src={require('../images/test.jpg')} />
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
      frontmatter {
        title
      }
    }
  }
`
