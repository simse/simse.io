import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

// Page components
import Navbar from '../components/navbar'
import Hero from '../components/hero'

const IndexPage = () => (
  <Layout>
    <SEO title="Welcome" keywords={[`gatsby`, `application`, `react`]} />

    <Navbar />

    <Hero />
  </Layout>
)

export default IndexPage
