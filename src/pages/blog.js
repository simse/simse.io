import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

//import Layout from "../components/layout"
import SEO from "../components/seo"

import styles from "../styles/pages/blog.module.scss"

const BlogPage = ({data}) => (
  <div className={styles.blog}>
    <SEO title="Blog" />

    <Link to={"/"}>
      <img src={require("../images/logo.svg")} className={styles.logo} alt="Simon's signature" />
    </Link>

    {/*<h1 className={styles.title}>Da blog</h1>*/}

    <div className={styles.posts}>
      {data.allGhostPost.nodes.map(post => (
        <Link to={"/blog/" + post.slug}>
          <div className={styles.post}>
            <Img fluid={post.localFeatureImage.childImageSharp.fluid} />

            <span className={styles.meta}>{post.tags[0].name} — {post.published_at}</span>

            <h2>{ post.title }</h2>
          </div>
        </Link>
      ))}
    </div>
  </div>
)

export default BlogPage

export const query = graphql`
  query {
    allGhostPost(filter: {slug: {ne: "data-schema"}}) {
      nodes {
        title
        slug
        published_at(formatString: "MMMM DD, YYYY")
        tags {
            name
        }
        localFeatureImage {
            childImageSharp {
              fluid(maxWidth: 300, maxHeight: 200, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
  }
`