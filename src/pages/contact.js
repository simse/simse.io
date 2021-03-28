import React from "react"

import SEO from "../components/seo"
import Navbar from "../components/navbar"

import * as style from "../styles/pages/contact.module.scss"

const ContactPage = () => (
  <div>
    <SEO />
    
    <Navbar />

    <div className={style.contact}>
      <p>send me an email:</p>

      <h1><a href="mailto:hello@simse.io">hello@simse.io</a></h1>

      <p>send me anything! if I don't reply, you've made me unnaturally uncomfortable.</p>
    </div>
  </div>
)

export default ContactPage