import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { overrideDate } from "../utils/date"

import Seo from "../components/seo"
import Navbar from "../components/navbar"

import ArrowLeft from "../icons/arrow-left.svg"
import * as styles from "../styles/pages/blog-post.module.scss"

export default function BlogPost({data, pageContext}) {
    const post = data.graphCmsBlogPost

   // console.log(pageContext)

    let breadcrumbs = [
      {
        "name": "Blog",
        "href": "/blog"
      },
      {
        "name": post.title,
        "href": "/blog/" + post.slug
      }
    ]

    // console.log(pageContext)

    return (
        <>
            <Seo title={post.title} />

            <Navbar breadcrumbs={breadcrumbs} />

            <div className={styles.post}>
                <h1 className={styles.title}>{post.title}</h1>

                <div className={styles.tags}>
                    <span>{post.category.name}</span>

                    <span> — </span>

                    <span>{overrideDate(post.publishedAt, post.overridePublishDate)}</span>
                </div>

              {post.featuredImage && <GatsbyImage
                image={post.featuredImage.gatsbyImageData} alt="a picture" />}

                <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content.html }}></div>

                <div className={styles.postNav}>
                  {pageContext.previousPost && <Link to={"/blog/" + pageContext.previousPost.slug} className={styles.firstLink}>
                    <div className={styles.postLink}>
                      <ArrowLeft />

                      <span>{pageContext.previousPost.title}</span>
                    </div>
                  </Link>}

                  {pageContext.nextPost && <Link to={"/blog/" + pageContext.nextPost.slug} className={styles.secondLink}>
                    <div className={`${styles.postLink} ${styles.reverse}`}>
                      <ArrowLeft />

                      <span>{pageContext.nextPost.title}</span>
                    </div>
                  </Link>}
                </div>
            </div>
        </>
    )
  }

export const query = graphql`
  query($id: String!) {
    graphCmsBlogPost(id: {eq: $id}) {
      title
      publishedAt
      overridePublishDate
      featuredImage {
        gatsbyImageData(
                width: 1000
                height: 600
                placeholder: BLURRED
                layout: CONSTRAINED
                quality: 80
        )
      }
      category {
        name
      }
      content {
        html
      }
      slug
    }
  }
`
/*
wpPost(databaseId: {eq: $id}) {
      content
      title
      categories {
        nodes {
          name
        }
      }
      slug
      featuredImage {
        node {
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 1600
                placeholder: BLURRED
                formats: AUTO
                layout: CONSTRAINED
              )
            }
          }
        }
      }
      date(formatString: "MMMM DD, YYYY")
    }
    */