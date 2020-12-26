import React from 'react'
import { graphql, Link, StaticQuery } from 'gatsby'

import MenuIcon from "../icons/menu.svg"
import CloseIcon from "../icons/close.svg"

import styles from "../styles/components/navbar.module.scss"

class Navbar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            navbarMinimised: false,
            menuOpen: false,
            menuClass: ""
        }


    }

    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
    }
    
    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    handleScroll = (event) => {
        if (window.scrollY > 10 && !this.state.navbarMinimised) {
            console.log("hello")

            this.setState({
                navbarMinimised: true
            })
        } else if(window.scrollY <= 10 && this.state.navbarMinimised) {
            this.setState({
                navbarMinimised: false
            })

            console.log("hello too")
        }

        //console.log(window.scrollY)
    }

    toggleMenu = () => {
        if (this.state.menuOpen) {
            this.setState({
                menuOpen: false,
                menuClass: `${styles.closing} ${styles.open}`
            })

            window.setTimeout(() => {
                this.setState({
                    menuClass: styles.closed
                })
            }, 200)
        } else {
            this.setState({
                menuOpen: true,
                menuClass: `${styles.opening} ${styles.open}`
            })

            window.setTimeout(() => {
                this.setState({
                    menuClass: styles.open
                })
            }, 200)
        }
    }

    handleKeyPress = (event) => {
        //console.log(event)

        if (event.key === "Enter") {
            this.toggleMenu()
        }
    }

    render() {
        return (
            <StaticQuery query={graphql`
        query MyQuery {
            allGhostPost {
              nodes {
                id
              }
            }
          }
        `} render={data => (
                <>
                    <div className={`${styles.navbar} ${this.state.navbarMinimised ? "" : styles.transparent}`}>
                        <div className={styles.logo}>
                            <Link to="/">
                                <img src={require("../images/logo.svg")} className={styles.logo} alt="Simon's signature" />
                            </Link>
                        </div>

                        <div className={styles.menu} onClick={this.toggleMenu} onKeyPress={this.handleKeyPress} role="button" tabIndex={0}>
                            <button><MenuIcon /> Menu</button>
                        </div>
                    </div>

                    <div className={`${styles.overlayMenu} ${this.state.menuClass}`}>
                        <div className={styles.close} onClick={this.toggleMenu} onKeyPress={this.handleKeyPress} role="button" tabIndex={0}>
                            <button aria-label="Close menu"><CloseIcon /></button>
                        </div>

                        <div className={styles.inner}>
                            <div className={styles.items}>
                                <Link to="/">
                                    <h1>Home</h1>
                                </Link>

                                <Link to="/blog">
                                    <h1>Blog <sup>{data.allGhostPost.nodes.length}</sup></h1>
                                </Link>

                                <Link to="/contact">
                                    <h1>Contact</h1>
                                </Link>
                            </div>

                            <div className={styles.sidebar}>
                                <div className={styles.contact}>
                                    <h2>Email</h2>
                                    <span className={styles.email}>hello@simse.io</span>
                                </div>

                                {/* <div className={styles.moreLinks}>
                                    <h2>Additional links</h2>

                                    <div className={styles.links}>
                                        <a href="https://repo.simse.io">Repo</a>
                                        <a href="https://archive.simse.io">Archive</a>
                                        <a href="https://labs.simse.io">Labs</a>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </>
            )} />
        )
    }
}

export default Navbar
