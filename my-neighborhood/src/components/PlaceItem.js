import React, {Component} from "react";

export default class PlaceItem extends Component {
    render() {
        return (
             <div>
                {this.props.place.venue.name}
            </div>


        )
    }
}
