import * as React from "react"

import * as styles from "../styles/pages/index.module.scss"

import Vital from "../components/vital"


class IndexPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      weight: 0
    }
  }

  componentDidMount() {
    fetch('https://api.health.simse.io/weight')
      .then(response => response.json())
      .then(data => this.setState({weight: Math.round((data.current_weight + Number.EPSILON/10) * 10) / 10}));

  }

  render() {
    return (
      <main className={styles.container}>
        <h1>The Weight Loss Journey</h1>

        <div className={styles.grid}>
          <Vital value={this.state.weight} label={"Weight"} unit={"kg"} />
        </div>
      </main>
    )
  }
}

export default IndexPage
