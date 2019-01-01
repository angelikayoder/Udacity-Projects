import React, {Component} from "react";
import PlaceItem from '../components/PlaceItem';


export default class Places extends Component {
    render() {
        return (
            <ul className="places">
            {
                this.props.places.map(place => (
                    <li className="placeitem" key={place.id}>
                        <PlaceItem
                            place = {place}
                            onClickHandler = {this.props.onClickHandler}
                        />
                    </li>
                ))
            }
            </ul>
        )
    }
}
