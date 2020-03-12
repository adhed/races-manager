import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import './MapWrapper.scss';
import 'leaflet/dist/leaflet.css';
import AddEventForm from '../add-event-form/AddEventForm';
import { eventApis } from '../../../core/services';
import { SportEvent } from '../../../shared/models/sport-event';

const L = require("leaflet");

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

type MapWrapperProps = {
    addEvent?: boolean,
}

type MapWrapperState = {
    lat: number,
    lng: number,
    zoom: number,
    events: any[],
    isLoading: boolean;
}

export default class MapWrapper extends React.Component<MapWrapperProps, MapWrapperState> {
    constructor(props: MapWrapperProps) {
        super(props);
        this.state = {
            lat: 0,
            lng: 0,
            zoom: 0,
            isLoading: false,
            events: [],
        };
    }
    componentDidMount() {
        this.setState({
            lat: 50.881066,
            lng: 15.713790,
            zoom: 11,
        });

        eventApis.getAllEvents()
            .then((events) => {
                this.setState({
                    isLoading: false,
                    events: events.data.data
                })
            })
    }

    render() {
        const position = { lat: this.state.lat, lng: this.state.lng };
        const title = this.props.addEvent ? 'Wybierz miejsce na mapie i zgłoś zawody' : 'Wybierz zawody na mapie i sprawdź szczegóły';

        return <div className="map-wrapper wrapper">
            <h2>{ title }</h2>
            <div className="wrapper__row">
                <Map center={position} zoom={this.state.zoom} className={this.props.addEvent ? 'map map--half' : 'map'}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

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
                </Map>
                { this.props.addEvent ? <AddEventForm /> : null}
            </div>
        </div>;
    }
    
}
