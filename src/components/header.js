import { graphql, StaticQuery } from "gatsby"
import React from "react"
import { Location } from '@reach/router'
import AniLink from "gatsby-plugin-transition-link/AniLink"

import '../styles/header.scss'

class Header extends React.Component {
    toggleNav = () => {
        this.setState({
            navOpened: !this.state.navOpened
        })
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter') {
            this.toggleNav()
        }
    }

    state = { 'navOpened': false }

    render() {
        const navClassName = 'overlay-nav' + (this.state.navOpened ? ' opened' : '')
        const menuClassName = 'menu-icon' + (this.state.navOpened ? ' active' : '')
        const overlayClassName = 'overlay' + (this.state.navOpened ? ' active' : '')
        const logoClassName = this.state.navOpened ? 'static' : ''

        return (
            <header>
                <div className={overlayClassName}></div>

                <div className={'navbar'}>
                    <AniLink paintDrip duration={.5} hex="#3f00de" to="/" className={logoClassName}>
                        <img className="logo" src={require('../images/logo.svg')}  alt="Simon Sorensen website logo"/>
                    </AniLink>

                    <div className={menuClassName} onClick={this.toggleNav} onKeyPress={this.handleKeyPress} role="menu" tabIndex="0">
                        <span></span>
                        <span></span>
                    </div>

                    <div className="filler"></div>
                </div>

                <div className={navClassName}>
                    <ul>
                        <li><AniLink paintDrip duration={.5} hex="#3f00de" to="/">Home</AniLink></li>
                        <li><AniLink paintDrip duration={.5} hex="#3f00de" to="/about">About</AniLink></li>
                        <li><AniLink paintDrip duration={.5} hex="#3f00de" to="/projects">Projects</AniLink></li>
                        <li><AniLink paintDrip duration={.5} hex="#3f00de" to="/blog">Blog</AniLink></li>
                        <li><AniLink paintDrip duration={.5} hex="#3f00de" to="/podcasts">Podcasts</AniLink></li>
                    </ul>

                    <div className="contact">
                        <h2>Contact</h2>

                        <h3>Email</h3>
                        <a href="mailto:hello@simse.io">hello@simse.io</a>
                    </div>
                </div>
            </header>
        )
    }
}

export default () => (
    <StaticQuery
        query={graphql`
        query {
            allDataYaml {
              nodes {
                navigation {
                  title
                  items {
                    name
                    url
                  }
                }
              }
            }
          }
          
      `}
        render={(data) => (
            <Location>
                {({ location }) => (
                    <Header nav={data.allDataYaml.nodes} location={location} />
                )}
            </Location>
        )}
    />
)
