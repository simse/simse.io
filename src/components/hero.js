import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import React from "react"

import styles from '../styles/components/hero.module.scss'

const Hero = () => {
    const data = useStaticQuery(graphql`
        query {
            placeholderImage: file(relativePath: { eq: "wink.png" }) {
                childImageSharp {
                    fluid(maxWidth: 300) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
        }
    `)

    return (
        <section className={styles.hero}>
            <div className={styles.image}>
                <Img style={{
                    width: 130
                }} fluid={data.placeholderImage.childImageSharp.fluid} />
            </div>

            <h1 className={styles.title}>Hello! I'm Simon, and this is my website.</h1>

            <h2 className={styles.subtitle}>I'm a Computer Science student at the University of Sussex, and a big fan of Python, C++ and JAMstack.</h2>
        </section>
    )
}

export default Hero
