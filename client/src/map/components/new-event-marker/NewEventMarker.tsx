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
    private ref: any;

    constructor(props: NewEventMarkerProps) {
        super(props);

        this.handleDragEnd = this.handleDragEnd.bind(this);
    }

    componentDidMount(): void {
        if (this.ref) {
            this.ref?.leafletElement.openPopup()
        }
    }

    handleDragEnd(event: LeafletEvent): void {
        this.props.onDragEnd(event.target.getLatLng());
    }

    render() {
        return <Marker ref={(ref) => this.ref = ref } ondragend={this.handleDragEnd} position={this.props.position} draggable={this.props.draggable}>
                <Popup>
                    <p>Przesuń proszę marker w miejsce najblizej startu.</p>
                </Popup>
            </Marker>
    }
}