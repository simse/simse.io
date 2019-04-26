import React from 'react'
import { Link } from 'gatsby'

const ProjectCard = ({ name, description, link, image, language, downloads }) => (
  <Link to={link} style={{
    textDecoration: 'none'
  }}>
    <div className="project-card" style={{
      background: 'rgba(255, 255, 255, 0.07)',
      borderRadius: 8,
      display: 'flex',
      flexDirection: 'column',
      color: '#fff',
      alignItems: 'center'
    }}>

      <div>
        <img src={require('../../static' + image)} alt={name}/>
      </div>

      <div>
        <h3 style={{
          marginBottom: 10,
          fontSize: '2rem',
          fontWeight: '400'
        }}>{ name }</h3>

        <div>
          <p>
            <strong>{downloads} downloads</strong>
            &nbsp;&nbsp;•&nbsp;&nbsp;
            <span class="tag">{ language }</span>
          </p>
        </div>

        <p style={{
          margin: '0'
        }}>{ description }</p>
      </div>
    </div>
  </Link>
)

export default ProjectCard
