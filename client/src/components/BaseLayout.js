import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './BaseLayout.css';

export class Menu extends Component {
    handleLogoutClick = () => {
        console.log(this.props.isAuthenticated)
        localStorage.removeItem('jsonwebtoken')
        this.props.logout()
        this.props.history.push('/')
        console.log("logged out")
    }

    render() {
        return (
            <div className="body">
            <ul className='ulNav'> 
                <li className="logo">HikeTracker</li>
                <li><NavLink className='Nav-link' to='/record-position'>Record Position</NavLink></li> 
                <li><NavLink className='Nav-link' to='/all-locations'>All Locations</NavLink></li> 
                {this.props.isAuthenticated ? <li className='Nav-link'><a className='Nav-link' onClick={this.handleLogoutClick} href="#">Logout</a> 
                </li> : null }
            </ul>
            </div>
        )
    }
}

class BaseLayout extends Component {
        
    render() {
        return (
            <div>
                <Menu isAuthenticated={this.props.isAuthenticated} logout={this.props.onLogout} history={this.props.history} />
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch({type: 'LOGOUT'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BaseLayout))
