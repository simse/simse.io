import React from 'react'

const BlogCard = ({ title, excerpt, date, category }) => (
  <div style={{

  }}>

    <p style={{
      margin: '0 0 10px 0',
      textTransform: 'uppercase',
      opacity: .5,
      letterSpacing: '.2rem'
    }}>{ category } &mdash; { date }</p>

    <h2 style={{
      marginBottom: 10
    }}>{ title }</h2>

    <p style={{
      fontFamily: 'Spectral',
      opacity: .7
    }}>{ excerpt }</p>
  </div>
)

export default BlogCard
