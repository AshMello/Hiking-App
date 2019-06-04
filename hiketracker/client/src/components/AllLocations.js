import React, {Component} from 'react';
import {connect} from 'react-redux';

class AllLocations extends Component {
    constructor() {
    super()
      this.state = {
          locations: []
      }
    }

    deleteLocation(location) {

        let local = {
            locationId: location.id
        }

    fetch("http://localhost:8080/delete", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(local)
    }).then(response => {
        if (response.status >= 400) {
            throw new Error("Error")
        }
        return response.json()
        
    }).then(local => {
        if(local === "success"){
            console.log("success")
        }
    })
    }

    componentDidMount() {
        let url = 'http://localhost:8080/api/coordinates'
        fetch(url)
        .then(response => response.json())
        .then(json => {
          let locations = json.map((location) => {
            if(location.userId === this.props.userId) {
              return (
                <div className="itemList">
                <li className="list" key={location.id}>
                <a name="message" href={`https://www.latlong.net/c/?lat=${location.latitude}&long=${location.longitude}`}>{location.latitude}, {location.longitude}</a>
                <i>{location.createdAt}</i>
                <button onClick={() => this.deleteLocation(location)}>Delete</button>
                </li>
                </div>
              )
            }
          })
          this.setState({locations: locations})
        })
      }
    
      render() {
        return (
          <div>
            {this.state.locations}
          </div>
        )
      }
}

const mapStateToProps = (state) => {
    return {
        latitude: state.latitude, 
        longitude: state.longitude,
        userId: state.uid
    }
}

export default connect(mapStateToProps)(AllLocations)