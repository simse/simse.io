import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "../styles/pages/contact.module.scss"

const ContactPage = ({data}) => (
    <Layout>
        <SEO title="Contact" />

        <section className={styles.wrapper}>

            <div className={styles.image}>
                <Img fluid={data.file.childImageSharp.fluid} />
            </div>

            <div className={styles.info}>
                <h1>Contact info</h1>

                <div className={styles.group}>
                    <span>email</span>
                    <br />
                    <a href="mailto:hello@simse.io" target="_blank" rel="noopener noreferrer">hello@simse.io</a>
                </div>

                <div className={styles.group}>
                    <span>discord</span>
                    <br />
                    <a href="https://discordapp.com" target="_blank" rel="noopener noreferrer">simse#7584</a>
                </div>
            </div>

        </section>
    </Layout>
)

export default ContactPage

export const query = graphql`
  query {
    file(relativePath: { eq: "simse.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 600, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`