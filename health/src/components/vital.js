import * as React from "react"

import * as styles from "../styles/components/vital.module.scss"

// markup
const Vital = (props) => {
  return (
    <div className={`${styles.vital} ${props.noPadding ? styles.noPadding : ''}`}>
        <strong className={styles.label}>{props.label}</strong>

        <div className={styles.valueContainer}>
            <h2 className={styles.value}>{props.value}</h2>
            <span className={styles.unit}>{props.unit}</span>
        </div>

        {props.trend && <p className={styles.trend}>{props.trend.amount}{props.unit}</p>}
    </div>
  )
}

export default Vital
