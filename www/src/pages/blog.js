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
      {data.allWpPost.nodes.map(post => (
        <Link to={"/blog/" + post.slug} key={post.slug}>
          <div className={styles.post}>
            {post.featuredImage && <GatsbyImage
              image={post.featuredImage.node.localFile.childImageSharp.gatsbyImageData}
              alt="Picture of Simon" />}

            <div className={styles.text}>
              <span className={styles.meta}>{post.categories.nodes[0].name} — {post.date}</span>

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
    allWpPost(sort: {fields: date, order: DESC}) {
      nodes {
        databaseId
        title
        slug
        date(formatString: "MMMM DD, YYYY")
        categories {
          nodes {
            name
          }
        }
        featuredImage {
          node {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  height: 300
                  width: 500
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                  layout: CONSTRAINED
                  transformOptions: {cropFocus: CENTER}
                )
              }
            }
          }
        }
      }
    }
  }
`