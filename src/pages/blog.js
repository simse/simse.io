import { useStaticQuery, graphql } from "gatsby"
import React from "react"

import BlogPostCard from "../components/blog-post-card"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/blog-page.scss"

const Blog = () => {
    const data = useStaticQuery(graphql`
        query {
            allMarkdownRemark {
              nodes  {
                excerpt(pruneLength: 200)
                frontmatter {
                  title
                  category
                  date(formatString: "DD, MMMM YYYY")
                  path
                  thumbnail {
                    childImageSharp {
                        fluid(maxWidth: 400, maxHeight: 250) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                  }
                }
              }
            }
          }
    `).allMarkdownRemark.nodes

    return (
        <Layout>
            <SEO title="Blog" />

            <section className={'blog-page'}>
                <h1>Blog</h1>

                <div className={"blog-posts"}>
                    {data.map((post) => (
                        <BlogPostCard
                            title={post.frontmatter.title}
                            category={post.frontmatter.category}
                            excerpt={post.excerpt}
                            link={post.frontmatter.path}
                            image={post.frontmatter.thumbnail.childImageSharp.fluid}
                            date={post.frontmatter.date} />
                    ))}
                </div>
            </section>
        </Layout>
    )
}

export default Blog
