import { useStaticQuery, graphql, Link } from "gatsby"
import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "../styles/pages/podcasts.module.scss"

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
    `).podcasts.nodes[1].podcasts

    //console.log(data)

    return (
        <Layout>
            <SEO title="Podcasts" />

            <section className={styles.container}>
                <h1 className="pageTitle">Podcasts</h1>
                <h2 className="pageSubtitle">Sorry about this page, it ain't completely done</h2>

                <div className={styles.podcasts}>
                    {data.map((podcast) => (
                        <div className={styles.podcast} key={podcast.id}>
                            <Link to={podcast.path}>
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
