import React, {Component} from 'react';

export class AllLocations extends Component {

    constructor() {
        super()

        this.state = {
            data:'',
            message: ''
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
        [e.target.name] = e.target.value
    }

    // handleTextMessage() {

    //     fetch('http://localhost:8080/sendsms')
    // }



    render() {
        const locations = this.props.records
        let items = locations.map((location) => {
            return <li key={location.id}>
            <a name="message" href={`https://www.latlong.net/c/?lat=${location.latitude}&long=${location.longitude}`}>{location.latitude}, {location.longitude}</a>
            <i>{location.createdAt}</i>
            <input name="data" onChange={this.handlePhoneEntry} placeholder="Enter Phone Number"></input>
            {/* <button onClick={this.handleTextMessage()}>Text Location</button> */}
            <button onClick={() => this.deleteLocation(location)}>Delete</button>
            </li>

        })

        return (
            <div>
                <span>{items}</span>
            </div>
        )
    }
}