import { useStaticQuery, graphql, Link } from "gatsby"
import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/podcast-page.scss"

const Podcasts = () => {
    const data = useStaticQuery(graphql`
        query {
            allDataYaml(filter: {podcasts: {elemMatch: {id: {regex: ""}}}}) {
                nodes {
                    podcasts {
                        path
                        id
                        name
                    }
                }
            }
        }
    `).allDataYaml.nodes[0].podcasts

    return (
        <Layout>
            <SEO title="Podcasts" />

            <section className={'podcast-page'}>
                <h1>Podcasts</h1>

                <div className={"podcasts"}>
                    {data.map((podcast) => (
                        <div>
                            <h2>{podcast.name}</h2>
                            <Link to={podcast.path}>Navigate</Link>
                        </div>
                    ))}
                </div>
            </section>
        </Layout>
    )
}

export default Podcasts
