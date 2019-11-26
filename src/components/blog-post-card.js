import {Link} from "gatsby"
import Img from "gatsby-image"
import React from "react"

import '../styles/blog-post-card.scss'

const BlogPostCard = (post) => {

    return (
        <div className={'blog-post-card'}>
            <Link to={post.link}>
                <Img fluid={post.image} />

                <div className={"meta"}>
                    <h2>{post.title}</h2>
                    <span>{post.date} — {post.category}</span>

                    <p>{post.excerpt}</p>
                </div>
            </Link>
        </div>
    )
}


export default BlogPostCard
