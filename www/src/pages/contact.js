import React from "react"

import Seo from "../components/seo"
import Navbar from "../components/navbar"

import * as style from "../styles/pages/contact.module.scss"

const ContactPage = () => (
  <div>
    <Seo />
    
    <Navbar />

    <div className={style.contact}>
      <p>send me an email:</p>

      <h1><a href="mailto:hello@simse.io">hello@simse.io</a></h1>

      <p>send me anything! I do my best to reply :)</p>
    </div>
  </div>
)

export default ContactPage