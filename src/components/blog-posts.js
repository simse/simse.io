import React from 'react'
import { StaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"


const BlogPosts = () => (
  <StaticQuery
    query={graphql`
      query BlogPosts {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC } filter: {frontmatter: {type: {eq: "blog"}}} limit: 2) {
          edges {
            node {
              fields {
                slug
                featuredImage {
                  childImageSharp{
                    fixed(width: 150, height: 150, quality: 90) {
                      ...GatsbyImageSharpFixed
                    }
                  }
                }
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
              <div className="post-inner" style={{
                color: '#fff',
                background: 'rgba(255, 255, 255, 0.07)',
                padding: 40,
                boxShadow: '0 4px 12px 0 rgba(0,0,0,.05) !important',
                margin: 10,
                borderRadius: 8,
                display: 'flex'
              }}>

                <div className="image" style={{
                  minWidth: '150px',
                }}>
                  <Img fixed={blog.fields.featuredImage.childImageSharp.fixed} style={{borderRadius: 8}} />
                </div>

                <div>
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    )}
  />
)

export default BlogPosts
