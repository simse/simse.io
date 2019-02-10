import React from 'react'

const BlogCard = ({ title }) => (
  <div style={{

  }}>

    <img className="hover-image" src={require('../images/test.jpg')} style={{
      borderRadius: 8
    }} />

    <p style={{
      margin: '0 0 10px 0',
      textTransform: 'uppercase',
      opacity: .5,
      letterSpacing: '.2rem'
    }}>Python</p>

    <h2 style={{
      marginBottom: 10
    }}>{ title }</h2>

    <p style={{
      fontFamily: 'Spectral',
      opacity: .7
    }}>Lorem ipsum dolar et sit. Blah blag text here.</p>
  </div>
)

export default BlogCard
