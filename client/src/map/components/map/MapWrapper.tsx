import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import './MapWrapper.css';
import 'leaflet/dist/leaflet.css';


export default class MapWrapper extends React.Component {
    state = {
        lat: 50.881066,
        lng: 15.713790,
        zoom: 11,
      }

    render() {
        const position = { lat: this.state.lat, lng: this.state.lng };
        return <div className="map-wrapper">
            <h2>Map</h2>
            <Map center={position} zoom={this.state.zoom}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            </Map>
        </div>;
    }
    
}
