import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import { Row, Col } from 'react-grid-system';

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
                downloads
              }
            }
          }
        }
      }
    `}
    render={data => (
      <div className="projects">
        <h2 className="title">projects.</h2>

        <Row className="projects-wrapper">
        {data.allMarkdownRemark.edges
          .map(({ node: project }) => (
            <Col sm={12} md={6} lg={4}>
            <ProjectCard
              name={project.frontmatter.name}
              description={project.frontmatter.description}
              image={project.frontmatter.image}
              link={project.fields.slug}
              language={project.frontmatter.language}
              downloads={project.frontmatter.downloads} />
            </Col>
          ))}
        </Row>
      </div>
    )}
  />
)

export default Projects
