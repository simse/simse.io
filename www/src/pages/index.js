import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";

import SEO from "../components/seo"
import Gradient from "../utils/gradient"
import Navbar from "../components/navbar"
import Footer from "../components/footer"

import * as style from "../styles/pages/index.module.scss"

class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.heroCircles = [
      {
        id: "one",
        ref: React.createRef(),
        gradient: new Gradient(),
      },
      {
        id: "two",
        ref: React.createRef(),
        gradient: new Gradient(),
      },
      {
        id: "three",
        ref: React.createRef(),
        gradient: new Gradient(),
      }
    ]

    //this.background = React.createRef();  
  }

  componentDidMount() {
    //gradient.initGradient(this.background, style.shown);

    /*this.heroCircles.forEach((circle, index) => {
      
      setTimeout(() => {
        circle.gradient.initGradient(circle.ref, style.shown)
      }, (index+1) * 400)
    })*/
  }

  render() {
    return (
      <div style={{
        maxWidth: "100vw",
        overflowX: "hidden"
      }}>
        <SEO />

        <Navbar />
        
        <div className={style.hero}>
          {/* <div className={style.circles}>
            {this.heroCircles.map(circle => (
              <canvas 
                className={`${style.background}`} 
                ref={circle.ref} 
                key={circle.id}></canvas>
            ))}
          </div> */}
    
          <div className={style.text}>   
            <h1 className={style.title}>Hello! My name is Simon</h1>
    
            <p>and I am a creative programmer.</p>
          </div>
    
          <div className={style.image}>
            <GatsbyImage
              image={this.props.data.file.childImageSharp.gatsbyImageData}
              alt="Picture of Simon" />
          </div>
        </div>

        <div className={style.blog}>
          <h1>Latest blog posts</h1>

          <div className={style.list}>
          {this.props.data.allGhostPost.nodes.map(post => (
            <Link to={`blog/${post.slug}`}>
              <div className={style.post}>
              {post.localFeatureImage && <GatsbyImage
                image={post.localFeatureImage.childImageSharp.gatsbyImageData}
                alt="Picture of Simon" />}

                <div className={style.meta}>
                  <span>{post.tags[0].name} — {post.published_at}</span>
                  <h2>{post.title}</h2>
                </div>
              </div>
            </Link>
          ))}
          </div>
        </div>

        <div className={style.projects}>
          <h1>My projects</h1>

          <div className={style.list}>
            {this.props.data.allProjectsYaml.nodes.map(project => (
              <a href={project.website} target="_blank" rel="noreferrer">
                <div className={style.project}>
                  <h2>{ project.name }</h2>

                  <p>{ project.description }</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

const Index = () => (
  <StaticQuery 
    query={graphql`{
      file(relativePath: {eq: "simse.jpg"}) {
        childImageSharp {
          gatsbyImageData(width: 800, layout: CONSTRAINED, placeholder: BLURRED, quality: 100)
        }
      }
      allProjectsYaml {
        nodes {
          id
          name
          github
          maintained
          website
          description
        }
      }
      allGhostPost(limit: 4, sort: {fields: published_at, order: DESC}) {
        nodes {
          title
          slug
          excerpt
          published_at(formatString: "MMMM DD, YYYY")
          tags {
            name
          }
          localFeatureImage {
            childImageSharp {
              gatsbyImageData(
                height: 427
                width: 640
                layout: CONSTRAINED
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
                transformOptions: {cropFocus: CENTER}
                quality: 80
              )
            }
          }
        }
      }
    }
`}
  render={(data) => (
    <IndexPage data={data} />
  )} />
)

export default Index