import React from 'react'
import { StaticQuery, graphql, Link } from "gatsby"


const BlogPosts = () => (
  <StaticQuery
    query={graphql`
      query BlogPosts {
        allMarkdownRemark(filter: {frontmatter: {type: {eq: "blog"}}} limit: 2) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                category
                date(formatString: "MMMM DD, YYYY")
              }
              excerpt(pruneLength: 150)
            }
          }
        }
      }
    `}
    render={data => (
      <div className="blog-posts">
        <h2 style={{
          textAlign: 'center',
          marginTop: 50
        }} className="title">From the blog</h2>

        <div className="post-wrapper" style={{
          display: 'flex'
        }}>
        {data.allMarkdownRemark.edges
          .map(({ node: blog }) => (
            <Link to={'blog/' + blog.fields.slug} style={{
              textDecoration: 'none'
            }}>
              <div style={{
                color: '#fff',
                background: 'rgba(255, 255, 255, 0.07)',
                padding: 40,
                boxShadow: '0 4px 12px 0 rgba(0,0,0,.05) !important',
                margin: 10,
                borderRadius: 8
              }}>
                <span style={{
                  opacity: 0.5
                }}>{blog.frontmatter.date} - {blog.frontmatter.category}</span>

                <h1 style={{
                  fontWeight: 'bold',
                  fontSize: '1.1rem'
                }}>{blog.frontmatter.title}</h1>

                <p style={{
                  marginBottom: 0
                }}>{blog.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )}
  />
)

export default BlogPosts
