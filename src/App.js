<<<<<<< HEAD
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
          <Route exact path='/'><Home/></Route>
          <Route path='/profile/:id'><SingleProfile/></Route>
          <Route path='*'><Error/></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
=======
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
>>>>>>> Initialize project using Create React App
