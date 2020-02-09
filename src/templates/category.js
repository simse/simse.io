import React from "react"
import { graphql } from "gatsby"

import Layout from '../components/layout'
import SEO from '../components/seo'
import BlogPostCard from '../components/blog-post-card'
import styles from '../styles/pages/blog-category.module.scss'

export default function Template({
    data, // this prop will be injected by the GraphQL query below.
}) {
    

    return (
        <Layout>
            <SEO title={data.allMdx.nodes[0].frontmatter.category} />            

            <h1 className="pageTitle">Blog / {data.allMdx.nodes[0].frontmatter.category}</h1>
            <h2 className="pageSubtitle">All posts from the {data.allMdx.nodes[0].frontmatter.category} category</h2>

            <div className={styles.container}>
                {data.allMdx.nodes.map((post) => (
                    <BlogPostCard 
                        title={post.frontmatter.title}
                        image={post.frontmatter.thumbnail.childImageSharp.fluid}
                        link={post.fields.slug}
                        date={post.frontmatter.date}
                        category={post.frontmatter.category}
                        excerpt={post.excerpt} />
                ))}
            </div>
            
        </Layout>
    )
}

export const pageQuery = graphql`
    query($category: String!) {
        allMdx(
            filter: {frontmatter: {category: {eq: $category}}},
            sort: {fields: frontmatter___date, order: DESC}
        ) {
            nodes {
                excerpt
                fields {
                    slug
                }
                frontmatter {
                    category
                    path
                    date(formatString: "MMMM DD, YYYY")
                    title
                    thumbnail {
                        childImageSharp {
                            fluid(maxWidth: 450, maxHeight: 250, quality: 80, cropFocus: CENTER) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
            }
        }
    }
`