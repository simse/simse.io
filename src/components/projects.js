import React from 'react'
import { StaticQuery, graphql } from "gatsby"

import ProjectCard from './project-card'
import '../styles/projects.scss'

const Projects = () => (
  <StaticQuery
    query={graphql`
      query Projects {
        allMarkdownRemark(filter: {frontmatter: {type: {eq: "project"}}}) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                name
                description
                language
                status
                image
              }
            }
          }
        }
      }
    `}
    render={data => (
      <div className="projects">
        <h2>Work</h2>

        {data.allMarkdownRemark.edges
          .map(({ node: project }) => (
            <ProjectCard
              name={project.frontmatter.name}
              description={project.frontmatter.description}
              image={project.frontmatter.image}
              link={project.fields.slug} />
          ))}
      </div>
    )}
  />
)

export default Projects
