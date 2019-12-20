import { useStaticQuery, graphql } from "gatsby"
import React from "react"

import BlogPostCard from "../components/blog-post-card"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/blog-page.scss"

const Blog = () => {
    const data = useStaticQuery(graphql`
        query {
            allMdx(
                filter: {fileAbsolutePath: {regex: "\/blog/"}, frontmatter: {status: {eq: "published"}}},
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
    `).allMdx.nodes

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
