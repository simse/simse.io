import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from "gatsby-image"
import { Row, Col } from 'react-grid-system';

import BlogLayout from '../components/blog-layout'
import SEO from '../components/seo'

// Page components
import Navbar from '../components/navbar'
import BlogCard from '../components/blog-card'
import Footer from '../components/footer'

const BlogPage = ({ data }) => (
  <BlogLayout>
    <SEO title="Blog" keywords={[`blog`, `technical`, `personal`]} />

    <Navbar type="blog" />

    <div style={{
      paddingTop: 40,
      maxWidth: '100vw',
      overflowX: 'hidden'
    }}>
      <div style={{
        maxWidth: '90%',
        margin: '0 auto'
      }}>
        <div style={{
          marginBottom: 50
        }}>
          <h1 style={{
            fontSize: '5rem',
            fontWeight: '300'
          }}>blog.</h1>

          <p style={{
            maxWidth: '70%',
            fontSize: '1.4rem',
          }}>Welcome to my blog. Here you'll find anything from opinion pieces to helpful advice. Oh, and I've turned the lights on for this page.</p>
        </div>

        <h2 style={{
          fontWeight: '400',
          textTransform: 'uppercase',
          fontSize: '1.2rem'
        }}>Recent additions</h2>

        <Row>
        {data.allMarkdownRemark.edges
          .map(({ node: post }) => (
            <Col sm={4} style={{
              marginBottom: 50
            }}>
              <Link to={'/blog' + post.fields.slug} style={{
                textDecoration: 'none',
                color: '#000'
              }}>
                <Img fluid={post.fields.featuredImage.childImageSharp.fluid}
                  className="hover-image"
                  style={{
                  borderRadius: 8,
                  marginBottom: 20
                }} />

                <BlogCard title={post.frontmatter.title} excerpt={post.excerpt} category={post.frontmatter.category} date={post.frontmatter.date} />
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>

    <Footer />
  </BlogLayout>
)

export default BlogPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, filter: { frontmatter: {type: {eq:"blog"}} }) {
      edges {
        node {
          excerpt
          fields {
            slug
            featuredImage {
              childImageSharp{
                fluid(maxWidth: 700, maxHeight: 500, quality: 70) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            category
          }
        }
      }
    }
  }
`
