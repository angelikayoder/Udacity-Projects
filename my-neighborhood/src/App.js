import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import * as PlacesAPI from './PlacesAPI'
import EventBus from 'eventbusjs';
import ErrorBoundary from './components/ErrorBoundary';

window.selectedPlace = null;

window.isSelected = function(place) {
    return window.selectedPlace && place && (window.selectedPlace.id === place.id)
}

window.query = null;

export default class App extends Component {
    state = {
        places: [],
        selectedPlace: null,
        query: null
    }

    componentDidMount() {
        PlacesAPI.getPlaces().then(places => {
            this.setState({places: places})
        })

        this.onPlaceSelected = this.onPlaceSelected.bind(this)
        EventBus.addEventListener('PLACE_SELECTED', this.onPlaceSelected)

        this.onQueryChange = this.onQueryChange.bind(this)
        EventBus.addEventListener('QUERY_CHANGED', this.onQueryChange)
    }

    onPlaceSelected(e) {
        let place = e.target

        window.selectedPlace = place

        // Set state to force a re-reneder of the App
        this.setState({ selectedPlace: place })
    }

    onQueryChange(e) {
        let query = e.target

        window.query = query

        PlacesAPI.getPlaces(query).then(places => {
            this.setState({
                query: query,
                places: places
            })
        })
    }

    render() {
        return (
            <div className="App" role="main">
                <ErrorBoundary message="Foursquare API is down!">
                    <Sidebar places = {this.state.places} />
                </ErrorBoundary>
                <ErrorBoundary message="Google Maps API is down!">
                    <Map places = {this.state.places} />
                </ErrorBoundary>
            </div>
        );
    }
}
