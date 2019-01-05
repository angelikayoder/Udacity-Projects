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
                    autoFocus value={window.query || ''}
                    onChange={this.updateQuery}
                    aria-label="Search Box"
                />
                <Places places={this.props.places} />
            </div>
        )
    }
}
