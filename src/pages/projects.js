import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "../styles/pages/projects.module.scss"

const Podcasts = () => {
    const data = useStaticQuery(graphql`
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
                            fixed(width: 80, quality: 100) {
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
            {data.allMdx.nodes.map((project) => (
                <Link to={project.fields.slug}>
                    <div className={styles.project}>
                        <Img fixed={project.frontmatter.icon.childImageSharp.fixed} />
                        <h1>{project.frontmatter.name}</h1>
                        <p>{project.frontmatter.desc}</p>
                    </div>
                </Link>
            ))}
            </div>
        </Layout>
    )
}

export default Podcasts
