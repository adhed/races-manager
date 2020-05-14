import React from 'react';
import './AdminPanel.scss';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ApplicationState } from 'state/ducks';
import { connect } from 'react-redux';
import { SportEvent } from 'shared/models/sport-event';
import { EventToAccept } from '../event-to-accept/EventToAccept';

type AdminPanelProps = {
    eventsToAccept: SportEvent[];
}

export function AdminPanel(props: AdminPanelProps) {
    const handleSetActive = (event: SportEvent): void => {

    }

    const handleRemoveClick = (event: SportEvent): void => {

    }

    const handleEventClick = (event: SportEvent): void => {

    }

    return <div className="admin-panel">
            <h2 className="admin-panel__title">
                <FontAwesomeIcon className="admin-panel__icon" icon={faUserShield} />
                Panel administratora
            </h2>
            <div className="admin-panel__events events">
                <h2 className="events__title">Wydarzenia do zaakceptowania:</h2>
                { props.eventsToAccept?.length ? props.eventsToAccept.map((sportEvent: SportEvent) => {
                    return <EventToAccept setActive={handleSetActive} remove={handleRemoveClick} eventSelected={handleEventClick} key={sportEvent._id} sportEvent={sportEvent} />
                }) : <span className="events__label">Brak zawodów do zaakceptowania.</span>}
            </div>
        </div>
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        eventsToAccept: state.sportEvent.data.filter((event: SportEvent) => !event.isActive) || [],
    };
}
  
export default connect(mapStateToProps)(AdminPanel);