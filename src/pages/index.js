import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

// Page components
import Navbar from '../components/navbar'
import Hero from '../components/hero'
import Projects from '../components/projects'
import BlogPosts from '../components/blog-posts'
import Contact from '../components/contact'
import Footer from '../components/footer'

const IndexPage = () => (
  <Layout>
    <SEO title="Simon Sørensen" keywords={[`simse`, `Simon`, `portfolio`]} />

    <Navbar />

    <Hero />

    <Projects />

    <BlogPosts />

    <Contact />

    <Footer />
  </Layout>
)

export default IndexPage
