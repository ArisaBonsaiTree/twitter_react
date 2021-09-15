// ? Standard React Imports
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Import pages from ./pages
import Home from './pages/Home'
import SingleProfile from './pages/SingleProfile'
import Error from './pages/Error'

function App(){
  return(
    <div>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          
          <Route path='/profile/:accountNum' component={SingleProfile}>
            <SingleProfile/>
          </Route>
          
          <Route path='*'>
            <Error/>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App

