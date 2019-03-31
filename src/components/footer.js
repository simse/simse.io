import React from 'react';
import { Link, graphql, StaticQuery } from 'gatsby';

import '../styles/footer.scss'

const Footer = () => (
  <StaticQuery
    query={graphql`
      query latestBlogPosts {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, filter: {frontmatter: {type: {eq: "blog"}}}, limit: 5) {
          edges {
            node {
              frontmatter {
                title
              }
              fields {
                slug
              }
            }
          }
        }
      }`}

    render={data=>(
      <div className="footer">

        <div class="image">
          <img src={require('../images/simse.jpg')} alt="me" />
        </div>

        <div class="links">

          <div class="link-group">
            <h3>pages.</h3>

            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/labs'>Labs</Link></li>
              <li><Link to='/blog'>Blog</Link></li>
            </ul>
          </div>

          <div class="link-group">
            <h3>projects.</h3>

            <ul>
              <li><Link to='/project/pymitv'>pymitv</Link></li>

            </ul>
          </div>

          <div class="link-group">
            <h3><Link to='/labs'>labs.</Link></h3>

            <ul>
              <li><a href="https://simse.io/labs/ib-grade-calculator/">IB Grade Calculator</a></li>

            </ul>
          </div>

          <div class="link-group">
            <h3><Link to='/blog'>latest blog posts.</Link></h3>

            <ul>
              {data.allMarkdownRemark.edges
                .map(({ node: blog }) => (
                  <li>
                    <Link to={'blog/' + blog.fields.slug}>{blog.frontmatter.title}</Link>
                  </li>
                ))}
            </ul>
          </div>

        </div>
      </div>
    )}
  />
)

export default Footer
