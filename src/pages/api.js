import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'


const IndexPage = () => (
  <Layout>
    <SEO title="Simse API" keywords={[`gatsby`, `application`, `react`]} />

    <h1 style={{
      color: '#fff',
      textAlign: 'center'
    }}>Welcome to the Simse API suite</h1>
  </Layout>
)

export default IndexPage
