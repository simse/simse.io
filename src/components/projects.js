import React from 'react'

import '../styles/projects.scss'

const Projects = () => (
  <div className="projects">
    <h2>Work</h2>

    <div className="projects-table">
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Description</td>
            <td>Language</td>
            <td>Status</td>
            <td>Links</td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td><code>pymitv</code></td>
            <td className="desc">A small Python module that can control Xiaomi TVs</td>
            <td>Python</td>
            <td><span className="blue">Mantained</span></td>
            <td><a className="btn" target="_blank" rel="noopener noreferrer" href="https://github.com/simse/pymitv">Github</a></td>
          </tr>
          <tr>
            <td>Datahoarder</td>
            <td className="desc">Program that allows anyone to download and keep track of large amounts of data</td>
            <td>Python, Javascript</td>
            <td><span className="yellow">Beta</span></td>
            <td><a className="btn" target="_blank" rel="noopener noreferrer" href="https://github.com/simse/datahoarder">Github</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)

export default Projects
