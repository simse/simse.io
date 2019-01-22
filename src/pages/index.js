import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

// Page components
import Navbar from '../components/navbar'
import Hero from '../components/hero'
import Projects from '../components/projects'

const IndexPage = () => (
  <Layout>
    <SEO title="Welcome" keywords={[`gatsby`, `application`, `react`]} />

    <Navbar />

    <Hero />

    <Projects />
  </Layout>
)

export default IndexPage
