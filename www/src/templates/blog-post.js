import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";

import SEO from "../components/seo"
import Navbar from "../components/navbar"

import ArrowLeft from "../icons/arrow-left.svg"
import * as styles from "../styles/pages/blog-post.module.scss"

export default function BlogPost({data, pageContext}) {
    const post = data.wpPost

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
            <SEO title={post.title} />

            <Navbar breadcrumbs={breadcrumbs} />

            <div className={styles.post}>
                <h1 className={styles.title}>{post.title}</h1>

                <div className={styles.tags}>
                    {post.categories.nodes.map(category => (
                        <span key={category.name}>{category.name}</span>
                    ))}

                    <span> — </span>

                    <span>{post.date}</span>
                </div>

              {post.featuredImage && <GatsbyImage
                image={post.featuredImage.node.localFile.childImageSharp.gatsbyImageData} alt="a picture" />}

                <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }}></div>

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
  query($id: Int!) {
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
  }
`