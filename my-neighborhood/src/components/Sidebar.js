import React, {Component} from "react";
import Places from '../components/Places';
import EventBus from 'eventbusjs';

export default class Sidebar extends Component {
    updateQuery = (e) => {
        let query = e.target.value
        EventBus.dispatch('QUERY_CHANGED', query)
    }

    render() {
        return (
            <div className="sidebar">
                <input
                    type="text"
                    id="searchbox"
                    placeholder="Search Places"
                    value={window.query || ''}
                    onChange={this.updateQuery}
                />
                <Places places={this.props.places} />
            </div>
        )
    }
}
