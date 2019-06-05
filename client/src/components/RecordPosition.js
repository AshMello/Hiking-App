import React, {Component} from 'react';
import { connect } from 'react-redux';
import './RecordPosition.css';

class RecordPosition extends Component {

    constructor() {
        super()

        this.state = {
            latitude: '',
            longitude: '',
            data:'',
            messages:''
        }
    }

    handleSaveClick = () => {
        fetch('http://localhost:8080/api/coordinates', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                userId: this.props.id
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
              longitude: position.coords.longitude
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
            longitude: this.props.longitude,
            messages: this.state.messages
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

        <div className="recordings">
            <img className="bg" src="https://i.imgur.com/8ynkt9a.jpg" />
            <div className="recordGroup">
                <div className="recLoc">
                    <img className="checkin" src="https://i.imgur.com/cir4nS7.png" />
                    <button className="targetBtn" onClick={this.handleSaveClick}>Find my Location</button>
                </div>
                <div className="textLoc">
                    <div>
                        <img className="checkin" src="https://i.imgur.com/auskLTH.png" />
                    </div>
                <div className="texts">
                        <textarea name="messages" onChange={this.handlePhoneEntry} placeholder="Enter Message"></textarea>
                        <input name="data" onChange={this.handlePhoneEntry} placeholder="Enter Phone Number"></input>
                        <button className="targetBtn" onClick={() => this.handleTextMessage()}>Text Location</button>
                        <label>{this.state.message}</label>
                    </div>
            </div>
        </div>
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
      id: state.uid,
      latitude: state.latitude, 
      longitude: state.longitude
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(RecordPosition)