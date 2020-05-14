import React from 'react';
import { SportEvent } from '../../../shared/models/sport-event';
import { getParsedDate } from '../../../shared/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDisciplineIcon } from '../../../shared/utils/sport-event.utils';
import './EventToAccept.scss';
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';

type EventToAcceptProps = {
    sportEvent: SportEvent;
    eventSelected: (event: SportEvent) => void;
    remove: (event: SportEvent) => void;
    setActive: (event: SportEvent) => void;
}

export function EventToAccept(props: EventToAcceptProps) {
    const handleClick = (): void => {
        props.eventSelected(props.sportEvent);
    }

    const handleRemoveClick = (event: any): void => {
        event.preventDefault();
        event.stopPropagation();

        props.remove(props.sportEvent);
    }

    const handleAccept = (): void => {
        props.setActive(props.sportEvent);
    }

    return <div className="event-to-accept" onClick={handleClick}>
        <FontAwesomeIcon className="event-to-accept__icon" icon={getDisciplineIcon(props.sportEvent.discipline)} />
        <span className="event-to-accept__date">{ getParsedDate(props.sportEvent.date) }</span>
        <span className="event-to-accept__title">{ props.sportEvent.name }</span>
        <span className="event-to-accept__place">({ props.sportEvent.place })</span>
        { props.sportEvent.author  ? <span className="event-to-accept__author"> (dodane przez { props.sportEvent.author })</span> : null }
        
        <span className="event-to-accept__control control control--first" onClick={handleAccept} title="Usuń">
            <FontAwesomeIcon icon={faCheck} className="control__icon" />
            <span className="control__label">Zaakceptuj</span>
        </span>
        <span className="event-to-accept__control control" onClick={handleRemoveClick} title="Usuń">
            <FontAwesomeIcon icon={faTrash} className="control__icon" />
            <span className="control__label">Usuń</span>
        </span>
    </div>
}