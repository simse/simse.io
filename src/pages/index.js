import React from "react"

import Layout from "../components/layout"
import Hero from "../components/hero"
import Projects from "../components/projects"
import About from "../components/about"
import Blog from "../components/blog"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO />
    <Hero />
    <Projects />
    <About />
    <Blog />
  </Layout>
)

export default IndexPage
