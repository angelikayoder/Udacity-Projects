import React, {Component} from "react";
import Places from '../components/Places';

export default class Sidebar extends Component {


    render() {

        return (
            <div className="sidebar">
                <input type={"search"} id={"searchbox"} placeholder={"Search Places"}/>
                <Places
                    places = {this.props.places}
                    onClickHandler = {this.props.onClickHandler}
                />
            </div>
        )
    }
}
