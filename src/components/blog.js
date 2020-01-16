import { useStaticQuery, graphql } from "gatsby"
import React from "react"

import BlogPostCard from "./blog-post-card"
import '../styles/blog-component.scss'

const Blog = () => {
    const data = useStaticQuery(graphql`
        query {
          allMdx(
                limit: 4,
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
        <section className={'blog'}>
            <h2>Blog posts</h2>
            <h3 className={'subtitle'}>Four golden nuggets just for you</h3>

            <div className={"blog-posts"}>
            {data.map((post) => (
                <BlogPostCard
                    key={post.fields.slug}
                    title={post.frontmatter.title}
                    category={post.frontmatter.category}
                    excerpt={post.excerpt}
                    link={post.fields.slug}
                    image={post.frontmatter.thumbnail.childImageSharp.fluid}
                    date={post.frontmatter.date} />
            ))}
            </div>
        </section>
    )
}

export default Blog
