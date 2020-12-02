import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import Img from "gatsby-image"

import SEO from "../components/seo"
import Gradient from "../utils/gradient"
import Navbar from "../components/navbar"

import BlogIcon from "../icons/blog.svg"
import AIIcon from "../icons/ai.svg"
import EmailIcon from "../icons/email.svg"

import style from "../styles/pages/index.module.scss"

let gradient = new Gradient();

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.background = React.createRef();
  }

  componentDidMount() {
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
            <h1 className={style.title}>That's me right here on the picture</h1>
    
            <p>and my name is Simon, and below are some handy links for you!</p>
    
            <div className={style.links}>
              <Link to={"/blog"}><BlogIcon /> my blog</Link>

              <br />

              <Link to={"/chat"}><AIIcon /> chat with an AI version of <strong>me</strong></Link>

              <br />

              <Link to={"/contact"}><EmailIcon /> send me a holler</Link>
            </div>
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