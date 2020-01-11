import axios from "axios"
import React from "react"
import Image from "gatsby-image"

import '../styles/project-card.scss'
import ExternalUrl from "../assets/external_url.svg"
import Github from "../assets/github.svg"

class ProjectCard extends React.Component {
    state = { downloads: 0 }
    stat = null

    kFormatter(num) {
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
    }

    constructor(props) {
        super(props)

        this.stat = props.stat
    }

    componentDidMount() {
        axios.get('/.netlify/functions/project-stats?' + this.stat).then((response) => {
            this.setState({downloads: this.kFormatter(response.data.downloads)})
        })
    }

    render() {
        const { name, color, desc, website, github } = this.props;
        const icon = this.props.icon;

        return (
            <div className={'project-card'}>
                <div className={'project-image'} style={{
                    background: color
                }}>
                    <Image fixed={icon} />
                </div>
    
                <div className={'project-inner'}>
                    <h2>{ name }</h2>
    
                    <span>{ this.state.downloads } downloads</span>
    
                    <p>{ desc }</p>
    
                    <div className={'project-links'}>
                        <a href={website} target="_blank" rel="noopener noreferrer"><ExternalUrl /> Website</a>
    
                        <a href={github} target="_blank" rel="noopener noreferrer"><Github /> Github</a>
                    </div>
                </div>
            </div>
        )
    }
}


export default ProjectCard
