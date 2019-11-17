import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import '../styles/podcast.scss'

export default function Template({
    data, // this prop will be injected by the GraphQL query below.
}) {
    const { podcast } = data // data.markdownRemark holds your post data
    const { name, desc, podcasters } = podcast.nodes[0].podcasts[0]
    const episodes = data.episodes.nodes

    return (
        <Layout>
            <SEO title={name} />
            <div className="podcast">
                <h1 className="podcast-title">{name}</h1>
                <h2 className="podcast-subtitle">{desc}</h2>

                <h3 className="section-title">Podcasters</h3>
                <div className="podcast-podcasters">
                    {podcasters.map((podcaster) => (
                        <div className="podcaster" key={podcaster.name}>
                            <div className="podcaster-image" style={{
                                background: podcaster.color
                            }}>
                                <Image filename={podcaster.avatar} />
                            </div>

                            <h3>{podcaster.name}</h3>
                        </div>
                    ))}
                </div>

                <h3 className="section-title">Episodes</h3>
                <div className="podcast-episodes">
                    {episodes.map((episode) => (
                        <div className="podcast-episode-card" key={episode.frontmatter.id}>
                            <Link to={episode.frontmatter.path}>
                                <Img fluid={episode.frontmatter.image.childImageSharp.fluid} />

                                <div className="podcast-episode-meta">
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
            avatar
            name
            color
          }
        }
      }
    }
    episodes: allMarkdownRemark(filter: {frontmatter: {podcast: {eq: $id}}}) {
        nodes {
            frontmatter {
                path
                name
                id
                duration
                image {
                    childImageSharp {
                        fluid(maxWidth: 400, maxHeight: 200) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }
  }
`