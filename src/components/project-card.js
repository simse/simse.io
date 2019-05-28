import React from 'react'
import {Link} from 'gatsby'

const ProjectCard = ({ name, description, link, image, language, downloads, status, github_url }) => (
  <div className="project-card">

    <div>
      <img src={require('../../static' + image)} alt={name}/>
    </div>

    <div className="meta">
      <div className="submeta">
        <p>
          {downloads} downloads
          &nbsp;•&nbsp;
          {language}
        </p>
      </div>

      <h3 className="title">{ name }</h3>

      <p className="desc">{ description }</p>
    </div>

    <div className="buttons">
      <Link to={link} className="purple">Project page</Link>

      <a className="pink" href={github_url}>Github</a>
    </div>
  </div>
)

export default ProjectCard
