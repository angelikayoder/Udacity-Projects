import React, {Component} from "react";
import { Marker } from 'react-google-maps';
import EventBus from 'eventbusjs';

export default class MyMarker extends Marker {
    onDomReady() {
        this.onPlaceSelected = this.onPlaceSelected.bind(this)
        EventBus.addEventListener('PLACE_SELECTED', this.onPlaceSelected)
    }

    onPlaceSelected(e) {
        console.log('place', e.target)
    }
}
