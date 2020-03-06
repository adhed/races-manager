import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import './MapWrapper.css';
import 'leaflet/dist/leaflet.css';

const L = require("leaflet");

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default class MapWrapper extends React.Component {
    

    state = {
        lat: 50.881066,
        lng: 15.713790,
        zoom: 11,
      }

    render() {
        const position = { lat: this.state.lat, lng: this.state.lng };
        return <div className="map-wrapper">
            <h2>Wybierz zawody na mapie i sprawdź szczegóły</h2>
            <Map center={position} zoom={this.state.zoom}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            <Marker position={position} draggable={true}>
                <Popup>
                    Tu mieszka Julek.
                </Popup>
            </Marker>
            </Map>
        </div>;
    }
    
}
