import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

// Page components
import Navbar from '../components/navbar'
import Hero from '../components/hero'
import Projects from '../components/projects'

const IndexPage = () => (
  <Layout>
    <SEO title="Simon Norager Sorensen" keywords={[`simse`, `Simon`, `portfolio`]} />

    <Navbar />

    <Hero />

    <Projects />
  </Layout>
)

export default IndexPage
