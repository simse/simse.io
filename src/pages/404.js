import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import '../styles/404.scss'

const NotFoundPage = ({ data }) => (
    <div className={"fourohfour"}>
        <Layout>
            <SEO title="404: Not found" />

            <div className={"fourohfour-inner"}>
                <Img fixed={data.file.childImageSharp.fixed} />

                <h1>This page doesn't exist!</h1>
                <h2>If you typed in the URL yourself, please double-check it's right. If you clicked your way here, then I'm very sorry :(</h2>
            </div>
        </Layout>
    </div>
)

export default NotFoundPage

export const query = graphql`
  query {
    file(relativePath: { eq: "crying_memoji.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 150, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`