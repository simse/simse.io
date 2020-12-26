import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import SEO from "../components/seo"
import Gradient from "../utils/gradient"
import Navbar from "../components/navbar"
/*
import BlogIcon from "../icons/blog.svg"
// import AIIcon from "../icons/ai.svg"
import EmailIcon from "../icons/email.svg"
*/
import style from "../styles/pages/index.module.scss"

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.background = React.createRef();  
  }

  componentDidMount() {
    let gradient = new Gradient();
    gradient.initGradient(this.background, style.shown);
  }

  render() {
    return (
      <div>
        <SEO />

        <Navbar />
        
        <div className={style.hero}>
          <canvas className={style.background} ref={this.background}></canvas>
    
          <div className={style.text}>   
            <h1 className={style.title}>Hello! My name is Simon</h1>
    
            <p>and I am a creative programmer.</p>
          </div>
    
          <div className={style.image}>
            <Img fluid={this.props.data.file.childImageSharp.fluid} alt="Picture of Simon" />
          </div>
        </div>
      </div>
    )
  }
}

export default () => (
  <StaticQuery 
    query={graphql`
    query {
      file(relativePath: { eq: "simse.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `}
  render={(data) => (
    <IndexPage data={data} />
  )} />
)