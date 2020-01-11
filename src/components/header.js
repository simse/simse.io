import { Link, graphql, StaticQuery } from "gatsby"
import React from "react"
import { Location } from '@reach/router'
import titleCase from 'ap-style-title-case'

import '../styles/header.scss'

class Header extends React.Component {
    stylizeLocation = (location) => {
        if (location === '/') return ''

        let subpage = location.split('/')[1]
        let stylizedLocation = ''

        // Check website area is the blog
        if (subpage === 'blog') {
            // Add space around slashes
            stylizedLocation = location.replace(/\//g, " / ")
            // Replaces dashes with spaces
            stylizedLocation = stylizedLocation.replace(/-/g, " ")

            // Capitalize the word 'blog'
            stylizedLocation = stylizedLocation.replace("blog", "Blog")

            // AP capitalize only the blog title
            stylizedLocation = stylizedLocation.replace(
                stylizedLocation.split(' / ')[2],
                titleCase(stylizedLocation.split(' / ')[2])
            )
        }

        if (subpage === 'podcasts') {
            stylizedLocation = ' / Podcasts'
        }

        // Check website area is podcast
        if (subpage === 'podcast') {
            // Add space around slashes
            stylizedLocation = location.replace(/\//g, " / ")
            // Replaces dashes with spaces
            stylizedLocation = stylizedLocation.replace(/-/g, " ")

            // Capitalize the word 'podcast'
            stylizedLocation = stylizedLocation.replace("podcast", "Podcast")

            // AP capitalize podcast and episode title
            stylizedLocation = stylizedLocation.replace(
                stylizedLocation.split(' / ')[2],
                titleCase(stylizedLocation.split(' / ')[2])
            )

            stylizedLocation = stylizedLocation.replace(
                stylizedLocation.split(' / ')[3],
                titleCase(stylizedLocation.split(' / ')[3])
            )
        }

        // Check website area is about
        if (subpage === 'about') {
            // Add space around slashes
            stylizedLocation = location.replace(/\//g, " / ")

            stylizedLocation = stylizedLocation.replace("about", "About")
        }

        // Remove last space
        stylizedLocation = stylizedLocation.trimRight()

        // Remove ending slash if present
        stylizedLocation = stylizedLocation.replace(/\/$/, '');

        return stylizedLocation
    }

    toggleNav = () => {
        this.setState({
            navOpened: !this.state.navOpened
        })
    }

    navItem = (url, name) => {
        if (url.indexOf('://') > 0 || url.indexOf('//') === 0) {
            return (<li key={name}><a href={url}>{name}</a></li>)
        } else {
            return (<li key={name}><Link to={url}>{name}</Link></li>)
        }
    }

    state = { 'navOpened': false }
    location = this.stylizeLocation(this.props.location.pathname)

    nav = []

    constructor(props) {
        super(props)

        props.nav.forEach((value) => {
            if (value.navigation !== null) {
                this.nav = value.navigation
            }
        });
    }

    render() {
        const navClassName = 'overlay-nav' + (this.state.navOpened ? ' opened' : '')
        const menuClassName = 'menu-icon' + (this.state.navOpened ? ' active' : '')

        return (
            <header>
                <div className={'navbar'}>
                    <Link to="/" >
                        <img className="logo" src={require('../images/logo.svg')} />
                    </Link>

                    <div className={menuClassName} onClick={this.toggleNav}>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div className={navClassName}>
                    {this.nav.map(group => (
                        <div className={'nav-group'} key={group.title}>
                            <h2>{group.title}</h2>

                            <ul>
                                {group.items.map(item => (
                                    this.navItem(item.url, item.name)
                                ))}
                            </ul>
                        </div>
                    ))}
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
