import Axios from 'axios'
import React from 'react'
import { UserContextProvider } from "./context/UserContext"
import Router from './Router'

// * Webpack allows us to use scss
// ? This stylesheet is ran first before all others
import './style/index.scss'

// * Set every Axios call with crendtials to allow cookies
Axios.defaults.withCredentials = true

function App(){
  return(
    <div className="container">
      <Router/>
    </div> 
  )
}

export default App

