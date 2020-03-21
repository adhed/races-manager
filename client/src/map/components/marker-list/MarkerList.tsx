import React from 'react';
import './MarkerList.scss';
import { SportEvent } from '../../../shared/models/sport-event';
import { Marker, Popup } from 'react-leaflet';
import { getParsedDate } from '../../../shared/utils';
import { getDisciplineIcon } from '../../../shared/utils/sport-event.utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MarkerClusterGroup from 'react-leaflet-markercluster';

require('react-leaflet-markercluster/dist/styles.min.css');

type MarkerListProps = {
    onEventSelected: (event: SportEvent) => void;
    sportEvents: SportEvent[];
}

type MarkerListState = {}

export default class MarkerList extends React.Component<MarkerListProps, MarkerListState> {
    constructor(props: MarkerListProps) {
        super(props);

        this.handleMarkerClick = this.handleMarkerClick.bind(this);
    }

    handleMarkerClick(sportEvent: SportEvent): void {
        this.props.onEventSelected(sportEvent);
    }

    render() {
        return <MarkerClusterGroup>
            {this.props.sportEvents
                .filter((event: SportEvent) => event.coordinates.lat && event.coordinates.lng)
                .map((event: SportEvent) => {
                    const eventPosition = { lat: event.coordinates.lat, lng: event.coordinates.lng };
                    return <Marker onClick={this.handleMarkerClick.bind(this, event)} key={event._id} position={eventPosition} draggable={false}>
                            <Popup className="popup">
                                <div className="popup__header header">
                                    <FontAwesomeIcon icon={getDisciplineIcon(event.discipline)} className="header__icon" />
                                    <span className="header__name">{ event.name }</span>
                                </div>
                                <span className="popup__date">{ event.place } ({ getParsedDate(event.date) })</span>
                            </Popup>
                        </Marker>
                })}
        </MarkerClusterGroup>
    }
}
