
import React, {Component} from 'react';
import './App.css';
import {AllLocations} from './components/AllLocations';
import Login from './components/Login';
// import Login from './components/Login'

 class App extends Component {
   constructor() {
     super()

     this.state = {
       locations: [],
     }
   }

   componentDidMount() {
      let url = 'http://localhost:8080/api/coordinates'
      fetch(url)
      .then(response => response.json())
      .then(results => {
        this.setState({
          locations:results
        })
      })
   }


   render() {
     return (
       <div>
         {/* <Login /> */}
      <AllLocations records= {this.state.locations}/>
      </div>
     )   
   }

 }

export default App;
