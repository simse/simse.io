import React from 'react'
import { graphql, Link, StaticQuery } from 'gatsby'
import anime from 'animejs'

import MenuIcon from "../icons/menu.svg"
import CloseIcon from "../icons/close.svg"

import styles from "../styles/components/navbar.module.scss"

class Navbar extends React.Component {
    constructor(props) {
        super(props)

        let breadcrumbs

        if (!props.breadcrumbs) {
            breadcrumbs = []
        } else {
            breadcrumbs = [
                {
                    "name": "simse.io",
                    "href": "/"
                }
            ].concat(props.breadcrumbs)
        }

        this.state = {
            navbarMinimised: false,
            menuOpen: false,
            menuClass: "",
            breadcrumbsShown: true,
            breadcrumbs: breadcrumbs
        }

        this.homeRef = React.createRef();
        this.blogRef = React.createRef();
        this.projectsRef = React.createRef();
        this.breadcrumbsRef = React.createRef();
    }

    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
    }
    
    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    handleScroll = (event) => {
        if (window.scrollY > 10 && !this.state.navbarMinimised) {
            this.setState({
                navbarMinimised: true
            })

            if (this.state.breadcrumbsShown) {
                this.toggleBreadcrumbs();
            }
        } else if(window.scrollY <= 10 && this.state.navbarMinimised) {
            this.setState({
                navbarMinimised: false
            })

            if (!this.state.breadcrumbsShown) {
                this.toggleBreadcrumbs();
            }
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

            var basicTimeline = anime.timeline()
            basicTimeline
                .add({
                    targets: [
                        this.homeRef.current,
                        this.blogRef.current,
                        this.projectsRef.current
                    ],
                    translateX: [-120, 0],
                    opacity: [0, 1],
                    duration: 400,
                    delay: anime.stagger(100),
                    easing: "easeInOutQuart"
                })
        }
    }

    toggleBreadcrumbs = () => {
        if (this.state.breadcrumbsShown) {
            this.setState({
                breadcrumbsShown: false
            })

            anime({
                targets: this.breadcrumbsRef.current,
                translateY: "-100%",
                opacity: 0,
                duration: 300,
                easing: 'easeInOutQuart'
            })
        } else {
            this.setState({
                breadcrumbsShown: true
            })

            anime({
                targets: this.breadcrumbsRef.current,
                translateY: "0%",
                opacity: 1,
                duration: 300,
                easing: 'easeInOutQuart'
            })
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

                    <div className={`${styles.breadcrumbs} ${this.state.breadcrumbs.length === 0 ? styles.hidden : ""}`} ref={this.breadcrumbsRef}>
                        {this.state.breadcrumbs.map((crumb, i) => (
                            <div key={i}>
                                <Link to={crumb.href}>{crumb.name}</Link>

                                {i !== (this.state.breadcrumbs.length - 1) &&
                                <span>/</span>}
                            </div>
                        ))}
                    </div>

                    <div className={`${styles.overlayMenu} ${this.state.menuClass}`}>
                        <div className={styles.close} onClick={this.toggleMenu} onKeyPress={this.handleKeyPress} role="button" tabIndex={0}>
                            <button aria-label="Close menu"><CloseIcon /></button>
                        </div>

                        <div className={styles.inner}>
                            <div className={styles.items}>
                                <Link to="/" ref={this.homeRef}>
                                    <h1>Home</h1>
                                </Link>

                                <Link to="/blog" ref={this.blogRef}>
                                    <h1>Blog <sup>{data.allGhostPost.nodes.length}</sup></h1>
                                </Link>

                                <Link to="/contact" ref={this.projectsRef}>
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
