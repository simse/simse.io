import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { overrideDate } from "../utils/date"

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
      {data.allGraphCmsBlogPost.nodes.map(post => (
        <Link to={"/blog/" + post.slug} key={post.slug}>
          <div className={styles.post}>
            {post.featuredImage && <GatsbyImage
              image={post.featuredImage.gatsbyImageData}
              alt="Picture of Simon" />}

            <div className={styles.text}>
              <span className={styles.meta}>{post.category.name} — {overrideDate(post.publishedAt, post.overridePublishDate)}</span>

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
    allGraphCmsBlogPost(sort: {fields: publishedAt, order: DESC}) {
      nodes {
        title
        slug
        publishedAt
        overridePublishDate
        category {
          name
        }
        featuredImage {
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
`