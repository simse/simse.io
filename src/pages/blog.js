import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"

import BlogPostCard from "../components/blog-post-card"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "../styles/pages/blog.module.scss"


function categoryLink(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes
    return "/blog/category/" + str;
}

const Blog = () => {
    const data = useStaticQuery(graphql`
        query {
            posts: allMdx(
                filter: {fileAbsolutePath: {regex: "\/blog/"}},
                sort: {fields: frontmatter___date, order: DESC}
            ) {
            nodes  {
                excerpt(pruneLength: 200)
                fields {
                    slug
                }
                frontmatter {
                  title
                  category
                  date(formatString: "DD MMMM YYYY")
                  path
                  thumbnail {
                    childImageSharp {
                        fluid(maxWidth: 400, maxHeight: 250, cropFocus: CENTER, quality: 100) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                  }
                }
            }
            }
            categories: allMdx(
                filter: {fileAbsolutePath: {regex: "\/blog/"}}
            ) {
                nodes{
                    frontmatter {
                        category
                    }
                }
            }
        }
    `)

    let categories = [];

    data.categories.nodes.forEach(category => {
        let categoryName = category.frontmatter.category;

        if (!categories.includes(categoryName)) {
            categories.push(categoryName);
        }
    });

    return (
        <Layout>
            <SEO title="Blog" />

            <section className={styles.page}>
                <h1 className="pageTitle">Blog</h1>
                <h2 className="pageSubtitle">Ramblings of a crazy person</h2>

                <div className={styles.categoryBar}>
                    {categories.map(category => (
                        <AniLink
                            className={styles.categoryButton}
                            key={category}
                            to={categoryLink(category)}
                            paintDrip
                            duration={.4}
                            hex="#3f00de"
                        >{category}</AniLink>
                    ))}

                </div>

                <div className={styles.posts}>
                    {data.posts.nodes.map((post) => (
                        <BlogPostCard
                            key={post.fields.slug}
                            title={post.frontmatter.title}
                            category={post.frontmatter.category}
                            excerpt={post.excerpt}
                            link={post.fields.slug}
                            image={post.frontmatter.thumbnail.childImageSharp.fluid}
                            date={post.frontmatter.date} />
                    ))}
                </div>
            </section>
        </Layout>
    )
}

export default Blog
