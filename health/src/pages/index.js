import * as React from "react"
import { Helmet } from "react-helmet"
import { graphql } from 'gatsby'

import * as styles from "../styles/pages/index.module.scss"

import Vital from "../components/vital"


const IndexPage = ({ data }) =>  {
    // Utility functions
    const round = (num) => {
      return Math.round(num * 10) / 10
    }

    // Construct data object
    const weightNode = data.allWeightNode.nodes[0]

    let vitals = {
      weight: {
        value: round(weightNode.weight)
      },
      fatPercentage: {
        value: round(weightNode.fat_percentage)
      },
      bmi: {
        value: round(weightNode.weight / 172 / 172 * 10000)
      }
    }

    return (
      <main className={styles.container}>
        <Helmet>
          <title>Simon's Health</title>
        </Helmet>

        <h1 className={styles.title}>The Weight Loss Journey</h1>
        <p className={styles.subtitle}>Below is an overview of my current weight and related metrics.</p>

        <div className={styles.grid}>
          <Vital value={vitals.weight.value} label={"Weight"} unit={"kg"} /*trend={{direction: "up", amount: -0.7}} *//>

         <Vital value={vitals.fatPercentage.value} label={"Fat Percentage"} unit={"%"} />

          <Vital value={vitals.bmi.value} label={"BMI"} />
        </div>
      </main>
    )
}

export const query = graphql`
query MyQuery {
  allWeightNode(sort: {fields: date, order: DESC}, limit: 1) {
    nodes {
      weight
      fat_percentage
    }
  }
}
`

export default IndexPage
