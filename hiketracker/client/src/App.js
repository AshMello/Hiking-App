import React, {Component} from 'react';
import Login from './components/Login'
import Register from './components/Register'
import './App.css';

class App extends Component {
  render(){
  return (
    <div className="App">
      <h1>HikeTracker</h1>
      <span>Welcome to HikeTracker, a resource for Hikers to log and text their location.</span>
      <span>Log in to save your locations</span>
      <Login />
      <Register />
    </div>
  );
}}

export default App;
