import React from 'react';
import { MarkerCoordinates } from '../../../shared/models/map';
import EventAddedInfo from '../event-added-info/EventAddedInfo';
import { NewEventMarker } from '../new-event-marker';
import { Map, TileLayer } from 'react-leaflet';
import { SportEvent } from '../../../shared/models/sport-event';
import { eventApis } from '../../../core/services';
import { Redirect } from 'react-router-dom';
import AddEventForm from '../add-event-form/AddEventForm';
import { JELENIA_COORDINATES, DEFAULT_ZOOM, SINGLE_MARKER_ZOOM } from '../../map-config';
import './AddEventWrapper.scss';
import { ApplicationState } from '../../../state/ducks';
import { saveEditedEvent } from '../../../state/ducks/map/actions';
import { connect } from 'react-redux';

type AddEventWrapperProps = {
    selectedEvent?: SportEvent | null;
    saveEditedEvent: (event: SportEvent) => void;
}

type AddEventWrapperState = {
    mapCoordinates: MarkerCoordinates;
    isAddedEvent: boolean;
    addEvent: boolean;
    markerPosition: MarkerCoordinates;
    zoom: number;
}
class AddEventWrapper extends React.Component<AddEventWrapperProps, AddEventWrapperState> {
    constructor(props: AddEventWrapperProps) {
        super(props);
        this.state = {
            mapCoordinates: JELENIA_COORDINATES,
            markerPosition: JELENIA_COORDINATES,
            isAddedEvent: false,
            addEvent: true,
            zoom: DEFAULT_ZOOM
        };

        this.handleSuggestionChange = this.handleSuggestionChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleNewSportEventDragEnd = this.handleNewSportEventDragEnd.bind(this);
        this.handleAddAnotherSportEventClick = this.handleAddAnotherSportEventClick.bind(this);
        this.handleBackToMapClick = this.handleBackToMapClick.bind(this);
        this.handleAddEventCloseClick = this.handleAddEventCloseClick.bind(this);
    }

    componentDidMount(): void {
        if (this.props.selectedEvent) {
            this.handleInitialData();
        }
    }

    handleInitialData(): void {
        this.setState({
            markerPosition: this.props.selectedEvent?.coordinates as MarkerCoordinates
        })
    }

    handleSuggestionChange(coords: MarkerCoordinates): void {
        this.setState({
            mapCoordinates: coords,
            markerPosition: {
                lat: coords.lat,
                lng: coords.lng
            },
            zoom: SINGLE_MARKER_ZOOM,
        });
    }

    handleFormSubmit(sportEvent: SportEvent): void {
        if (this.props.selectedEvent) {
            this.props.saveEditedEvent({...sportEvent, _id: this.props.selectedEvent._id, coordinates: this.state.markerPosition });
            return;
        }
    
        eventApis.insertEvent({
            ...sportEvent,
            coordinates: this.state.markerPosition
        })
        .then(() => {
            this.setState({ isAddedEvent: true });
        })
    }

    handleNewSportEventDragEnd(markerPosition: MarkerCoordinates): void {
        this.setState({ markerPosition });
    }

    handleBackToMapClick(): void {
        this.setState({ addEvent: false, isAddedEvent: false });
    }

    handleAddAnotherSportEventClick(): void {
        this.setState({ isAddedEvent: false });
    }

    handleAddEventCloseClick(): void {
        this.setState({ addEvent: false });
    }

    render(): JSX.Element {
        return <div className="map-wrapper wrapper">
            <h2>Wybierz miejsce na mapie i zgłoś zawody</h2>
            <div className="wrapper__row">
                <Map center={this.state.mapCoordinates} zoom={this.state.zoom} className="mini-map">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <NewEventMarker draggable={!this.state.isAddedEvent} onDragEnd={this.handleNewSportEventDragEnd} position={this.state.markerPosition} />
                </Map>
                { this.state.isAddedEvent ? <EventAddedInfo onAddSportEventClick={this.handleAddAnotherSportEventClick} onBackToMapClick={this.handleBackToMapClick} /> : (this.state.addEvent ? <AddEventForm initialData={this.props.selectedEvent} onCloseClick={this.handleAddEventCloseClick} onFormSubmit={this.handleFormSubmit} onSuggetionChange={this.handleSuggestionChange} /> : <Redirect to='/' />) }
            </div>
        </div>;
    }
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        selectedEvent: state.map.selectedEvent,
    };
}

export default connect(mapStateToProps, { saveEditedEvent })(AddEventWrapper);