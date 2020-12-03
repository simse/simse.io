import React from 'react'
import { Link } from 'gatsby'

import styles from "../styles/components/navbar.module.scss"

class Navbar extends React.Component {
    render() {
        return (
            <div className={styles.navbar}>
                <div className={styles.back}>
                    Go back
                </div>

                <div className={styles.logo}>
                    <Link to="/">
                        <img src={require("../images/logo.svg")} className={styles.logo} alt="Simon's signature" />
                    </Link>
                </div>
            </div>
        )
    }
}

export default Navbar