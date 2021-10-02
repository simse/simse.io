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

    const daysBetween = (startDate, endDate) => {
      var millisecondsPerDay = 24 * 60 * 60 * 1000;
      return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
    }

    const treatAsUTC = (date) => {
      var result = new Date(date);
      result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
      return result;
    }

    const calculateTrend = (nodes, measurement) => {
      // Difference between previous and current, averaged to a week
      return -((nodes[1][measurement] - nodes[0][measurement]) / Math.round(daysBetween(nodes[1].date, nodes[0].date)) * 7)
    }

    // Construct data object
    const weightNode = data.allWeightNode.nodes[0]

    let vitals = [
      {
        value: round(weightNode.weight),
        trend: round(calculateTrend(data.allWeightNode.nodes, "weight")),
        label: "Weight",
        unit: "kg"
      },
      {
        value: round(weightNode.fat_percentage),
        trend: round(calculateTrend(data.allWeightNode.nodes, "fat_percentage")),
        label: "Fat Percentage",
        unit: "%"
      }/*,
      bmi: {
        value: round(weightNode.weight / 172 / 172 * 10000)
      }*/
    ]

    console.log(vitals)

    return (
      <main className={styles.container}>
        <Helmet>
          <title>Simon's Health</title>
        </Helmet>

        <h1 className={styles.title}>The Weight Loss Journey</h1>
        <p className={styles.subtitle}>Below is an overview of my current weight and related metrics.</p>

        <div className={styles.grid}>
          {vitals.map(vital => (
            <Vital key={vital.label} value={vital.value} label={vital.label} unit={vital.unit} trend={{direction: vital.trend > 0 ? "down" : "up", amount: vital.trend}} />
          ))}
        </div>
      </main>
    )
}

export const query = graphql`
query MyQuery {
  allWeightNode(sort: {fields: date, order: DESC}, limit: 2) {
    nodes {
      weight
      fat_percentage
      date
    }
  }
}
`

export default IndexPage
