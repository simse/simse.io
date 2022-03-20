/*import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"

import Seo from "../components/seo"
import Navbar from "../components/navbar"

import * as styles from "../styles/pages/project.module.scss"
import {numberWithCommas} from "../utils/num"

export default function ProjectPage({data}) {
    const project = data.graphCmsProject

    // Create breadcrumbs for navbar
    const breadcrumbs = [
      {
        "name": "Projects",
        "href": "/projects"
      },
      {
        "name": project.name,
        "href": "/project/" + project.slug
      }
    ]

    const showInsights = project.insights !== null && project.insights.length > 0

    let initialMetricsState = {}

    // Create query string for PMAM
    let queryString = ""

    if(showInsights) {
      // Create empty metrics array so UI knows to render loading
      project.insights.forEach(insight => {
        initialMetricsState[insight.pmam_key] = null 
        queryString += "%2b" + insight.pmam_key
      })
    }

    const [ metrics, setMetrics ] = useState(initialMetricsState)

    useEffect(() => {
      // Create PMAM url
      let myRequest = new Request('https://pmam.simse.io/query?query=' + queryString.substring(3));

      // Send request to PMAM
      fetch(myRequest)
      .then(response => response.json())
      .then(data => {
        let metricsObject = {}

        // Process response to create object: key -> value
        data.forEach(metric => {
          metricsObject[metric.key] = metric.value
        })

        // Set state to new metrics
        setMetrics(metricsObject)
      })
    }, [project.insights, queryString])

    return (
        <>
            <Seo title={project.name} />

            <Navbar breadcrumbs={breadcrumbs} />

            <div className={styles.project}>
              <div className={styles.header}>
                <h1 className={styles.title}>{project.name}</h1>

                <p className={styles.description}>{project.description}</p>
              </div>
              
              {showInsights && 
              <div className={styles.section}>
                <h2>Insights</h2>

                <div className={styles.insights}>
                  {project.insights.map(metric => (
                    <div className={styles.metric} key={metric.name}>
                      <h3 className={styles.metricTitle}>{metric.name}</h3>
                      <span className={styles.metricValue}>{metrics[metric.pmam_key] === null ? "Loading..." : numberWithCommas(metrics[metric.pmam_key])}</span>
                    </div>
                  ))}
                </div>
              </div>}
            </div>
        </>
    )
  }

export const query = graphql`
  query($id: String!) {
    graphCmsProject(id: {eq: $id}) {
        name
        description
        slug
        insights
    }
  }
`*/