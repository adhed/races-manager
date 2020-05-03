import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';

import './MapWrapper.scss';
import 'leaflet/dist/leaflet.css';
import { MarkerCoordinates } from '../../../shared/models/map';
import MarkerList from '../marker-list/MarkerList';
import { SportEvent } from '../../../shared/models/sport-event';
import SportEventTile from '../sport-event-tile/SportEventTile';
import { JELENIA_COORDINATES, DEFAULT_ZOOM, MAX_ZOOM, MIN_ZOOM } from '../../map-config';
import { ApplicationState } from '../../../state/ducks';
import { fetchSportEvents, removeSportEvent } from '../../../state/ducks/sport-event/actions';
import { selectEvent, setZoom, setMapPosition, editEvent } from '../../../state/ducks/map/actions';
import { addEventToFavourites, removeEventFromFavourites } from '../../../state/ducks/account/actions';
import { getSelectedEvent } from '../../../state/ducks/account/selectors';

const L = require("leaflet");

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

type MapWrapperProps = {
    removeEventFromFavourites: (id: string) => void,
    addEventToFavourites: (id: string) => void,
    fetchSportEvents: () => void,
    removeSportEvent: (id: string) => void;
    editEvent: () => void;
    selectEvent: (sportEvent: SportEvent | null) => void;
    setZoom: (zoom: number) => void;
    setMapPosition: (mapPosition: MarkerCoordinates) => void;
    sportEvents: SportEvent[],
    selectedEvent: SportEvent | null,
    mapPosition: MarkerCoordinates,
    zoom: number,
    isLogggedIn: boolean;
}

type MapWrapperState = {
    markerPosition: MarkerCoordinates,
}

class MapWrapper extends React.Component<MapWrapperProps, MapWrapperState> {
    private mapRef: Map | null;

    constructor(props: MapWrapperProps) {
        super(props);
        this.mapRef = null;

        this.state = {
            markerPosition: { lat: 0, lng: 0 },
        };

        this.handleEventSelected = this.handleEventSelected.bind(this);
        this.handleEventCloseClick = this.handleEventCloseClick.bind(this);
        this.handleEventRemoveClick = this.handleEventRemoveClick.bind(this);
        this.handleEventEditClick = this.handleEventEditClick.bind(this);
        this.handleAddToFavouritesClick = this.handleAddToFavouritesClick.bind(this);
    }

    componentDidMount() {
        this.setState({
            markerPosition: JELENIA_COORDINATES,
        });

        this.props.fetchSportEvents();
    }

    handleEventSelected(sportEvent: SportEvent): void {
        this.props.selectEvent(sportEvent);
    }

    handleEventCloseClick(): void {
        this.props.selectEvent(null);
        this.restoreDefaultMap();
    }

    handleEventEditClick(): void {
        this.props.editEvent();
    }

    handleAddToFavouritesClick(): void {
        if (!this.props.selectedEvent?._id) {
            return;
        }
        
        if (this.props.selectedEvent?.isFavourite) {
            this.props.removeEventFromFavourites(this.props.selectedEvent?._id);
        } else {
            this.props.addEventToFavourites(this.props.selectedEvent?._id);
        }
    }

    handleEventRemoveClick(): void {
        const result = window.confirm('Czy na pewno chcesz usunąć te zawody?');

        if (!result || !this.props.selectedEvent?._id) {
            return;
        }
    
        this.props.removeSportEvent(this.props.selectedEvent?._id);
        this.restoreDefaultMap();
    }

    restoreDefaultMap(): void {
        this.props.setZoom(DEFAULT_ZOOM);
        this.mapRef?.leafletElement.closePopup();
    }

    render() {
        const title = 'Wybierz zawody na mapie i sprawdź szczegóły';

        return <div className="map-wrapper wrapper">
            <h2>{ title }</h2>
            <div className="wrapper__row">
                <Map maxZoom={MAX_ZOOM} minZoom={MIN_ZOOM} ref={(ref: Map) => this.mapRef = ref } center={this.props.mapPosition} zoom={this.props.zoom} className={this.props.selectedEvent ? 'map map--mini' : 'map'}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <MarkerList selectedEvent={this.props.selectedEvent} sportEvents={this.props.sportEvents} onEventSelected={this.handleEventSelected} />
                </Map>
                { this.props.selectedEvent ? <SportEventTile isLogggedIn={this.props.isLogggedIn} addToFavouritesClick={this.handleAddToFavouritesClick} editClick={this.handleEventEditClick} removeClick={this.handleEventRemoveClick} closeClick={this.handleEventCloseClick} sportEvent={this.props.selectedEvent} /> : null }
            </div>
        </div>;
    }
}

function mapStateToProps(state: ApplicationState) {
    const { account, sportEvent, map } = state;
    return {
        sportEvents: sportEvent.data.map((event) => getSelectedEvent(event, account.favouriteEvents)) as SportEvent[],
        selectedEvent: getSelectedEvent(map.selectedEvent, account.favouriteEvents),
        zoom: map.zoom,
        mapPosition: map.mapPosition,
        isLogggedIn: account.isLoggedIn,
    };
}
export default connect(mapStateToProps, { removeEventFromFavourites, addEventToFavourites, fetchSportEvents, removeSportEvent, selectEvent, setMapPosition, editEvent, setZoom })(MapWrapper);
