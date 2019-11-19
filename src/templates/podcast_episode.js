import React from "react"
import { graphql, Link } from "gatsby"
import { Location } from '@reach/router'

import Image from '../components/image'
import Layout from '../components/layout'
import SEO from '../components/seo'
import ArrowLeft from "../assets/arrow_left.svg"
import styles from '../styles/pages/podcast-episode.module.scss'

export default function Template({
    data,
    pageContext
}) {
    const { episode } = data
    const { frontmatter } = episode

    const { podcast_data } = data
    let name, podcasters;

    podcast_data.nodes[0].podcasts.forEach((podcast) => {
        if(podcast.id === pageContext.podcast) {
            name = podcast.name
            podcasters = podcast.podcasters
        }
    })
    const title = name + ' - ' + frontmatter.name

    return (
        <Layout>
            <SEO title={title} />

            <div className={styles.episode}>
                <Location>
                    {({ location }) => {
                        const path = location.pathname.replace(location.pathname.replace(/\/$/, '').split('/').pop(), '')
                        return (
                            <span className={styles.back}>
                                <Link to={path}><ArrowLeft /> Go back</Link>
                            </span>
                        )
                    }}
                </Location>

                <h1 className={styles.title}>{frontmatter.name}</h1>
                <h2 className={styles.podcastName}>{name}</h2>

                <div className={styles.player}>
                    <audio
                        controls
                        src={frontmatter.audio}>
                        Your browser does not support the
                        <code>audio</code> element.
                </audio>
                </div>

                <h2 className={styles.podcastersTitle}>Podcasters</h2>
                <div className={styles.podcasters}>
                    {podcasters.map((podcaster) => (
                        <div className={styles.podcaster} key={podcaster.name}>
                            <div className={styles.podcasterImage} style={{
                                background: podcaster.color
                            }}>
                                <Image filename={podcaster.avatar} width={90} />
                            </div>

                            <h3>{podcaster.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export const pageQuery = graphql`
  query($path: String!, $podcast: String!) {
    episode: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        name
        audio
      }
    }
    podcast_data: allDataYaml(filter: {podcasts: {elemMatch: {id: {eq: $podcast}}}}) {
        nodes {
            podcasts {
                id
                name
                podcasters {
                    name
                    avatar
                    color
                }
            }
        }
    }
  }
`