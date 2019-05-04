import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './BaseLayout.css';

export class Menu extends Component {

    render() {
        return (
            <ul className='ulNav'>
                <li><NavLink className='Nav-link' to='/record-position'>Record Position</NavLink></li>
                <li><NavLink className='Nav-link' to='/' exact>View All Locations</NavLink></li>  
                <li className='links'><NavLink className='Navs' to='/' exact>Login</NavLink></li>  
            </ul>
        )
    }
}

export class BaseLayout extends Component {
    render() {
        return (
            <div>
                <Menu />
                {this.props.children}
            </div>
        )
    }
}