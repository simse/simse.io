import React from "react"
import { Link } from "gatsby"
//import { graphql } from "gatsby"
//import Img from "gatsby-image"

import SEO from "../components/seo"

import style from "../styles/pages/contact.module.scss"

const ContactPage = () => (
  <div>
    <SEO />
    
    <Link to={"/"}>
      <img src={require("../images/logo.svg")} className={style.logo} alt="Simon's signature" />
    </Link>

    <div className={style.contact}>
      <p>send me an email:</p>

      <h1><a href="mailto:hello@simse.io">hello@simse.io</a></h1>

      <p>spam is certainly welcome</p>
    </div>
  </div>
)

export default ContactPage