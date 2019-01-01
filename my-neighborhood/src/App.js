import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import * as PlacesAPI from './PlacesAPI'
import EventBus from 'eventbusjs';

window.selectedPlace = null;

window.isSelected = function(place) {
    return window.selectedPlace && place && (window.selectedPlace.id === place.id)
}

export default class App extends Component {
    state = {
        places: [],
        selectedPlace: null
    }

    componentDidMount() {
        PlacesAPI.getPlaces().then(places => {
            this.setState({places: places})
        })

        this.onPlaceSelected = this.onPlaceSelected.bind(this)
        EventBus.addEventListener('PLACE_SELECTED', this.onPlaceSelected)
    }

    onPlaceSelected(e) {
        let place = e.target

        window.selectedPlace = place

        // Set state to force a re-reneder of the App
        this.setState({ selectedPlace: place })
    }

    render() {
        return (
          <div className="App">
            <Sidebar places = {this.state.places} />
            <Map places = {this.state.places} />
          </div>
        );
    }
}
