import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";

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
          {this.props.data.latestPosts.nodes.map(post => (
            <Link to={`blog/${post.slug.split("/")[0]}`}>
              <div className={style.post}>
              {post.frontmatter.featuredImage && <GatsbyImage
                image={post.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
                alt="Picture of Simon" />}

                <div className={style.meta}>
                  <span>{post.frontmatter.categories[0]} — {post.frontmatter.publishedAt}</span>
                  <h2>{post.frontmatter.title}</h2>
                </div>
              </div>
            </Link>
          ))}
          </div>
        </div>

        <div className={style.projects}>
          <h1>My projects</h1>

          <div className={style.list}>
            {this.props.data.projects.nodes.map(project => (
              <a href={project.frontmatter.githubUrl} target="_blank" rel="noreferrer" key={project.frontmatter.id}>
                <div className={style.project}>
                  <h2>{ project.frontmatter.name }</h2>

                  <span className={style.maintenenceStatus}>{ project.frontmatter.projectStatus }</span>

                  <p>{ project.frontmatter.description }</p>
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
      latestPosts: allMdx(limit: 4, sort: {fields: frontmatter___publishedAt, order: DESC}, filter: {frontmatter: {stage: {eq: "published"}}, fileAbsolutePath: {regex: "/blog/"}}) {
        nodes {
          slug
          frontmatter {
            title
            publishedAt(formatString: "YYYY, MMM DD")
            categories
            featuredImage {
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
      projects: allMdx(filter: {fileAbsolutePath: {regex: "/projects/"}}) {
        nodes {
          frontmatter {
            name
            id
            githubUrl
            description
            projectStatus
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