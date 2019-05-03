import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'

export class Menu extends Component {

    render() {
        return (
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/record-position'>Record Position</NavLink></li>
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