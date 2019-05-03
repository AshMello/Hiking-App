
import React, {Component} from 'react';
import './App.css';
import {AllLocations} from './components/AllLocations';

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
      <AllLocations records= {this.state.locations}/>
      </div>
     )   
   }

 }

export default App;
