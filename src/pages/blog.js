import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

//import Layout from "../components/layout"
import SEO from "../components/seo"
import Navbar from "../components/navbar"

import styles from "../styles/pages/blog.module.scss"

const BlogPage = ({data}) => (
  <div className={styles.blog}>
    <SEO title="Blog" />

    <Navbar breadcrumbs={
      [
        {
          "name": "Blog",
          "href": "/blog"
        }
      ]
    } />

    <div className={styles.posts}>
      {data.allGhostPost.nodes.map(post => (
        <Link to={"/blog/" + post.slug} key={post.slug}>
          <div className={styles.post}>
            <Img fluid={post.localFeatureImage.childImageSharp.fluid} />

            <div className={styles.text}>
              <span className={styles.meta}>{post.tags[0].name} — {post.published_at}</span>

              <h2>{ post.title }</h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
)

export default BlogPage

export const query = graphql`
  query {
    allGhostPost(filter: {slug: {ne: "data-schema"}}, sort: {fields: published_at, order: DESC}) {
      nodes {
        title
        slug
        published_at(formatString: "MMMM DD, YYYY")
        tags {
            name
        }
        localFeatureImage {
            childImageSharp {
              fluid(maxWidth: 600, maxHeight: 400, quality: 100, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
  }
`