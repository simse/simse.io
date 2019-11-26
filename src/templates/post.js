import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from '../components/layout'
import SEO from '../components/seo'
import BlogPostCard from '../components/blog-post-card'
import styles from '../styles/pages/blog-post.module.scss'

export default function Template({
    data, // this prop will be injected by the GraphQL query below.
}) {
    const { post } = data // data.markdownRemark holds your post data
    const { frontmatter, html } = post
    let thumbnail  = frontmatter.thumbnail.childImageSharp.fluid

    const { postsFromCategory } = data
    const categoryPosts = postsFromCategory.nodes

    const { lastFour } = data
    const lastFourPosts = lastFour.nodes

    return (
        <Layout>
            <SEO title={frontmatter.title} />
            <div className={styles.container}>
                <div>
                    <h1 className={styles.title}>{frontmatter.title}</h1>
                    <h2 className={styles.meta}>{frontmatter.date}</h2>

                    <div className={styles.image}>
                        <Img fluid={thumbnail} />
                    </div>

                    <div
                        className={styles.content}
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </div>
            </div>

            <div className={styles.relatedBlogPosts}>
                <h2>More from <span>{frontmatter.category}</span></h2>

                <div className={styles.inner}>
                {categoryPosts.map((post) => (
                    <BlogPostCard 
                        title={post.frontmatter.title}
                        image={post.frontmatter.thumbnail.childImageSharp.fluid}
                        link={post.frontmatter.path}
                        date={post.frontmatter.date}
                        category={post.frontmatter.category}
                        excerpt={post.excerpt} />
                ))}
                </div>
            </div>

            <div className={styles.relatedBlogPosts}>
                <h2>Latest posts</h2>

                <div className={styles.inner}>
                {lastFourPosts.map((post) => (
                    <BlogPostCard 
                        title={post.frontmatter.title}
                        image={post.frontmatter.thumbnail.childImageSharp.fluid}
                        link={post.frontmatter.path}
                        date={post.frontmatter.date}
                        category={post.frontmatter.category}
                        excerpt={post.excerpt} />
                ))}
                </div>
            </div>
        </Layout>
    )
}

export const pageQuery = graphql`
    query($path: String!, $category: String!) {
        post: markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                path
                title
                category
                thumbnail {
                    childImageSharp {
                        fluid(maxWidth: 1600, quality: 80) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
            }
        }
        postsFromCategory: allMarkdownRemark(
            filter: {frontmatter: {category: {eq: $category}}},
            limit: 4,
            sort: {fields: frontmatter___date}
        ) {
            nodes {
                excerpt
                frontmatter {
                    category
                    path
                    date(formatString: "MMMM DD, YYYY")
                    title
                    thumbnail {
                        childImageSharp {
                            fluid(maxWidth: 450, maxHeight: 250, quality: 80) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
            }
        }
        lastFour: allMarkdownRemark(
            limit: 4,
            sort: {fields: frontmatter___date, order: DESC},
            filter: {fileAbsolutePath: {regex: "\/blog/"}}
        ) {
            nodes {
                excerpt
                frontmatter {
                    category
                    path
                    date(formatString: "MMMM DD, YYYY")
                    title
                    thumbnail {
                        childImageSharp {
                            fluid(maxWidth: 450, maxHeight: 250, quality: 80) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
            }
        }
    }
`