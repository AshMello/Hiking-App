import React, {Component} from 'react';
import Login from './components/Login'
import Register from './components/Register'
import './App.css';


class App extends Component {
  render(){
    return (
      <div className="loginBox">
        <img src="https://i.imgur.com/EuJ6s7Y.jpg"></img>
        <div className="loginText">
          <h1>HikeTracker</h1>
          <span>Welcome to HikeTracker, a safety resource for Hikers to log and text their trail locations.</span>
        </div>
        <div className="LoginComponents">
          <Login />
          <Register />
        </div>
      </div>
    );
}}

export default App;
