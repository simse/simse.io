import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hello it's Simon Sorensen here.</h1>

    <p>Will you bear with me while I finish this website?</p>
  </Layout>
)

export default IndexPage
