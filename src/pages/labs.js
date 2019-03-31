import React from 'react'
import { graphql } from 'gatsby'
import Img from "gatsby-image"

import Layout from '../components/layout'
import SEO from '../components/seo'

// Page components
import Navbar from '../components/navbar'
import Footer from '../components/footer'

const LabsPage = ({ data }) => (
  <Layout>
    <SEO title="Labs" keywords={[`experiments`, `tools`, `labs`]} />

    <Navbar />

    <div className="labs" style={{
      paddingTop: 130
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: 60,
        padding: '50px 0'
      }}>
        <h1 style={{
          fontSize: '5rem',
          fontWeight: '300',
        }}>labs.</h1>
        <p style={{
          maxWidth: 1000,
          margin: '0 auto',
          fontSize: '1.4rem'
        }}>
          Welcome to the labs area! This is a collection of web apps or web
          accessible utilities, that are useful, but doesn't constitute being its
          own project. Source is available on Github as always.
        </p>
      </div>

      <div>
      {data.allSitesYaml.edges.map(({ node }, index) => (
        <div key={index} style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 50
        }}>
          <div style={{
            paddingRight: 50
          }}>
            <h1 style={{
              marginBottom: 10
            }}>{node.name}</h1>
            <a href={node.url} className="btn blue">Visit</a>
            <a href={node.github} className="btn">Github</a>

            <p style={{
              marginTop: 35,
              maxWidth: 500
            }}>{node.desc}</p>
          </div>

          <a href={node.url}>
            <Img
              style={{
                borderRadius: 10,
                minWidth: '600px'
              }}
              fluid={
                node.childScreenshot.screenshotFile.childImageSharp.fluid
              }
              alt={node.name}
            />
          </a>
        </div>
      ))}
      </div>
    </div>

    <Footer />
  </Layout>
)

export default LabsPage

export const query = graphql`
  query SitesQuery {
    allSitesYaml {
      edges {
        node {
          url
          github
          name
          desc
          childScreenshot {
            screenshotFile {
              childImageSharp {
                fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
