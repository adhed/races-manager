import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { MarkerCoordinates } from '../../../shared/models/map';
import { LeafletEvent } from 'leaflet';

type NewEventMarkerProps = {
    draggable: boolean;
    onDragEnd: (position: MarkerCoordinates) => void;
    position: MarkerCoordinates;
}

export class NewEventMarker extends React.Component<NewEventMarkerProps> {
    constructor(props: NewEventMarkerProps) {
        super(props);

        this.handleDragEnd = this.handleDragEnd.bind(this);
    }

    handleDragEnd(event: LeafletEvent): void {
        this.props.onDragEnd(event.target.getLatLng());
    }

    render() {
        return <Marker ondragend={this.handleDragEnd} position={this.props.position} draggable={this.props.draggable}>
                <Popup>
                    <p>Przesuń proszę marker w miejsce najblizej startu.</p>
                </Popup>
            </Marker>
    }
}