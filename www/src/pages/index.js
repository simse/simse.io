import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import { overrideDate } from "../utils/date";

import Seo from "../components/seo"
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
        <Seo description="My name is Simon and I love writing software. Welcome to my slice of the internet." />

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
          {this.props.data.allGraphCmsBlogPost.nodes.map(post => (
            <Link to={`blog/${post.slug}`}>
              <div className={style.post}>
              {post.featuredImage && <GatsbyImage
                image={post.featuredImage.localFile.childImageSharp.gatsbyImageData}
                alt="Picture of Simon" />}

                <div className={style.meta}>
                  <span>{post.category.name} — {overrideDate(post.publishedAt, post.overridePublishDate)}</span>
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
            {this.props.data.allGraphCmsProject.nodes.map(project => (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" key={project.id}>
                <div className={style.project}>
                  <h2>{ project.name }</h2>

                  <span className={style.maintenenceStatus}>{ project.projectStatus.replaceAll("_", " ") }</span>

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
          gatsbyImageData(width: 800, layout: CONSTRAINED, placeholder: BLURRED, quality: 80)
        }
      }
      allGraphCmsBlogPost(sort: {fields: publishedAt, order: DESC}, limit: 4) {
        nodes {
          title
          slug
          publishedAt
          overridePublishDate
          category {
            name
          }
          featuredImage {
            localFile {
              childImageSharp {
                gatsbyImageData(
                    height: 427
                    width: 640
                    layout: CONSTRAINED
                    placeholder: BLURRED
                    quality: 90
                )
              }
            }
          }
        }
      }
      allGraphCmsProject {
        nodes {
          id
          githubUrl
          description
          name
          projectStatus
        }
      }
    }
`}
  render={(data) => (
    <IndexPage data={data} />
  )} />
)

export default Index