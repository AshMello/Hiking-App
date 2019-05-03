import React, {Component} from 'react';

export class AllLocations extends Component {

    render() {
        const locations = this.props.records
        let items = locations.map((location) => {
            return <li key={location.id}>
            <a href={`https://www.latlong.net/c/?lat=${location.latitude}&long=${location.longitude}`}>{location.latitude}, {location.longitude}</a>
            <i>{location.createdAt}</i>
            </li>

        })

        return (
            <div>
                <h1>Location Log</h1>
                <ul>{items}</ul>
            </div>
        )
    }
}