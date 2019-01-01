import React, {Component} from 'react';
import { compose, withState } from 'recompose';
// import MyMarker from './MyMarker'
import EventBus from 'eventbusjs';

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";

const MyMapComponent = compose(
    withState('place', 'setPlace', null),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 41.8506, lng: -87.7937 }}
    >
        {
            props.places.map(place => {
                const position = {
                    lat: place.venue.location.lat,
                    lng: place.venue.location.lng
                }

                return (
                    <Marker
                        key = {place.id}
                        position = {position}
                        title = {place.venue.name}
                        animation = {window.google.maps.Animation.DROP}
                        isSelected = {props.selectedPlace && (place.id === props.selectedPlace.id) ? true : false}
                        onClick = {() => {
                            console.log(place)
                            if (props.place) {
                                if (props.place === place) {
                                    props.setPlace(null)
                                } else {
                                    props.setPlace(place)
                                }
                            } else {
                                props.setPlace(place)
                            }
                        }}

                    >
                    {
                        place === props.place &&
                            <InfoWindow onCloseClick = {() => props.setPlace(null)}>
                                <div>
                                    <h1>{place.venue.name}</h1>
                                    <address>
                                    {place.venue.location.formattedAddress[0]}
                                    {place.venue.location.formattedAddress[1]}
                                    {place.venue.location.formattedAddress[2]}
                                    </address>
                                    {
                                        place.photo && <img src={place.photo.prefix + '300x300' + place.photo.suffix} alt={place.venue.name} title={place.venue.name} />
                                    }
                                </div>
                            </InfoWindow>
                    }
                    </Marker>
                )
          })
        }
    </GoogleMap>
)



export default class Map extends Component {
    state = {
        selectedPlace: null
    }

    constructor(props) {
        super(props);

        this.onPlaceSelected = this.onPlaceSelected.bind(this);

        EventBus.addEventListener("PLACE_SELECTED", this.onPlaceSelected);
    }

    onPlaceSelected(e) {
        // console.log('Map', e.target)
        this.setState({ selectedPlace: e.target })
    }

    render() {
        // console.log(this.props.places)
        return (
            <MyMapComponent
              isMarkerShown 
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAtcWBXNw50hUEw4K6wD5ZuV9JTUGduDoI"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%`, width: '70%' }} />}
              mapElement={<div style={{ height: `100%` }} />}
              places={this.props.places}
              place={this.state.selectedPlace}
            />
        );
    }
}
