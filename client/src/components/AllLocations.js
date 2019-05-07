import React, {Component} from 'react';
import './AllLocations.css';
import { connect } from 'react-redux'

class AllLocations extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: ''
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

    handlePhoneEntry = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // handleTextMessage() {

    //     const data = {
    //         phone: this.state.data, 
    //         latitude: this.props.latitude,
    //         longitude: this.props.longitude
    //     }

    //     fetch('http://localhost:8080/sendsms', {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({
    //              data: data
    //             })
    //     }).then(response => response.json())
    //     .then(result => console.log(result))
    // }


    render() {
        const locations = this.props.records
        let items = locations.map((location) => {
            return <div className="itemList">
            <li className="list" key={location.id}>
            <a name="message" href={`https://www.latlong.net/c/?lat=${location.latitude}&long=${location.longitude}`}>{location.latitude}, {location.longitude}</a>
            <i>{location.createdAt}</i>
            <button onClick={() => this.deleteLocation(location)}>Delete</button>
            </li>
            </div>

        })

        return (
            <div className="container">
                <h1>All My Locations</h1>
                <span>{items}</span>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        latitude: state.latitude, 
        longitude: state.longitude
    }
}

export default connect(mapStateToProps)(AllLocations)