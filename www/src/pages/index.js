import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";

import SEO from "../components/seo"
import Gradient from "../utils/gradient"
import Navbar from "../components/navbar"
import Footer from "../components/footer"

import * as style from "../styles/pages/index.module.scss"

class IndexPage extends React.Component {
  render() {
    return (
      <div style={{
        maxWidth: "100vw",
        overflowX: "hidden"
      }}>
        <SEO />

        <Navbar />
        
        <div className={style.hero}>
    
          <div className={style.text}>   
            <h1 className={style.title}>Hello! My name is Simon</h1>
    
            <p>and I am a Computer Science student in London</p>
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
          {this.props.data.allWpPost.nodes.map(post => (
            <Link to={`blog/${post.slug}`}>
              <div className={style.post}>
              {post.featuredImage && <GatsbyImage
                image={post.featuredImage.node.localFile.childrenImageSharp[0].gatsbyImageData}
                alt="Picture of Simon" />}

                <div className={style.meta}>
                  <span>{post.categories.nodes[0].name} — {post.date}</span>
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

      allWpPost(limit: 4, sort: {fields: date, order: DESC})  {
        nodes {
          title
          slug
          excerpt
          date(formatString: "MMMM DD, YYYY")
          featuredImage {
            node {
              localFile {
                childrenImageSharp {
                  gatsbyImageData(
                    height: 427
                    width: 640
                    layout: CONSTRAINED
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                    transformOptions: {cropFocus: CENTER}
                    quality: 90
                  )
                }
              }
            }
          }
          categories {
            nodes {
              name
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