import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Seo from "../components/seo"
import Navbar from "../components/navbar"
import Footer from "../components/footer"

import ArrowLeft from "../icons/arrow-left.svg"
import * as styles from "../styles/pages/blog-post.module.scss"


export default function BlogPost({data, pageContext}) {
    const post = data.mdx

   // console.log(pageContext)

    let breadcrumbs = [
      {
        "name": "Blog",
        "href": "/blog"
      },
      {
        "name": post.frontmatter.title,
        "href": "/blog/" + post.slug.split("/")[0]
      }
    ]

    // console.log(pageContext)

    return (
        <>
            <Seo title={post.frontmatter.title} />

            <Navbar breadcrumbs={breadcrumbs} />

            <div className={styles.post}>
                <h1 className={styles.title}>{post.frontmatter.title}</h1>

                <div className={styles.tags}>
                    <span>{post.frontmatter.categories[0]}</span>

                    <span> — </span>

                    <span>{post.frontmatter.publishedAt}</span>
                </div>

              {post.frontmatter.featuredImage && <GatsbyImage
                image={post.frontmatter.featuredImage.childImageSharp.gatsbyImageData} alt="a picture" />}

                <div className={styles.content}>
                  <MDXRenderer>{post.body}</MDXRenderer>
                </div>

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

            <Footer />
        </>
    )
  }

export const query = graphql`
  query($id: String!) {
    mdx(id: {eq: $id}) {
      frontmatter {
        categories
        publishedAt(formatString: "YYYY, MMM DD")
        title
        featuredImage {
          childImageSharp {
            gatsbyImageData(
                width: 1000
                height: 600
                placeholder: BLURRED
                layout: CONSTRAINED
                transformOptions: { cropFocus: CENTER }
                quality: 75
            )
          }
        }
      }
      body
      slug
    }
  }
`