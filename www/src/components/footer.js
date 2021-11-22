import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

import * as styles from "../styles/components/footer.module.scss"

class Footer extends React.Component {
    render() {
        return (
            <StaticQuery
                query={graphql`
                    query {
                        currentBuildDate {
                            currentDate
                        }
                    }
                `}
                render={data => (
                    <footer className={styles.footer}>
                        <div className={styles.sections}>
                            <div className={styles.section}>
                                <h2>Links</h2>

                                <ul>
                                    <li><Link to="blog">Blog</Link></li>
                                    <li><Link to="contact">Contact</Link></li>
                                </ul>
                            </div>

                            <div className={styles.section}>
                                <h2>Additional links</h2>

                                <ul>
                                    <li><a href="https://labs.simse.io">Labs</a></li>
                                </ul>
                            </div>

                            {/* <div className={styles.section}>
                                <h2>About this request</h2>

                                <div className={styles.request}>
                                    <span className={styles.key}>host provider</span> <span className={styles.value}>Cloudflare</span>

                                    <span className={styles.key}>server name</span> <span className={styles.value}>CPH-01</span>

                                    <span className={styles.key}>server location</span> <span className={styles.value}>Copenhagen, Denmark</span>
                                </div>
                            </div> */}
                        </div>

                        <div className={styles.bottom}>
                            <p>Last updated: {data.currentBuildDate.currentDate}</p>
                        </div>
                    </footer>
                )}
            />
        )
    }
}

export default Footer