import React, {Component} from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 41.8506, lng: -87.7937 }}
  >
    {
        props.places.map(place => {
            return (
                <Marker
                    key = {place.id}
                    position = {{
                        lat: place.venue.location.lat,
                        lng: place.venue.location.lng
                    }}
                />
            )
      })
    }
  </GoogleMap>
))



export default class Map extends Component {
    render() {
        console.log(this.props.places)
        return (
            <MyMapComponent
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAtcWBXNw50hUEw4K6wD5ZuV9JTUGduDoI"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%`, width: '70%' }} />}
              mapElement={<div style={{ height: `100%` }} />}
              places={this.props.places}
            />
        );
    }
}
