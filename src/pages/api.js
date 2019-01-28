import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

// Page components
import Navbar from '../components/navbar'
import Hero from '../components/hero'
import Projects from '../components/projects'

const IndexPage = () => (
  <Layout>
    <SEO title="Sime API" keywords={[`gatsby`, `application`, `react`]} />

    <h1 style={{
      color: '#fff',
      textAlign: 'center'
    }}>Welcome to the Simse API suite</h1>
  </Layout>
)

export default IndexPage
