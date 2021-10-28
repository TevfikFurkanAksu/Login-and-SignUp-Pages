import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link, NavLink} from "react-router-dom";
import Login from "./components/Login";
import SingUp from "./components/SignUp";
import {notFound} from "./components/notFound";


function App() {
  return (
    <Router>
      <div className="App">
        
        <nav >
          <ul className='nav-links'>
          <li>
          <NavLink to={'/'} exact activeStyle={{fontWeight:'bold', color:"tomato"}} >Üye Girişi</NavLink>
          </li>
          <li>
          <NavLink to={'/SignUp'}  activeStyle={{fontWeight:'bold', color:"tomato"}} >Kayıt Ol</NavLink>
          </li>
          </ul>
        </nav>
      <Switch>
      <Route path = "/" exact component={Login} />
      <Route path = "/SignUp" component={SingUp} />
      <Route path = "*" component={notFound} />

      </Switch>
    </div>
    </Router>
    
  );
}

export default App;
