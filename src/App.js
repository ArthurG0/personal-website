import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import fonts from './fonts.css'
import baseStyle from './App.css'
import Home from './components/Home'

function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/" >
        <Home empty/>
      </Route>

      <Route path='*' >
        <Home error404/>
      </Route>
      </Switch>


      


    </Router>
  );
}

export default App;
