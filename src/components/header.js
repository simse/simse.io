import { Link, graphql, StaticQuery } from "gatsby"
import React from "react"

import '../styles/header.scss'

class Header extends React.Component {
    state = {'navOpened': false}
    nav = []

    toggleNav = () => {
        this.setState({
            navOpened: !this.state.navOpened
        })
    }

    constructor(props) {
        super(props)

        props.nav.forEach((value) => {
            if(value.navigation !== null) {
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
                        }}
                        >
                        Simon Sørensen
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
                        <h2>{ group.title }</h2>

                        <ul>
                            {group.items.map(item => (
                                <li><a href={ item.url }>{ item.name }</a></li>
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
        <Header nav={data.allDataYaml.nodes} />
      )}
    />
  )
