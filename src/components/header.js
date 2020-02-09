import { Link, graphql, StaticQuery } from "gatsby"
import React from "react"
import { Location } from '@reach/router'
import titleCase from 'ap-style-title-case'

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
                    <Link to="/" className={logoClassName}>
                        <img className="logo" src={require('../images/logo.svg')}  alt="Simon Sorensen website logo"/>
                    </Link>

                    <div className={menuClassName} onClick={this.toggleNav} onKeyPress={this.handleKeyPress} role="menu" tabIndex="0">
                        <span></span>
                        <span></span>
                    </div>

                    <div className="filler"></div>
                </div>

                <div className={navClassName}>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About me</Link></li>
                        <li><Link to="/projects">Projects</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/podcasts">Podcasts</Link></li>
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
