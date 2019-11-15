import Image from "./image.js"
import React from "react"

import '../styles/project-card.scss'
import ExternalUrl from "../assets/external_url.svg"
import Github from "../assets/github.svg"

const ProjectCard = (project) => {

    return (
        <div className={'project-card'}>
            <div className={'project-image'} style={{
                background: project.color
            }}>
                <Image filename={project.icon} />
            </div>

            <div className={'project-inner'}>
                <h2>{ project.name }</h2>

                <span>34k downloads</span>

                <p>{ project.desc }</p>

                <div className={'project-links'}>
                    <a href={project.website} target="_blank" rel="noopener noreferrer"><ExternalUrl /> Website</a>

                    <a href={project.github} target="_blank" rel="noopener noreferrer"><Github /> Github</a>
                </div>
            </div>
        </div>
    )
}


export default ProjectCard
