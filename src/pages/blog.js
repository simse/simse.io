import React from 'react'
import { graphql } from 'gatsby'
import Img from "gatsby-image"
import { Row, Col } from 'react-grid-system';

import BlogLayout from '../components/blog-layout'
import SEO from '../components/seo'

// Page components
import Navbar from '../components/navbar'
import BlogCard from '../components/blog-card'

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
        textAlign: 'center',
        marginBottom: 50
      }}>
        <h1 style={{
          fontSize: '5rem',
        }}>Blog</h1>

        <p style={{
          maxWidth: '50%',
          margin: '0 auto',
          fontSize: '1.4rem',
        }}>Welcome to my blog. Here you'll find anything from opinion pieces to helpful advice. Oh, and I've turned the lights on for this page.</p>
      </div>

      <div style={{
        maxWidth: '90%',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontWeight: '400',
          textTransform: 'uppercase',
          fontSize: '1.2rem'
        }}>Recent additions</h2>

        <Row>
        <Col sm={4}>
          <BlogCard title="Not everything seems to be what meets the eye" />
        </Col>

        <Col sm={4}>
          <BlogCard title="Hello" />
        </Col>

        <Col sm={4}>
          <BlogCard title="Hello" />
        </Col>

        <Col sm={4}>
          <BlogCard title="Not everything seems to be what meets the eye" />
        </Col>

        <Col sm={4}>
          <BlogCard title="Hello" />
        </Col>

        <Col sm={4}>
          <BlogCard title="Hello" />
        </Col>
        </Row>
      </div>
    </div>
  </BlogLayout>
)

export default BlogPage
