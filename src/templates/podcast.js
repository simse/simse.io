import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from '../components/layout'
import SEO from '../components/seo'
import styles from '../styles/pages/podcast.module.scss'

export default function Template({
    data,
    pageContext // this prop will be injected by the GraphQL query below.
}) {
    const { podcast } = data // data.markdownRemark holds your post data
    let name;
    let desc;
    let podcasters;

    podcast.nodes[0].podcasts.forEach((podcast) => {
        if(podcast.id === pageContext.id) {
            name = podcast.name
            desc = podcast.desc
            podcasters = podcast.podcasters
        }
    })

    const episodes = data.episodes.nodes

    return (
        <Layout>
            <SEO title={name} />
            <div className={styles.podcast}>
                <h1 className={styles.title}>{name}</h1>
                <h2 className={styles.subtitle}>{desc}</h2>

                <h3 className={styles.sectionTitle}>Podcasters</h3>
                <div className={styles.podcasters}>
                    {podcasters.map((podcaster) => (
                        <div className={styles.podcaster} key={podcaster.name}>
                            <div className={styles.podcasterImage} style={{
                                background: podcaster.color
                            }}>
                               <Img fixed={podcaster.avatar.childImageSharp.fixed} />
                            </div>

                            <h3>{podcaster.name}</h3>
                        </div>
                    ))}
                </div>

                <h3 className={styles.sectionTitle}>Episodes</h3>
                <div className={styles.episodes}>
                    {episodes.map((episode) => (
                        <div className={styles.episodeCard} key={episode.frontmatter.id}>
                            <Link to={episode.frontmatter.path}>
                                

                                <div className={styles.episodeMeta}>
                                    <h4>{episode.frontmatter.name}</h4>
                                    <span>{episode.frontmatter.duration}</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export const pageQuery = graphql`
  query($path: String!, $id: String!) {
    podcast: allDataYaml(filter: {podcasts: {elemMatch: {path: {eq: $path}}}}) {
      nodes {
        podcasts {
          id
          name
          desc
          podcasters {
            avatar {
                childImageSharp {
                    fixed(width: 90) {
                      ...GatsbyImageSharpFixed_withWebp
                    }
                }
            }
            name
            color
          }
        }
      }
    }
    episodes: allMarkdownRemark(
        filter: {frontmatter: {podcast: {eq: $id}}},
        sort: {fields: frontmatter___episode, order: DESC}
    ) {
        nodes {
            frontmatter {
                path
                name
                id
                duration
                image {
                    childImageSharp {
                        fluid(maxWidth: 400, maxHeight: 200) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
            }
        }
    }
  }
`