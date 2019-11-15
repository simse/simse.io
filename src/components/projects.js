import { StaticQuery, graphql } from "gatsby"
import React from "react"

import ProjectCard from "./project-card.js"
import '../styles/projects.scss'

class Projects extends React.Component {
    projects = []

    constructor(props) {
        super(props)

        props.projects.forEach((value) => {
            if(value.projects !== null) {
                this.projects = value.projects
            }
        });
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
                        name={project.name}
                        desc={project.desc}
                        website={project.website}
                        github={project.github}
                        color={project.color}
                        icon={project.icon} />
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
                    allDataYaml {
                        nodes {
                            projects {
                                name
                                desc
                                website
                                github
                                color
                                icon
                            }
                        }
                    }
                }
      `}
      render={(data) => (
        <Projects projects={data.allDataYaml.nodes} />
      )}
    />
  )