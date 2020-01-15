import { StaticQuery, graphql } from "gatsby"
import React from "react"

import ProjectCard from "./project-card.js"
import '../styles/projects.scss'

class Projects extends React.Component {
    projects = []

    constructor(props) {
        super(props)
        this.projects = props.projects;
    }

    render() {
        return (
            <section className={'projects'}>
                <h2 style={{
                    fontWeight: 400
                }}>Projects</h2>
    
                <div className={'projects-group'}>
                {this.projects.map(project => (
                   <ProjectCard
                        key={project.frontmatter.name}
                        name={project.frontmatter.name}
                        desc={project.frontmatter.desc}
                        website={project.fields.slug}
                        github={project.frontmatter.github}
                        color={project.frontmatter.color}
                        icon={project.frontmatter.icon.childImageSharp.fixed}
                        stat={project.frontmatter.stat} />
                ))}
                </div>
            </section>
        )
    }
}

export default () => (
    <StaticQuery
      query={graphql`
            query {
                allMdx(filter: {fileAbsolutePath: {regex: "/project/"}}) {
                    nodes {
                        fields {
                            slug
                        }
                        frontmatter {
                            color
                            website
                            github
                            icon {
                                childImageSharp {
                                    fixed(width: 110, quality: 100) {
                                    ...GatsbyImageSharpFixed_withWebp
                                    }
                                }
                            }
                            stat
                            name
                            desc
                        }
                    }
                }
            }
      `}
      render={(data) => (
        <Projects projects={data.allMdx.nodes} />
      )}
    />
  )