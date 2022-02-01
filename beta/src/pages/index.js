import * as React from "react"
/*import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"*/

// import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => (
  <main className="bg-black text-white">

    <Seo title="Home" />

    <div className="h-[200px] w-[200px] bg-red-600 absolute top-20 left-20 z-0 rounded-full"></div>

    <section className="h-[80vh] flex flex-col justify-center items-center z-10 bg-[rgba(0, 0, 0, 0.7)] relative backdrop-blur-lg ">
      <h1 className="text-8xl font-bold text-center w-3/5">
        Hello, my name is Simon Sorensen.
      </h1>
    </section>
    

    <h1 className="text-3xl">
      Computer Science student & Software Engineer Intern
    </h1>

    <section className="h-screen bg-slate-900 p-12">
      <h1 className="text-6xl font-bold">
        I live in beautiful London
      </h1>

      <h1 className="text-5xl">
        and study Computer Science at Kingston University
      </h1>
    </section>

    <section className="h-screen">
      <h1 className="text-3xl  font-sans">
        I intern as Software Engineer at the LEGO Group
      </h1>
    </section>
    
    <section className="h-screen bg-slate-900">
      <h1 className="text-3xl">
        I want to build the modern web
      </h1>

      <h1 className="text-3xl">Where websites are distributed close to the users</h1>

      <h1 className="text-3xl">And the backend is concentrated but strong and ressilient</h1>
    </section>
    
    <section className="h-screen">
      <h1 className="text-3xl">
        I love Javascript and Typescript
      </h1>

      <h1 className="text-3xl">And when speed is paramount Go is my go-to</h1>
    </section>

    <section className="h-screen bg-slate-900">
      <h1 className="text-3xl">
        Welcome to my slice of the internet
      </h1>

      <h1 className="text-3xl">Have a look around</h1>
    </section>
  </main>
)

export default IndexPage
