import React, {Component} from 'react';
import './RecordPosition.css';
import { connect } from 'react-redux'

class RecordPosition extends Component {

    constructor() {
        super()

        this.state = {
            latitude: '',
            longitude: '',
            data:''
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

                this.props.onLocationLoaded(position.coords)


                this.setState({
                    latitude: position.coords.latitude,
                    longitude:position.coords.longitude
                })
            })
        }
    }

    handlePhoneEntry = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleTextMessage() {

        const data = {
            phone: this.state.data, 
            latitude: this.props.latitude,
            longitude: this.props.longitude
        }

        console.log(data)

        fetch('http://localhost:8080/sendsms', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                 data: data
                })
        }).then(response => response.json())
        .then(result => console.log(result))
    }


    render() {
        return (
        <div className="buttonGroup">
            <img src="/define-location-icon-128.png" />
            <button className="targetButton" onClick={this.handleSaveClick}>Find my Location</button>
            <input name="data" onChange={this.handlePhoneEntry} placeholder="Enter Phone Number"></input>
            <button onClick={() => this.handleTextMessage()}>Text Location</button>
            <label>{this.state.message}</label>
        </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        onLocationLoaded: (coordinates) => dispatch({type: 'LOCATION_LOADED', value: coordinates})
    }
}

const mapStateToProps = (state) => {
    return {
        latitude: state.latitude, 
        longitude: state.longitude
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RecordPosition)