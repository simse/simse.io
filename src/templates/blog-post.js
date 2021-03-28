import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";

import SEO from "../components/seo"
import Navbar from "../components/navbar"

import ArrowLeft from "../icons/arrow-left.svg"
import * as styles from "../styles/pages/blog-post.module.scss"

export default function BlogPost({data, pageContext}) {
    const post = data.ghostPost

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
                    {post.tags.map(tag => (
                        <span key={tag.name}>{tag.name}</span>
                    ))}

                    <span> — </span>

                    <span>{post.published_at}</span>
                </div>

              {post.localFeatureImage && <GatsbyImage
                image={post.localFeatureImage.childImageSharp.gatsbyImageData} alt="a picture" />}

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
  query($id: String!) {
    ghostPost(ghostId: {eq: $id}) {
      childHtmlRehype {
        htmlAst
        html
      }
      title
      tags {
        name
        id
      }
      slug
      localFeatureImage {
        childImageSharp {
          gatsbyImageData(
            width: 1600
            placeholder: BLURRED
            formats: AUTO
            layout: CONSTRAINED
          )
        }
      }
      published_at(formatString: "MMMM DD, YYYY")
    }
  }
`