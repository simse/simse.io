import React from "react"
import styles from "../../styles/project/container.module.scss"

const Container = ({children}) => {
    return (
        <section className={styles.container}>
            {children}
        </section>
    )
}

export default Container
