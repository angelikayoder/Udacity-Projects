import React, {Component} from "react";
import EventBus from 'eventbusjs';

export default class PlaceItem extends Component {
    state = {
        isSelected: false,
        isMarkerShown: false
    }

    constructor(props) {
        super(props);

        // Bind `this` to event listening function
        this.onPlaceSelected = this.onPlaceSelected.bind(this)
    }

    onPlaceSelected() {
        this.setState({ isSelected: true }) 
        EventBus.dispatch("PLACE_SELECTED", this.props.place);
    }

    render() {
        const name = this.props.place.venue.name;

        return (
            <div className={this.state.isSelected ? 'place selected' : 'place'} onClick={this.onPlaceSelected}>
                {name}
            </div>


        )
    }
}
