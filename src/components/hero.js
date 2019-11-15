import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import React from "react"

import '../styles/hero.scss'

const Hero = () => {
    const data = useStaticQuery(graphql`
        query {
            placeholderImage: file(relativePath: { eq: "wink.png" }) {
                childImageSharp {
                    fluid(maxWidth: 300) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `)

    return (
        <section className={'hero'}>
            <div className={'hero-image'}>
                <Img style={{
                    width: 130
                }} fluid={data.placeholderImage.childImageSharp.fluid} />
            </div>

            <h1>Hello! I'm Simon, and this is my website.</h1>

            <h2>I'm a Computer Science student at the University of Sussex, and a big fan of Python, C and Vue.js.</h2>
        </section>
    )
}

export default Hero
