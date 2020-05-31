import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import React from "react"

import '../styles/about.scss'

const About = () => {
    const data = useStaticQuery(graphql`
        query {
            love: file(relativePath: { eq: "love.png" }) {
                childImageSharp {
                    fluid(maxWidth: 125, quality: 90) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            crossing_fingers: file(relativePath: { eq: "crossing_fingers.png" }) {
                childImageSharp {
                    fluid(maxWidth: 130, quality: 90) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            two_fingers: file(relativePath: { eq: "two_fingers.png" }) {
                childImageSharp {
                    fluid(maxWidth: 130, quality: 90) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
        }
    `)

    return (
        <section className={'about'}>
            <h2>About my software</h2>
            <h3 className={'subtitle'}>Here's some inflated statistics about my open source software</h3>

            <div className={'row'}>
                <div className={'col'}>
                    <h1>200k</h1>
                    <p>total software downloads</p>
                </div>

                <div className={'col'}>
                    <h1>52</h1>
                    <p>total Github stars</p>
                </div>

                <div className={'col'}>
                    <h1>1000s</h1>
                    <p>active users</p>
                </div>
            </div>
        </section>
    )
}

export default About
