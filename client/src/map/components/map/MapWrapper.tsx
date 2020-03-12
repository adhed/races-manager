import React from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import './MapWrapper.scss';
import 'leaflet/dist/leaflet.css';
import AddEventForm from '../add-event-form/AddEventForm';
import { MarkerCoordinates } from '../../../shared/models/map';
import MarkerList from '../marker-list/MarkerList';
import { LeafletEvent } from 'leaflet';
import { eventApis } from '../../../core/services';
import { SportEvent } from '../../../shared/models/sport-event';

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

type MapWrapperState = {
    lat: number,
    lng: number,
    zoom: number,
    markerPosition: MarkerCoordinates
}

export default class MapWrapper extends React.Component<MapWrapperProps, MapWrapperState> {
    constructor(props: MapWrapperProps) {
        super(props);
        this.state = {
            lat: 0,
            lng: 0,
            zoom: 0,
            markerPosition: { lat: 0, lng: 0 }
        };

        this.handleSuggestionChange = this.handleSuggestionChange.bind(this);
        this.handleMarkerDragEnd = this.handleMarkerDragEnd.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidMount() {
        const lat = 50.881066;
        const lng = 15.713790;

        this.setState({
            lat,
            lng,
            zoom: 11,
            markerPosition: {
                lat, lng
            }
        });
    }

    handleSuggestionChange(coords: MarkerCoordinates): void {
        console.log('suugestion', coords);

        this.setState({
            lat: coords.lat,
            lng: coords.lng,
            markerPosition: {
                lat: coords.lat,
                lng: coords.lng
            }
        });
    }

    handleMarkerDragEnd(event: LeafletEvent): void {
        console.log('dragend', event);

        this.setState({
            markerPosition: {
                lat: event.target.lat,
                lng: event.target.lng,
            }
        });
    }

    handleFormSubmit(sportEvent: SportEvent): void {
        eventApis.insertEvent({
            ...sportEvent,
            coordinates: this.state.markerPosition
        })
        .then(() => {
            window.location.pathname = '/';
        })
    }

    render() {
        const position = { lat: this.state.lat, lng: this.state.lng };
        const title = this.props.addEvent ? 'Wybierz miejsce na mapie i zgłoś zawody' : 'Wybierz zawody na mapie i sprawdź szczegóły';

        return <div className="map-wrapper wrapper">
            <h2>{ title }</h2>
            <div className="wrapper__row">
                <Map center={position} zoom={this.state.zoom} className={this.props.addEvent ? 'map map--half' : 'map'}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    { this.props.addEvent ? <Marker position={this.state.markerPosition} draggable={true} /> : <MarkerList />}
                </Map>
                { this.props.addEvent ? <AddEventForm onFormSubmit={this.handleFormSubmit} onSuggetionChange={this.handleSuggestionChange} /> : null}
            </div>
        </div>;
    }
    
}
