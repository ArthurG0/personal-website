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
import MontyHall from './components/MontyHall'
import dotenv from 'dotenv'
dotenv.config()

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" >
          <Home/>
        </Route>
        <Route exact path="/monty-hall" >
          <MontyHall/>
        </Route>

        <Route path='*' >
          <Home/>
        </Route>
      </Switch>


      


    </Router>
  );
}

export default App;
