import React, { useEffect } from 'react';
import './AdminPanel.scss';
import { faUserShield, faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ApplicationState } from 'state/ducks';
import { connect } from 'react-redux';
import { SportEvent } from 'shared/models/sport-event';
import { EventToAccept } from '../event-to-accept/EventToAccept';
import { removeSportEvent } from '../../../state/ducks/sport-event/actions';
import { fetchInactiveEvents, setEventActive, hideAdminMessage } from '../../../state/ducks/admin/actions';

type AdminPanelProps = {
    eventsToAccept: SportEvent[];
    message: string;
    removeSportEvent: (id: string) => void;
    fetchInactiveEvents: () => void;
    setEventActive: (eventId: string) => void;
    hideAdminMessage: () => void;
}

function AdminPanel(props: AdminPanelProps) {
    useEffect(() => {
        props.fetchInactiveEvents();
    }, []);

    const handleSetActive = (event: SportEvent): void => {
        if (event._id) {
            props.setEventActive(event._id);

            setTimeout(() => {
                props.hideAdminMessage();
            }, 3000);
        }
    }

    const handleRemoveClick = (event: SportEvent): void => {
        if (event._id) {
            props.removeSportEvent(event._id);
        }
    }


    return <div className="admin-panel">
            <h2 className="admin-panel__title">
                <FontAwesomeIcon className="admin-panel__icon" icon={faUserShield} />
                Panel administratora
            </h2>
            <div className="admin-panel__events events">
                <h2 className="events__title">Wydarzenia do zaakceptowania:</h2>
                { props.message ? <span className="events__message message">
                    <FontAwesomeIcon className="message__icon" icon={faInfo} />
                    { props.message }
                </span> : null }
                { props.eventsToAccept?.length ? props.eventsToAccept.map((sportEvent: SportEvent) => {
                    return <EventToAccept setActive={handleSetActive} remove={handleRemoveClick} key={sportEvent._id} sportEvent={sportEvent} />
                }) : <span className="events__label">Brak zawodów do zaakceptowania.</span>}
            </div>
        </div>
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        eventsToAccept: state.admin.inactiveEvents,
        message: state.admin.message,
    };
}
  
export default connect(mapStateToProps, { hideAdminMessage, fetchInactiveEvents, removeSportEvent, setEventActive })(AdminPanel);