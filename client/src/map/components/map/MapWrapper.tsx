import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import './MapWrapper.scss';
import 'leaflet/dist/leaflet.css';
import { MarkerCoordinates } from '../../../shared/models/map';
import MarkerList from '../marker-list/MarkerList';
import { SportEvent } from '../../../shared/models/sport-event';
import SportEventTile from '../sport-event-tile/SportEventTile';
import { JELENIA_COORDINATES, DEFAULT_ZOOM, SINGLE_MARKER_PREVIEW_ZOOM, MAX_ZOOM, MIN_ZOOM } from '../../map-config';

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
    selectedEvent: SportEvent | null,
}

export default class MapWrapper extends React.Component<MapWrapperProps, MapWrapperState> {
    private mapRef: Map | null;

    constructor(props: MapWrapperProps) {
        super(props);
        this.mapRef = null;
        this.state = {
            mapPosition: { lat: 0, lng: 0 },
            zoom: 0,
            markerPosition: { lat: 0, lng: 0 },
            selectedEvent: null
        };

        this.handleEventSelected = this.handleEventSelected.bind(this);
        this.handleEventCloseClick = this.handleEventCloseClick.bind(this);
    }

    componentDidMount() {
        this.setState({
            mapPosition: JELENIA_COORDINATES,
            zoom: DEFAULT_ZOOM,
            markerPosition: JELENIA_COORDINATES,
        });
    }

    handleEventSelected(sportEvent: SportEvent): void {
        this.setState({ 
            selectedEvent: sportEvent,
            mapPosition: sportEvent.coordinates,
            zoom: SINGLE_MARKER_PREVIEW_ZOOM
        });
    }

    handleEventCloseClick(): void {
        this.mapRef?.leafletElement.closePopup();
        this.setState({
            selectedEvent: null,
            zoom: DEFAULT_ZOOM
        });
    }

    render() {
        const title = 'Wybierz zawody na mapie i sprawdź szczegóły';

        return <div className="map-wrapper wrapper">
            <h2>{ title }</h2>
            <div className="wrapper__row">
                <Map maxZoom={MAX_ZOOM} minZoom={MIN_ZOOM} ref={(ref: Map) => this.mapRef = ref } center={this.state.mapPosition} zoom={this.state.zoom} className={this.state.selectedEvent ? 'map map--mini' : 'map'}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <MarkerList onEventSelected={this.handleEventSelected} />
                </Map>
                { this.state.selectedEvent ? <SportEventTile closeClick={this.handleEventCloseClick} sportEvent={this.state.selectedEvent} /> : null }
            </div>
        </div>;
    }
}