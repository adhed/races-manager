import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { MarkerCoordinates } from '../../../shared/models/map';
import EventAddedInfo from '../event-added-info/EventAddedInfo';
import { NewEventMarker } from '../new-event-marker';
import { SportEvent } from '../../../shared/models/sport-event';
import AddEventForm from '../add-event-form/AddEventForm';
import './AddEventWrapper.scss';
import { ApplicationState } from '../../../state/ducks';
import { saveEditedEvent, backToMap, backToAddEvent, suggestionChange } from '../../../state/ducks/map/actions';
import { addEvent } from '../../../state/ducks/sport-event/actions';
import { MAP_ATTRIBUTION } from '../../map-config';

export enum EventFormType {
    Add = 'add',
    Edit = 'edit',
    EventAdded = 'event-added'
}

type AddEventWrapperProps = {
    selectedEvent: SportEvent | null;
    isAdmin: boolean;
    zoom: number;
    mapPosition: MarkerCoordinates;
    mode: EventFormType;
    saveEditedEvent: (event: SportEvent) => void;
    addEvent: (event: SportEvent) => void;
    backToMap: () => void;
    backToAddEvent: () => void;
    suggestionChange: (coords: MarkerCoordinates) => void;
}

type AddEventWrapperState = {
    markerPosition: MarkerCoordinates;
}

class AddEventWrapper extends React.Component<AddEventWrapperProps, AddEventWrapperState> {
    private get initialFormData(): SportEvent | null {
        return this.isEditMode ? this.props.selectedEvent : null;
    }

    private get isEditMode(): boolean {
        return this.props.mode === EventFormType.Edit;
    }

    private get isEventAddedMode(): boolean {
        return this.props.mode === EventFormType.EventAdded;
    }

    constructor(props: AddEventWrapperProps) {
        super(props);
        this.state = {
            markerPosition: props.mapPosition,
        };

        this.handleSuggestionChange = this.handleSuggestionChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleNewSportEventDragEnd = this.handleNewSportEventDragEnd.bind(this);
        this.handleAddAnotherSportEventClick = this.handleAddAnotherSportEventClick.bind(this);
        this.handleBackToMapClick = this.handleBackToMapClick.bind(this);
        this.handleAddEventCloseClick = this.handleAddEventCloseClick.bind(this);
    }

    componentDidMount(): void {
        if (this.isEditMode) {
            this.handleInitialData();
        }
    }

    handleInitialData(): void {
        if (!this.props.selectedEvent) {
            return;
        }
    
        this.setState({
            markerPosition: this.props.selectedEvent?.coordinates as MarkerCoordinates,
        });
    }

    handleSuggestionChange(coords: MarkerCoordinates): void {
        this.props.suggestionChange(coords);

        this.setState({
            markerPosition: {
                lat: coords.lat,
                lng: coords.lng
            },
        });
    }

    handleFormSubmit(sportEvent: SportEvent): void {
        if (this.isEditMode) {
            this.props.saveEditedEvent({...sportEvent, _id: this.props.selectedEvent?._id, coordinates: this.state.markerPosition });
            return;
        }
    
        this.props.addEvent({
            ...sportEvent,
            coordinates: this.state.markerPosition
        });
    }

    handleNewSportEventDragEnd(markerPosition: MarkerCoordinates): void {
        this.setState({ markerPosition });
    }

    handleBackToMapClick(): void {
        this.props.backToMap();
    }

    handleAddAnotherSportEventClick(): void {
        this.props.backToAddEvent();
    }

    handleAddEventCloseClick(): void {
        this.props.backToMap();
    }

    render(): JSX.Element {
        const isEditWithoutSelectedEvent = this.isEditMode && !this.props.selectedEvent;

        if (isEditWithoutSelectedEvent) {
            return <Redirect to='/add-event' />;
        }
    
        return <div className="map-wrapper wrapper">
            <h2>Wybierz miejsce na mapie i zgłoś zawody</h2>
            <div className="wrapper__row">
                <Map center={this.props.mapPosition} zoom={this.props.zoom} className="mini-map">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution={MAP_ATTRIBUTION} />
                    <NewEventMarker draggable={!this.isEventAddedMode} onDragEnd={this.handleNewSportEventDragEnd} position={this.state.markerPosition} />
                </Map>
                { this.isEventAddedMode ? <EventAddedInfo isAdmin={this.props.isAdmin} onAddSportEventClick={this.handleAddAnotherSportEventClick} onBackToMapClick={this.handleBackToMapClick} /> : <AddEventForm initialData={this.initialFormData} onCloseClick={this.handleAddEventCloseClick} onFormSubmit={this.handleFormSubmit} onSuggetionChange={this.handleSuggestionChange} /> }
            </div>
        </div>;
    }
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        selectedEvent: state.map.selectedEvent,
        mapPosition: state.map.mapPosition,
        zoom: state.map.zoom,
        isAdmin: state.account.details?.isAdmin,
    };
}

export default connect(mapStateToProps, { saveEditedEvent, addEvent, backToMap, backToAddEvent, suggestionChange })(AddEventWrapper);