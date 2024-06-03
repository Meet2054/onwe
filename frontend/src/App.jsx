import { useState } from 'react'
import './App.css'
import Home from './Home'
import "../src/styles/Rightsection.css"
import "../src/styles/Middlesection.css"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home/>
    </>
  )
}

export default App
