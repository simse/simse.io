import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import React from "react"

import '../styles/about.scss'

const About = () => {
    const data = useStaticQuery(graphql`
        query {
            love: file(relativePath: { eq: "love.png" }) {
                childImageSharp {
                    fluid(maxWidth: 300) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            crossing_fingers: file(relativePath: { eq: "crossing_fingers.png" }) {
                childImageSharp {
                    fluid(maxWidth: 300) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            two_fingers: file(relativePath: { eq: "two_fingers.png" }) {
                childImageSharp {
                    fluid(maxWidth: 300) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `)

    return (
        <section className={'about'}>
            <h2>About me</h2>

            <div className={'row'}>
            <div className={'col'}>
                    <Img style={{
                        width: 130
                    }} fluid={data.love.childImageSharp.fluid} />

                    <h3>Passionate</h3>

                    <p>I absolutely love computer science, and I am very passionate about the subject. I love pushing myself to learn new things everyday, and I hope I get to work with technology to the day I die.</p>
                </div>

                <div className={'col'}>
                    <Img style={{
                        width: 130
                    }} fluid={data.crossing_fingers.childImageSharp.fluid} />

                    <h3>Optimistic</h3>

                    <p>When (IF, haha) I finish my Computer Science degree, I hope to work on interstellar communications technology. Space as a whole has always fascinated me.</p>
                </div>

                <div className={'col'}>
                    <Img style={{
                        width: 130
                    }} fluid={data.two_fingers.childImageSharp.fluid} />

                    <h3>Excited</h3>

                    <p>I'm excited to create new software. If you have an idea be sure to contact me, I may just agree. And yes, I kind of ran out of things to say.</p>
                </div>
            </div>
        </section>
    )
}

export default About
