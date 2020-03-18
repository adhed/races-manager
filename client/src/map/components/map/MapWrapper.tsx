import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import './MapWrapper.scss';
import 'leaflet/dist/leaflet.css';
import { MarkerCoordinates, JELENIA_COORDINATES, DEFAULT_ZOOM } from '../../../shared/models/map';
import MarkerList from '../marker-list/MarkerList';

const L = require("leaflet");

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

type MapWrapperProps = {}

type MapWrapperState = {
    mapPosition: MarkerCoordinates,
    markerPosition: MarkerCoordinates,
    zoom: number,
    isAddedEvent: boolean,
}

export default class MapWrapper extends React.Component<MapWrapperProps, MapWrapperState> {
    constructor(props: MapWrapperProps) {
        super(props);
        this.state = {
            mapPosition: { lat: 0, lng: 0 },
            zoom: 0,
            markerPosition: { lat: 0, lng: 0 },
            isAddedEvent: false
        };
    }

    componentDidMount() {
        this.setState({
            mapPosition: JELENIA_COORDINATES,
            zoom: DEFAULT_ZOOM,
            markerPosition: JELENIA_COORDINATES,
            isAddedEvent: false
        });
    }

    

    render() {
        const title = 'Wybierz zawody na mapie i sprawdź szczegóły';

        return <div className="map-wrapper wrapper">
            <h2>{ title }</h2>
            <div className="wrapper__row">
                <Map center={this.state.mapPosition} zoom={this.state.zoom} className="map">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <MarkerList />
                </Map>
            </div>
        </div>;
    }
    
}
