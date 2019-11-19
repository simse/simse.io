import React from "react"
import { graphql, Link } from "gatsby"
import { Location } from '@reach/router'

import Image from '../components/image'
import Layout from '../components/layout'
import SEO from '../components/seo'
import ArrowLeft from "../assets/arrow_left.svg"
import '../styles/podcast-episode.scss'

export default function Template({
    data,
    pageContext // this prop will be injected by the GraphQL query below.
}) {
    const { episode } = data // data.markdownRemark holds your post data
    const { frontmatter } = episode

    const { podcast_data } = data
    let name;
    let podcasters;

    //console.log(podcast_data)

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

            <div className="podcast-episode">
                <Location>
                    {({ location }) => {
                        const path = location.pathname.replace(location.pathname.replace(/\/$/, '').split('/').pop(), '')
                        return (
                            <span className="go-back">
                                <Link to={path}><ArrowLeft /> Go back</Link>
                            </span>
                        )
                    }}
                </Location>

                <h1 className="podcast-episode-title">{frontmatter.name}</h1>
                <h2 className="podcast-name">{name}</h2>

                <div className="podcast-player">
                    <audio
                        controls
                        src={frontmatter.audio}>
                        Your browser does not support the
                        <code>audio</code> element.
                </audio>
                </div>

                <h2 className="podcasters-title">Podcasters</h2>
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