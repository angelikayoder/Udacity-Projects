import React, {Component} from "react";
import PlaceItem from '../components/PlaceItem';
import Marker from '../components/Marker';
// import * as PlacesAPI from '../PlacesAPI'

export default class Places extends Component {
    render() {
        return (
            <ul className="places">
            {
                this.props.places.map(place => (
                    <li className="placeitem" key={place.id}>
                    <PlaceItem
                        place = {place}
                    />
                    <Marker place = {place} />
                    </li>
                ))
            }
            </ul>
        )
    }
}
