import * as React from "react"
import { Helmet } from "react-helmet"

import * as styles from "../styles/pages/index.module.scss"

import Vital from "../components/vital"


class IndexPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      weight: 0,
      fatPercentage: 0
    }
  }

  componentDidMount() {
    fetch('https://api.health.simse.io/weight')
      .then(response => response.json())
      .then(data => this.setState(
        {
          weight: Math.round((data.current.weight + Number.EPSILON/10) * 10) / 10,
          fatPercentage: Math.round((data.current.fat_percentage + Number.EPSILON/10) * 10) / 10
        }
      ));

  }

  render() {
    return (
      <main className={styles.container}>
        <Helmet>
          <title>Simon's Health</title>
        </Helmet>

        <h1>The Weight Loss Journey</h1>
        <p>Below is an overview of my current weight and related metrics. They are updated automatically and regularly. I hope that by sharing my progress with friends and family, and everyone, I will stick to my goals, and finally lose weight.</p>

        <div className={styles.grid}>
          <Vital value={this.state.weight} label={"Weight"} unit={"kg"} /*trend={{direction: "up", amount: -0.7}}*/ />

          <Vital value={this.state.fatPercentage} label={"Fat Percentage"} unit={"%"} />
        </div>
      </main>
    )
  }
}

export default IndexPage
