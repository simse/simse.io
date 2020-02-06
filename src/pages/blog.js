import { useStaticQuery, graphql } from "gatsby"
import React from "react"

import BlogPostCard from "../components/blog-post-card"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "../styles/pages/blog.module.scss"

const Blog = () => {
    const data = useStaticQuery(graphql`
        query {
            allMdx(
                filter: {fileAbsolutePath: {regex: "\/blog/"}},
                sort: {fields: frontmatter___date, order: DESC}
            ) {
              nodes  {
                excerpt(pruneLength: 200)
                fields {
                    slug
                }
                frontmatter {
                  title
                  category
                  date(formatString: "DD MMMM YYYY")
                  path
                  thumbnail {
                    childImageSharp {
                        fluid(maxWidth: 400, maxHeight: 250, cropFocus: CENTER, quality: 90) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                  }
                }
              }
            }
          }
    `).allMdx.nodes

    return (
        <Layout>
            <SEO title="Blog" />

            <section className={styles.page}>
                <h1 className="pageTitle">Blog</h1>

                <div className={styles.posts}>
                    {data.map((post) => (
                        <BlogPostCard
                            title={post.frontmatter.title}
                            category={post.frontmatter.category}
                            excerpt={post.excerpt}
                            link={post.fields.slug}
                            image={post.frontmatter.thumbnail.childImageSharp.fluid}
                            date={post.frontmatter.date} />
                    ))}
                </div>
            </section>
        </Layout>
    )
}

export default Blog
