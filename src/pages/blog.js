import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";

//import Layout from "../components/layout"
import SEO from "../components/seo"
import Navbar from "../components/navbar"

import * as styles from "../styles/pages/blog.module.scss"

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
            {post.localFeatureImage && <GatsbyImage
              image={post.localFeatureImage.childImageSharp.gatsbyImageData}
              alt="Picture of Simon" />}

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
    allGhostPost(sort: {fields: published_at, order: DESC}) {
      nodes {
        id
        title
        slug
        published_at(formatString: "MMMM DD, YYYY")
        tags {
          name
        }
        localFeatureImage {
          childImageSharp {
            gatsbyImageData(
              height: 300
              width: 500
              placeholder: BLURRED
              formats: AUTO
              layout: CONSTRAINED
              transformOptions: {cropFocus: CENTER}
            )
          }
        }
      }
    }
  }
`