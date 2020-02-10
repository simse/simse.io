import { useStaticQuery, graphql } from "gatsby"
import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ProjectCard from "../components/project-card"
import styles from "../styles/pages/projects.module.scss"


let projectSection = (data, title) => {
    return (
        <section className={styles.projectSection}>
            <h3 className={styles.sectionTitle}>{title}</h3>

            <div className={styles.row}>
            {data.nodes.map((project) => (
                <ProjectCard
                    vertical
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

const Podcasts = () => {
    const data = useStaticQuery(graphql`
    query {
        applications: allMdx(filter: {fileAbsolutePath: {regex: "/project/"}, frontmatter: {category: {eq: "Application"}}}) {
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
        libraries: allMdx(filter: {fileAbsolutePath: {regex: "/project/"}, frontmatter: {category: {eq: "Library"}}}) {
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
    `)

    return (
        <Layout>
            <SEO title="Projects" />

            <h1 className="pageTitle">Projects</h1>
            <h2 className="pageSubtitle">A collection of my projects</h2>

            <div className={styles.projects}>
                {projectSection(data.applications, 'Applications')}

                {projectSection(data.libraries, 'Libraries')}
            </div>
        </Layout>
    )
}

export default Podcasts
