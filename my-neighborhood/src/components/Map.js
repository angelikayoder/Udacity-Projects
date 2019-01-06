import React, {Component} from 'react';
import { compose } from 'recompose';
import EventBus from 'eventbusjs';

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";

const MyMapComponent = compose(
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 41.8506, lng: -87.7937 }}
    >
        {
            props.places.map(place => {
                let position = {
                    lat: place.venue.location.lat,
                    lng: place.venue.location.lng
                }

                let isSelected = window.isSelected(place)
                let animation = isSelected ? window.google.maps.Animation.BOUNCE : null

                function onClickHandler() {
                    EventBus.dispatch("PLACE_SELECTED", place)
                }

                function onCloseClickHandler() {
                    EventBus.dispatch("PLACE_SELECTED", null)
                }

                return (
                    <Marker
                        key = {place.id}
                        position = {position}
                        title = {place.venue.name}
                        animation = {animation}
                        onClick = {onClickHandler}
                        tabIndex="0" 
                    >
                    {
                        isSelected &&
                            <InfoWindow onCloseClick = {onCloseClickHandler}>
                                <div aria-label={"Description of " + place.venue.name}>
                                    <h3>{place.venue.name}</h3>
                                    <address>
                                    {place.venue.location.formattedAddress[0]}
                                    {place.venue.location.formattedAddress[1]}
                                    {place.venue.location.formattedAddress[2]}
                                    </address>
                                    {
                                        place.photo && <img src={place.photo.prefix + '200x200' + place.photo.suffix} alt={place.venue.name} title={place.venue.name} />
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
    render() {
        const apiKey = 'AIzaSyAtcWBXNw50hUEw4K6wD5ZuV9JTUGduDoI'
        const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${apiKey}`

        return (
            <MyMapComponent
                googleMapURL={googleMapURL}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%`, width: '70%' }} />}
                mapElement={<div style={{ height: `100%` }} />}
                places={this.props.places}
            />
        );
    }
}
