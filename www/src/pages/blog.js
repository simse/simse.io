import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Seo from "../components/seo"
import Navbar from "../components/navbar"

import * as styles from "../styles/pages/blog.module.scss"

const BlogPage = ({data}) => (
  <div className={styles.blog}>
    <Seo title="Blog" />

    <Navbar breadcrumbs={
      [
        {
          "name": "Blog",
          "href": "/blog"
        }
      ]
    } />

    <div className={styles.posts}>
      {data.allMdx.nodes.map(post => (
        <Link to={"/blog/" + post.slug.split("/")[0]} key={post.slug.split("/")[0]}>
          <div className={styles.post}>
            {post.frontmatter.featuredImage && <GatsbyImage
              image={post.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
              alt="Blog post featured image" />}

            <div className={styles.text}>
              <span className={styles.meta}>{post.frontmatter.categories[0]} — {post.frontmatter.publishedAt}</span>

              <h2>{ post.frontmatter.title }</h2>
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
    allMdx(sort: {fields: frontmatter___publishedAt, order: DESC}, filter: {frontmatter: {stage: {eq: "published"}}}) {
      nodes {
        slug
        frontmatter {
          title
          publishedAt(formatString: "YYYY, MMM DD")
          categories
          featuredImage {
            childImageSharp {
              gatsbyImageData(
                  height: 300
                  width: 500
                  placeholder: BLURRED
                  layout: CONSTRAINED
              )
            }
          }
        }
      }
    }
  }
`