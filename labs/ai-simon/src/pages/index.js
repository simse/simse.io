import * as React from "react"
import ai from "../ai"

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

// markup
const IndexPage = () => {
  // Load AI model
  React.useEffect(() => {
    ai.load();
  }, [])
  
  // Methods for handling form input
  const [inputValue, setInputValue] = React.useState('')
  const [modelOutput, setModelOutput] = React.useState('no_model_output')

  let handleSubmit = (event) => {
    setModelOutput(ai.message(inputValue))
    setInputValue('')

    event.preventDefault();
  }

  let handleChange = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <main style={pageStyles}>
      <title>Home Page</title>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter message..." value={inputValue} onChange={handleChange} />
        <button>Submit</button>
      </form>


      <h1>{modelOutput}</h1>
    </main>
  )
}

export default IndexPage
