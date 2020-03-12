import React from 'react';
import './MarkerList.scss';
import { eventApis } from '../../../core/services';
import { SportEvent } from '../../../shared/models/sport-event';
import { Marker, Popup } from 'react-leaflet';

type MarkerListProps = {

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

    render() {
        return <div>
            {this.state.events
                .filter((event: SportEvent) => event.coordinates.lat && event.coordinates.lng)
                .map((event) => {
                    const eventPosition = { lat: event.coordinates.lat, lng: event.coordinates.lng };
                    return <Marker key={eventPosition.lat+""+eventPosition.lng} position={eventPosition} draggable={false}>
                        <Popup>
                            <h3>{ event.name }</h3>
                            <span>{ event.date }</span>
                            <p>{ event.description }</p>
                        </Popup>
                    </Marker>
                })}
        </div>
    }
}
