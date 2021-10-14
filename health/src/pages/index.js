import * as React from "react"
import { useState, useMemo } from "react"
import { Helmet } from "react-helmet"
import { graphql } from 'gatsby'
import Modal from 'react-modal'
import * as V from 'victory'

import * as styles from "../styles/pages/index.module.scss"

import Vital from "../components/vital"

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#1c1c1e',
    border: '0',
    maxWidth: '800px',
    borderRadius: '40px',
    minHeight: '50vh',
    padding: '24px'
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.8)'
  }
};

const IndexPage = ({ data }) => {
  /*Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}*/

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
    // nodes.reverse()
    return -((nodes[1][measurement] - nodes[0][measurement]) / Math.round(daysBetween(nodes[1].date, nodes[0].date)) * 7)
  }

  const predictFutureData = (measurement, periods) => {
    let current = data.allWeightNode.nodes[0][measurement]
    let trend = calculateTrend(data.allWeightNode.nodes, measurement)

    return [...Array(periods+1).keys()].map(i => {
      let date = new Date(data.allWeightNode.nodes[0].date)

      return {
        date: date.setDate(date.getDate() + (i)*7),
        value: current + (i)*trend
      }
    })
  }

  const getHistoricalData = (measurement) => {
    let measurementData = data.allWeightNode.nodes.map(node => {
      return {
        date: node.date,
        value: node[measurement]
      }
    })

    measurementData.reverse()

    return measurementData
  }

  const chartFromHistorical = (historicalData) => {
    return historicalData.map(d => {
      return {
        x: treatAsUTC(d.date),
        y: round(d.value)
      }
    })
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-GB', { timeZone: 'UTC' })
  }

  // Construct data object
  const weightNode = data.allWeightNode.nodes[0]

  let vitals = [
    {
      value: round(weightNode.weight),
      trend: round(calculateTrend(data.allWeightNode.nodes, "weight")),
      label: "Weight",
      unit: "kg",
      key: "weight"
    },
    {
      value: round(weightNode.fat_percentage),
      trend: round(calculateTrend(data.allWeightNode.nodes, "fat_percentage")),
      label: "Fat Percentage",
      unit: "%",
      key: "fat_percentage"
    }/*,
      bmi: {
        value: round(weightNode.weight / 172 / 172 * 10000)
      }*/
  ]

  // Modal
  const [modalOpen, setModalOpen] = useState(false)
  const [vitalShown, setVitalShown] = useState(0)

 //  console.log(predictFutureData('weight', 10))

  return (
    <main className={styles.container}>
      <Helmet>
        <title>Simon's Health</title>
      </Helmet>

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Example Modal"
        ariaHideApp={false}
        style={customModalStyles}
      >
        <div className={styles.modal}>
          <Vital noPadding={true} value={vitals[vitalShown].value} label={vitals[vitalShown].label} unit={vitals[vitalShown].unit} trend={{ direction: vitals[vitalShown].trend > 0 ? "down" : "up", amount: vitals[vitalShown].trend }} />

          <p className={styles.label}>Historical and predicted</p>
          <div className={styles.chart}>
            <V.VictoryChart
              theme={V.VictoryTheme.material}
              width={750}
              height={500}
              scale={{ x: "time", y: "linear" }}
              domainPadding={{x: [0, 0], y: 20}}
            >
              <V.VictoryLine
                style={{
                  data: { stroke: "#3b82f8", strokeWidth: 2 },
                  // parent: { border: "1px solid #ccc" }
                }}
                animate={{
                  duration: 2000,
                  onLoad: { duration: 2000 }
                }}
                interpolation="catmullRom"
                data={chartFromHistorical(getHistoricalData(vitals[vitalShown].key))}
              />
              <V.VictoryLine
                style={{
                  data: {
                    stroke: "#fff",
                    opacity: 0.4,
                    strokeWidth: 2,
                    strokeDasharray: 8
                  },
                  // parent: { border: "1px solid #ccc" }
                }}
                animate={{
                  duration: 2000,
                  onLoad: { duration: 2000 }
                }}
                interpolation="catmullRom"
                data={chartFromHistorical(predictFutureData(vitals[vitalShown].key, 4))}
              />
              <V.VictoryAxis 
                style={{
                  tickLabels: {
                    fontSize: 14,
                    padding: 5,
                    fill: "#fff",
                    opacity: 0.8,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
                  },
                  grid: {
                    stroke: '#fff',
                    opacity: 0.3
                  }
                }}
              />
              <V.VictoryAxis
                dependentAxis
                style={{
                  tickLabels: {
                    fontSize: 14,
                    padding: 5,
                    fill: "#fff",
                    opacity: 0.8,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
                  },
                  grid: {
                    stroke: '#fff',
                    opacity: 0
                  }
                }}
              />
            </V.VictoryChart>
          </div>
        </div>
      </Modal>

      <h1 className={styles.title}>The Weight Loss Journey</h1>
      <p className={styles.subtitle}>Below is an overview of my current weight and related metrics.</p>


      <h2 className={styles.sectionTitle}>Body</h2>
      <p className={styles.lastUpdated}>Last updated: {formatDate(weightNode.date)} {/* <strong>({Math.round(daysBetween(weightNode.date, new Date()))} days ago)</strong> */}</p>

      <div className={styles.grid}>
        {vitals.map((vital, vitalIndex) => (
          <div
            key={vital.label}
            onClick={() => {
              setModalOpen(true)
              setVitalShown(vitalIndex)
              console.log("hello!")
            }}
          >
            <Vital 
              value={vital.value}
              label={vital.label}
              unit={vital.unit}
              trend={{ direction: vital.trend > 0 ? "down" : "up", amount: vital.trend }}
            />
          </div>
        ))}
      </div>
    </main>
  )
}

export const query = graphql`
query MyQuery {
  allWeightNode(sort: {fields: date, order: DESC}) {
    nodes {
      weight
      fat_percentage
      date
    }
  }
}
`

export default IndexPage
