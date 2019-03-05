import React from "react"
import { graphql } from "gatsby"

import Navbar from '../components/navbar'
import SEO from '../components/seo'

import '../styles/project.scss'

export default ({ data }) => {
  const project = data.markdownRemark
  return (
    <div className="project">
      <SEO title={project.frontmatter.name} description={project.frontmatter.description} />

      <Navbar />

      <img className="project-image" alt={project.description} src={require('../../static/assets/pymitv.svg')} />

      <h1>{ project.frontmatter.name }</h1>
      <h2>{ project.frontmatter.description }</h2>

      <div className="project-content">

        <div className="sidebar">
          <h3>Navigation</h3>
          <div dangerouslySetInnerHTML={{ __html: project.tableOfContents }}></div>
        </div>

        <div className="content" dangerouslySetInnerHTML={{ __html: project.html }} />
      </div>
    </div>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      tableOfContents(
        pathToSlugField: "fields.slug"
        maxDepth: 3
      )
      frontmatter {
        name
        description
        image
      }
    }
  }
`
