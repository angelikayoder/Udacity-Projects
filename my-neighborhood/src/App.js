import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
// import Marker from './components/Marker';
import Sidebar from './components/Sidebar';
import * as PlacesAPI from './PlacesAPI'

class App extends Component {
    state = {
        places: []
    }
    componentDidMount() {
        PlacesAPI.getPlaces().then(places => {
            this.setState({places: places})
        })
    }
  render() {
    return (
      <div className="App">
        <Sidebar
            places = {this.state.places}
        />
        <Map places = {this.state.places} />
      </div>
    );
  }
}

export default App;
