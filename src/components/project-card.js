import React from 'react'
import {Link} from 'gatsby'

const ProjectCard = ({ name, description, link, image }) => (
  <Link to={link} style={{
    textDecoration: 'none'
  }}>
    <div className="project-card" style={{
      background: 'rgba(255, 255, 255, 0.07)',
      padding: '50px',
      borderRadius: 8,
      margin: '0 auto',
      maxWidth: '60%',
      display: 'flex',
      color: '#fff',
      alignItems: 'center'
    }}>

      <div>
      <img src={require('../../static' + image)} alt={name} style={{
        margin: '0 30px 0 0',
        maxHeight: 100
      }} />
      </div>

      <div style={{

      }}>
        <h3 style={{
          marginBottom: 10,
          fontSize: '2rem'
        }}>{ name }</h3>

        <p style={{
          margin: '0'
        }}>{ description }</p>
      </div>
    </div>
  </Link>
)

export default ProjectCard
