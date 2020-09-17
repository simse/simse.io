import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import SEO from "../components/seo"

import style from "../styles/pages/index.module.scss"

const IndexPage = ({data}) => (
  <div>
    <SEO />
    
    <div className={style.hero}>
      <div className={style.text}>
        <img src={require("../images/logo.svg")} className={style.signature} alt="Simon's signature" />

        <h1 className={style.title}>Hobby Programmer</h1>

        <p>welcome to my artistic experiment of a website</p>

        <p>we got da <Link to={"blog"}>blog</Link>, we got da <Link to={"contact"}>contact</Link></p>
      </div>

      <div className={style.image}>
        <Img fluid={data.file.childImageSharp.fluid} alt="Picture of Simon" />
      </div>
    </div>

    <div className={style.languages}>
      <div className={style.title}>
        <h2>Languages I write and love</h2>
        <small>Except you Javascript, I just know that one</small>
      </div>

      <div className={style.list}>
        <h1>Go</h1>

        <h1>Python</h1>

        <h1>Javascript</h1>
      </div>
    </div>
  </div>
)

export default IndexPage

export const query = graphql`
  query {
    file(relativePath: { eq: "simse.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`