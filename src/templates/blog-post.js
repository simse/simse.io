import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import SEO from "../components/seo"

import styles from "../styles/pages/blog-post.module.scss"

export default function BlogPost({data}) {
    const post = data.ghostPost

    return (
        <>
            <SEO title={post.title} />

            <div className={styles.post}>
                <Link to={"/"}>
                    <img src={require("../images/logo.svg")} className={styles.logo} alt="Simon's signature" />
                </Link>

                <h1 className={styles.title}>{post.title}</h1>

                <div className={styles.tags}>
                    {post.tags.map(tag => (
                        <span>{tag.name}</span>
                    ))}

                    <span> — </span>

                    <span>{post.published_at}</span>
                </div>

                <Img fluid={post.localFeatureImage.childImageSharp.fluid} />

                <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.html }}></div>
            </div>
        </>
    )
  }

export const query = graphql`
  query($ghostId: String!) {
    ghostPost(ghostId: {eq: $ghostId}) {
        html
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