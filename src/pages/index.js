import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

// Page components
import Hero from '../components/hero'

const IndexPage = () => (
  <Layout>
    <SEO title="Welcome" keywords={[`gatsby`, `application`, `react`]} />

    <Hero />
  </Layout>
)

export default IndexPage
