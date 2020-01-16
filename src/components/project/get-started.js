import React from "react"
import styles from "../../styles/project/get-started.module.scss"

const GetStarted = (props) => {
    return (
        <section className={styles.getStarted}>
            <div className={styles.steps}>
                {props.step1Title != null && <div>
                    <span className={styles.stepNumber}>1</span>
                    <h3 className={styles.stepTitle}>{props.step1Title}</h3>

                    <div className={styles.stepContent}>
                        <p dangerouslySetInnerHTML={{__html: props.step1Content}}></p>
                    </div>
                </div>}


                {props.step2Title != null && <div>
                    <span className={styles.stepNumber}>2</span>
                    <h3 className={styles.stepTitle}>{props.step2Title}</h3>

                    <div className={styles.stepContent}>
                        <p dangerouslySetInnerHTML={{__html: props.step2Content}}></p>
                    </div>
                </div>}


                {props.step3Title != null && <div>
                    <span className={styles.stepNumber}>3</span>
                    <h3 className={styles.stepTitle}>{props.step3Title}</h3>

                    <div className={styles.stepContent}>
                        <p dangerouslySetInnerHTML={{__html: props.step3Content}}></p>
                    </div>
                </div>}
            </div>
        </section>
    )
}

export default GetStarted
