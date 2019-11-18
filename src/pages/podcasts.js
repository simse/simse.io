import { useStaticQuery, graphql, Link } from "gatsby"
import React from "react"

import Layout from "../components/layout"
import ImagePodcast from "../components/image-podcast.js"
import SEO from "../components/seo"
import "../styles/podcast-page.scss"

const Podcasts = () => {
    const data = useStaticQuery(graphql`
        query {
            podcasts: allDataYaml(filter: {podcasts: {elemMatch: {id: {regex: ""}}}}) {
                nodes {
                    podcasts {
                        path
                        id
                        name
                    }
                }
            }
        }
    `).podcasts.nodes[0].podcasts

    return (
        <Layout>
            <SEO title="Podcasts" />

            <section className={'podcast-page'}>
                <h1>Podcasts</h1>
                <p className="subtitle">Sorry about this page, it ain't completely done</p>

                <div className={"podcasts"}>
                    {data.map((podcast) => (
                        <div className="p">
                            <Link to={podcast.path}>
                                <ImagePodcast filename="compsci.jpg" />

                                <span>
                                    <h2>{podcast.name}</h2>
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </Layout>
    )
}

export default Podcasts
