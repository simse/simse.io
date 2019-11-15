import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import '../styles/about-page.scss'

const IndexPage = () => (
    <Layout>
        <SEO title="About me" />

        <div className="about-page">
            <h1>About me</h1>
            <h2>Simple resume style information about me</h2>

            <div className="about-grid">
                <div className="about-col">
                    <h3>Education</h3>

                    <ul class="education">
                        <li>
                            <div className="heading">
                                University of Sussex
                            </div>

                            <ul>
                                <li>2019 - 2020</li>
                                <li>Computer Science Foundation Year</li>
                                <li>C & C++ programming</li>
                                <li>Computing Mathematics</li>
                            </ul>
                        </li>

                        <li>
                            <div className="heading">
                                Nyborg Gymnasium
                            </div>

                            <ul>
                                <li>2017 - 2019</li>
                                <li>International Baccalaurette</li>
                                <li>Mathematics SL</li>
                                <li>Global Politics</li>
                            </ul>
                        </li>

                        <li>
                            <div className="heading">
                                British International School of Shanghai, Puxi
                            </div>

                            <ul>
                                <li>2015 - 2017</li>
                                <li>International General Certificate of Secondary Education</li>
                                <li>Computer Science - A</li>
                                <li>Mathematics - A</li>
                                <li>Business Studies - A</li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div className="about-col">
                    <h3>Technical abilities</h3>

                    <ul class="technical">
                        <li>
                            <div className="heading">
                                Python
                            </div>

                            <ul>
                                <li>3 years</li>
                                <li>Over 50k software downloads</li>
                            </ul>
                        </li>

                        <li>
                            <div className="heading">
                                Web Technologies (HTML, CSS, JS)
                            </div>

                            <ul>
                                <li>6 years</li>
                                <li>Strong Vue.js coder</li>
                                <li>Massive fan of JAMstack</li>
                            </ul>
                        </li>

                        <li>
                            <div className="heading">
                                C
                            </div>

                            <ul>
                                <li>1 month</li>
                                <li>Just learning C</li>
                                <li><span role="img" aria-label="heart">❤️</span> Love it</li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div className="about-col">
                    <h3>General Information</h3>

                    <ul class="general">
                        <li>
                            <div className="heading">
                                Spoken languages
                            </div>

                            <ul>
                                <li>Danish - native</li>
                                <li>English - fluent</li>
                            </ul>
                        </li>

                        <li>
                            <div className="heading">
                                Preferred Operating System
                            </div>

                            <ul>
                                <li>Windows 10 for play</li>
                                <li>Linux (or WSL) for work</li>
                            </ul>
                        </li>

                        <li>
                            <div className="heading">
                                Countries
                            </div>

                            <ul>
                                <li>Denmark - born and raised</li>
                                <li>China - two years</li>
                                <li>UK - 1 month</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </Layout>
)

export default IndexPage
