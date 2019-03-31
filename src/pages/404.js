import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Footer from '../components/footer'

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Yikes." />

    <div style={{
      textAlign: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{
        fontSize: '5rem',
        fontWeight: '300'
      }}>404</h1>

      <p style={{
        textTranform: 'uppercase',
        fontSize: '1.3rem'
      }}>Yikes, that page doesn't exist.</p>
    </div>

    <Footer />
  </Layout>
)

export default NotFoundPage
