import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { MarkerCoordinates } from '../../../shared/models/map';
import EventAddedInfo from '../event-added-info/EventAddedInfo';
import { NewEventMarker } from '../new-event-marker';
import { SportEvent } from '../../../shared/models/sport-event';
import { eventApis } from '../../../core/services';
import AddEventForm from '../add-event-form/AddEventForm';
import { JELENIA_COORDINATES, DEFAULT_ZOOM, SINGLE_MARKER_ZOOM } from '../../map-config';
import './AddEventWrapper.scss';
import { ApplicationState } from '../../../state/ducks';
import { saveEditedEvent } from '../../../state/ducks/map/actions';

export enum EventFormType {
    Add = 'add',
    Edit = 'edit',
}

type AddEventWrapperProps = {
    selectedEvent: SportEvent | null;
    saveEditedEvent: (event: SportEvent) => void;
    mode: EventFormType;
}

type AddEventWrapperState = {
    mapCoordinates: MarkerCoordinates;
    isAddedEvent: boolean;
    addEvent: boolean;
    markerPosition: MarkerCoordinates;
    zoom: number;
}
class AddEventWrapper extends React.Component<AddEventWrapperProps, AddEventWrapperState> {
    private get initialFormData(): SportEvent | null {
        return this.isEditMode ? this.props.selectedEvent : null;
    }

    private get isEditMode(): boolean {
        return this.props.mode === EventFormType.Edit;
    }

    constructor(props: AddEventWrapperProps) {
        super(props);
        this.state = {
            mapCoordinates: JELENIA_COORDINATES,
            markerPosition: JELENIA_COORDINATES,
            isAddedEvent: false,
            addEvent: true,
            zoom: DEFAULT_ZOOM,
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
            mapCoordinates: this.props.selectedEvent?.coordinates as MarkerCoordinates,
            markerPosition: this.props.selectedEvent?.coordinates as MarkerCoordinates,
        });
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
        if (this.isEditMode) {
            this.props.saveEditedEvent({...sportEvent, _id: this.props.selectedEvent?._id, coordinates: this.state.markerPosition });
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
        const isEditWithoutSelectedEvent = this.isEditMode && !this.props.selectedEvent;

        if (isEditWithoutSelectedEvent) {
            return <Redirect to='/add-event' />;
        }
    
        return <div className="map-wrapper wrapper">
            <h2>Wybierz miejsce na mapie i zgłoś zawody</h2>
            <div className="wrapper__row">
                <Map center={this.state.mapCoordinates} zoom={this.state.zoom} className="mini-map">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <NewEventMarker draggable={!this.state.isAddedEvent} onDragEnd={this.handleNewSportEventDragEnd} position={this.state.markerPosition} />
                </Map>
                { this.state.isAddedEvent ? <EventAddedInfo onAddSportEventClick={this.handleAddAnotherSportEventClick} onBackToMapClick={this.handleBackToMapClick} /> : (this.state.addEvent ? <AddEventForm initialData={this.initialFormData} onCloseClick={this.handleAddEventCloseClick} onFormSubmit={this.handleFormSubmit} onSuggetionChange={this.handleSuggestionChange} /> : <Redirect to='/' />) }
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