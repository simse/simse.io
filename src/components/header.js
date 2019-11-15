import { Link, graphql, StaticQuery } from "gatsby"
import React from "react"
import { Location } from '@reach/router'
import titleCase from 'ap-style-title-case'

import '../styles/header.scss'

class Header extends React.Component {
    stylizeLocation = (location) => {
        if(location === '/') return ''

        let subpage = location.split('/')[1]
        let stylizedLocation = ''

        // Check website area is the blog
        if(subpage === 'blog') {
            // Add space around slashes
            stylizedLocation = location.replace(/\//g, " / ")
            // Replaces dashes with spaces
            stylizedLocation = stylizedLocation.replace(/-/g, " ")

            // AP capitalize only the blog title
            stylizedLocation = stylizedLocation.replace(
                stylizedLocation.split(' / ')[2],
                titleCase(stylizedLocation.split(' / ')[2])
            )
        }

        
        

        return stylizedLocation
    }

    toggleNav = () => {
        this.setState({
            navOpened: !this.state.navOpened
        })
    }

    navItem = (url, name) => {
        if (url.indexOf('://') > 0 || url.indexOf('//') === 0) {
            return (<li><a href={url}>{name}</a></li>)
        } else {
            return (<li><Link to={url}>{name}</Link></li>)
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
                    <h1 style={{ margin: 0 }}>
                        <Link
                            to="/"
                            style={{
                                color: '#000',
                                textDecoration: `none`,
                                fontWeight: 400,
                                fontSize: '1.6rem'
                            }}>
                            Simon Sørensen
                            <span className="location">{this.location}</span>
                        </Link>
                    </h1>
                    <div className={menuClassName} onClick={this.toggleNav}>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div className={navClassName}>
                    {this.nav.map(group => (
                        <div className={'nav-group'}>
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
