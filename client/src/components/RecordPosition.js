import React, {Component} from 'react';

export class RecordPosition extends Component {

    constructor() {
        super()

        this.state = {
            latitude: '',
            longitude: '',
            message: ''
        }
    }

    handleSaveClick = () => {
        fetch('http://localhost:8080/api/coordinates', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                latitude: this.state.latitude,
                longitude: this.state.longitude,
            })
        }).then(response => response.json())
        .then(result => {
            console.log(result)
            if(result.success) {
                this.setState({
                    message: result.message
                })
            }
        })
    }

    componentDidMount() {

        if('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude:position.coords.longitude
                })
            })
        }
    }

    render() {
        return (
        <div>
            <button onClick={this.handleSaveClick}>Save Location</button>
            <label>{this.state.message}</label>
        </div>
        )
    }

}