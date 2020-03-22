import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import './MapWrapper.scss';
import 'leaflet/dist/leaflet.css';
import { MarkerCoordinates } from '../../../shared/models/map';
import MarkerList from '../marker-list/MarkerList';
import { SportEvent } from '../../../shared/models/sport-event';
import SportEventTile from '../sport-event-tile/SportEventTile';
import { JELENIA_COORDINATES, DEFAULT_ZOOM, SINGLE_MARKER_PREVIEW_ZOOM, MAX_ZOOM, MIN_ZOOM } from '../../map-config';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../state/ducks';
import { fetchSportEvents, removeSportEvent } from '../../../state/ducks/sport-event/actions';
import { selectEvent } from '../../../state/ducks/map/actions';

const L = require("leaflet");

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

type MapWrapperProps = {
    fetchSportEvents: () => void,
    removeSportEvent: (id: string) => void;
    selectEvent: (sportEvent: SportEvent | null) => void;
    sportEvents: SportEvent[],
    selectedEvent: SportEvent | null,
}

type MapWrapperState = {
    mapPosition: MarkerCoordinates,
    markerPosition: MarkerCoordinates,
    zoom: number,
}

class MapWrapper extends React.Component<MapWrapperProps, MapWrapperState> {
    private mapRef: Map | null;

    constructor(props: MapWrapperProps) {
        super(props);
        this.mapRef = null;

        this.state = {
            mapPosition: { lat: 0, lng: 0 },
            zoom: 0,
            markerPosition: { lat: 0, lng: 0 },
        };

        this.handleEventSelected = this.handleEventSelected.bind(this);
        this.handleEventCloseClick = this.handleEventCloseClick.bind(this);
        this.handleEventRemoveClick = this.handleEventRemoveClick.bind(this);
    }

    componentDidMount() {
        this.setState({
            mapPosition: JELENIA_COORDINATES,
            zoom: DEFAULT_ZOOM,
            markerPosition: JELENIA_COORDINATES,
        });

        this.props.fetchSportEvents();
    }

    handleEventSelected(sportEvent: SportEvent): void {
        this.props.selectEvent(sportEvent);
        this.setState({ 
            mapPosition: sportEvent.coordinates,
            zoom: SINGLE_MARKER_PREVIEW_ZOOM
        });
    }

    handleEventCloseClick(): void {
        this.props.selectEvent(null);
        this.restoreDefaultMap();
    }

    handleEventRemoveClick(): void {
        if (this.props.selectedEvent?._id) {
            this.props.removeSportEvent(this.props.selectedEvent?._id);
            this.restoreDefaultMap();
        }
    }

    restoreDefaultMap(): void {
        this.setState({
            zoom: DEFAULT_ZOOM
        });
        this.mapRef?.leafletElement.closePopup();
    }

    render() {
        const title = 'Wybierz zawody na mapie i sprawdź szczegóły';

        return <div className="map-wrapper wrapper">
            <h2>{ title }</h2>
            <div className="wrapper__row">
                <Map maxZoom={MAX_ZOOM} minZoom={MIN_ZOOM} ref={(ref: Map) => this.mapRef = ref } center={this.state.mapPosition} zoom={this.state.zoom} className={this.props.selectedEvent ? 'map map--mini' : 'map'}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <MarkerList sportEvents={this.props.sportEvents} onEventSelected={this.handleEventSelected} />
                </Map>
                { this.props.selectedEvent ? <SportEventTile removeClick={this.handleEventRemoveClick} closeClick={this.handleEventCloseClick} sportEvent={this.props.selectedEvent} /> : null }
            </div>
        </div>;
    }
}

function mapStateToProps(state: ApplicationState) {
    const { sportEvent, map } = state;
    return { sportEvents: sportEvent.data, selectedEvent: map.selectedEvent };
}
export default connect(mapStateToProps, { fetchSportEvents, removeSportEvent, selectEvent })(MapWrapper)
