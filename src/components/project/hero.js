import React from "react"
import styles from "../../styles/project/hero.module.scss"

const Hero = (props) => {
    return (
        <section className={styles.hero}>
            <h1 className={styles.title}>{props.title}</h1>
            <h2 className={styles.subtitle}>{props.subtitle}</h2>
        </section>
    )
}

export default Hero
