import React from "react"
import { graphql} from "gatsby"

import Seo from "../components/seo"
import Navbar from "../components/navbar"

// import * as styles from "../styles/pages/blog-post.module.scss"

export default function ProjectPage({data, pageContext}) {
    const project = data.graphCmsProject

    return (
        <>
            <Seo title={project.name} />

            <Navbar />

            <h1>{project.name}</h1>
        </>
    )
  }

export const query = graphql`
  query($id: String!) {
    graphCmsProject(id: {eq: $id}) {
        name
    }
  }
`