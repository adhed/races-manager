import React from 'react';
import './MarkerList.scss';
import { eventApis } from '../../../core/services';
import { SportEvent } from '../../../shared/models/sport-event';
import { Marker, Popup } from 'react-leaflet';
import { getParsedDate } from '../../../shared/utils';
import { getDisciplineIcon } from '../../../shared/utils/sport-event.utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type MarkerListProps = {
    onEventSelected: (event: SportEvent) => void;
}

type MarkerListState = {
    events: SportEvent[];
    isLoading: boolean;
}

export default class MarkerList extends React.Component<MarkerListProps, MarkerListState> {
    constructor(props: MarkerListProps) {
        super(props);
        this.state = {
            isLoading: false,
            events: [],
        };

        this.handleMarkerClick = this.handleMarkerClick.bind(this);
    }

    componentDidMount() {
        eventApis.getAllEvents()
            .then((events) => {
                this.setState({
                    isLoading: false,
                    events: events.data.data
                })
            })
    }

    handleMarkerClick(sportEvent: SportEvent): void {
        this.props.onEventSelected(sportEvent);
    }

    render() {
        return <React.Fragment>
            {this.state.events
                .filter((event: SportEvent) => event.coordinates.lat && event.coordinates.lng)
                .map((event) => {
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
        </React.Fragment>
    }
}
