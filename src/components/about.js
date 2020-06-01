import React from "react"

import '../styles/about.scss'

const About = () => {
    return (
        <section className={'about'}>
            <h2>About my software</h2>
            <h3 className={'subtitle'}>Here's some inflated statistics about my open source software</h3>

            <div className={'row'}>
                <div className={'col'}>
                    <h1>200k</h1>
                    <p>total software downloads</p>
                </div>

                <div className={'col'}>
                    <h1>52</h1>
                    <p>total Github stars</p>
                </div>

                <div className={'col'}>
                    <h1>1000s</h1>
                    <p>active users</p>
                </div>
            </div>
        </section>
    )
}

export default About
