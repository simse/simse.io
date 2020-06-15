import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"
import React, { Component } from "react"

import styles from '../styles/components/hero.module.scss'

class Hero extends Component {

    titles = {
        DK: "Hej! Jeg hedder Simon, velkommen til min hjemmeside.",
        ELSE: "Hello! I'm Simon, and this is my website."
    };

    subtitles = {
        DK: "Jeg læser datalogi i Holland, elsker Python og JAMstack, og leder udviklingen af Chronos.",
        ELSE: "I'm a Computer Science student, a big fan of Python, and JAMstack, and the lead (and only) developer of Chronos."
    }

    constructor() {
        super();
        this.state = {
            heroTitle: this.titles.ELSE,
            heroSubTitle: this.subtitles.ELSE
        };
    }

    componentDidMount() {    
        fetch('https://json.geoiplookup.io')
        .then(res => res.json())
        .then(json => {
            const userCountry = json.country_code;
            if (userCountry in this.titles) {
                this.setState(
                    {
                        heroTitle: this.titles[userCountry],
                        heroSubTitle: this.subtitles[userCountry]
                    }
                )
            }
        })
    }
    
    render() {
        return (
            <StaticQuery
                query={graphql`
                query {
                    placeholderImage: file(relativePath: { eq: "wink.png" }) {
                        childImageSharp {
                            fluid(maxWidth: 300) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
            `}
            render={data => (
                <section className={styles.hero}>
                    <div className={styles.image}>
                        <Img style={{
                            width: 130
                        }} fluid={data.placeholderImage.childImageSharp.fluid} />
                    </div>
        
                    <h1 className={styles.title}>{this.state.heroTitle}</h1>
        
                    <h2 className={styles.subtitle}>{this.state.heroSubTitle}</h2>
                </section>
            )} />
        )
    }
}

export default Hero