import { useStaticQuery, graphql, Link } from "gatsby"
import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ProjectCard from "../components/project-card"

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
        </Layout>
    )
}

export default Podcasts
