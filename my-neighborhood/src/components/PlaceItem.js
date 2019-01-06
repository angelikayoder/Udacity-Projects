import React, {Component} from "react";
import EventBus from 'eventbusjs';

export default class PlaceItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSelected: window.isSelected(props.place)
        }

        this.onPlaceSelected = this.onPlaceSelected.bind(this)
    }

    onPlaceSelected() {
        EventBus.dispatch("PLACE_SELECTED", this.props.place);
    }

    render() {
        const name = this.props.place.venue.name;

        return (
            <div
                className={this.state.isSelected ? 'place selected' : 'place'}
                onClick={this.onPlaceSelected}
                aria-label={"Learn more about " + name}
                tabIndex="0"
                role="contentinfo"
            >
                {name}
            </div>


        )
    }
}
