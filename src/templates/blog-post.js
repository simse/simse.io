import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import SEO from "../components/seo"
import Navbar from "../components/navbar"

import ArrowLeft from "../icons/arrow-left.svg"
import styles from "../styles/pages/blog-post.module.scss"

export default function BlogPost({data, pageContext}) {
    const post = data.ghostPost

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
            <SEO title={post.title} />

            <Navbar breadcrumbs={breadcrumbs} />

            <div className={styles.post}>
                <h1 className={styles.title}>{post.title}</h1>

                <div className={styles.tags}>
                    {post.tags.map(tag => (
                        <span key={tag.name}>{tag.name}</span>
                    ))}

                    <span> — </span>

                    <span>{post.published_at}</span>
                </div>

                <Img fluid={post.localFeatureImage.childImageSharp.fluid} />

                <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.childHtmlRehype.html }}></div>

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
  query($ghostId: String!) {
    ghostPost(ghostId: {eq: $ghostId}) {
      slug
        childHtmlRehype {
            html
          }
        title
        published_at(formatString: "MMMM DD, YYYY")
        tags {
            name
        }
        localFeatureImage {
            childImageSharp {
              fluid(maxHeight: 600, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        
      }
  }
`