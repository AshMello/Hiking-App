import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {setAuthenticationHeader} from '../utils/authenticate'

class Login extends Component {

    constructor() {
        super()

        this.state = {
            username:'',
            password:''
        }
    }

    handleLoginClick = () => {

        axios.post('http://localhost:8080/login', {
            username: this.state.username,
            password: this.state.password
        }).then(response => {
            let token = response.data.token
            let id = response.data.id
            console.log(token, id)
            localStorage.setItem('jsonwebtoken', token)
            this.props.onAuthenticated(token,id)
            setAuthenticationHeader(token)
        }).catch(error => console.log(error.response))
    }
 

    handleTextBoxChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return(
            <div>
                <input name="username" onChange={this.handleTextBoxChange} placeholder='username'></input>
                <input name="password" onChange={this.handleTextBoxChange} placeholder='password'></input>
                <button onClick={this.handleLoginClick}>Login</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthenticated: (token, id) => dispatch({type: 'ON_AUTHENTICATED', token: token, id: id})
    }
}

export default connect(null, mapDispatchToProps)(Login)