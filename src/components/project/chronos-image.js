import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const ChronosImage = () => {
    const data = useStaticQuery(graphql`
        query {
            placeholderImage: file(relativePath: { eq: "frame_chrome_mac_light.png" }) {
                childImageSharp {
                    fluid(maxWidth: 1200) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
        }
    `)

    return (
        <Img style={{
            maxWidth: 1200,
            margin: '0 auto 100px auto'
        }} fluid={data.placeholderImage.childImageSharp.fluid} />
    )
}

export default ChronosImage
