import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import './MapWrapper.scss';
import 'leaflet/dist/leaflet.css';
import AddEventForm from '../add-event-form/AddEventForm';

const L = require("leaflet");

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

type MapWrapperProps = {
    addEvent?: boolean,
}

export default class MapWrapper extends React.Component<MapWrapperProps> {
    state = {
        lat: 50.881066,
        lng: 15.713790,
        zoom: 11,
      }

    render() {
        const position = { lat: this.state.lat, lng: this.state.lng };
        const title = this.props.addEvent ? 'Wybierz miejsce na mapie i zgłoś zawody' : 'Wybierz zawody na mapie i sprawdź szczegóły';

        return <div className="map-wrapper wrapper">
            <h2>{ title }</h2>
            <div className="wrapper__row">
                <Map center={position} zoom={this.state.zoom} className={this.props.addEvent ? 'map map--half' : 'map'}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    <Marker position={position} draggable={this.props.addEvent}>
                        <Popup>
                            Tu mieszka Julek.
                        </Popup>
                    </Marker>
                </Map>
                { this.props.addEvent ? <AddEventForm /> : null}
            </div>
        </div>;
    }
    
}
