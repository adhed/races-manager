import React, { useState } from 'react';
import { SportEvent } from '../../../shared/models/sport-event';
import { getParsedDate } from '../../../shared/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDisciplineIcon } from '../../../shared/utils/sport-event.utils';
import './EventToAccept.scss';
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';

type EventToAcceptProps = {
    sportEvent: SportEvent;
    remove: (event: SportEvent) => void;
    setActive: (event: SportEvent) => void;
}

export function EventToAccept(props: EventToAcceptProps) {
    const [isDescriptionVisible, setDescriptionVisible] = useState(false);
    
    const handleClick = (): void => {
        setDescriptionVisible(!isDescriptionVisible);
    }

    const handleRemoveClick = (event: any): void => {
        event.preventDefault();
        event.stopPropagation();

        const result = window.confirm('Czy na pewno chcesz usunąć te zawody?');

        if (!result || !props.sportEvent._id) {
            return;
        }
    
        props.remove(props.sportEvent);
    }

    const handleAccept = (event: any): void => {
        event.preventDefault();
        event.stopPropagation();
        
        props.setActive(props.sportEvent);
    }

    return <div className="event-to-accept" title={props.sportEvent.description} onClick={handleClick}>
        <div className="event-to-accept__main-info main-info">
            <FontAwesomeIcon className="main-info__icon" icon={getDisciplineIcon(props.sportEvent.discipline)} />
            <span className="main-info__date">{ getParsedDate(props.sportEvent.date) }</span>
            <span className="main-info__title">{ props.sportEvent.name }</span>
            <span className="main-info__place">({ props.sportEvent.place })</span>
            { props.sportEvent.author  ? <span className="main-info__author"> (dodane przez { props.sportEvent.author })</span> : null }

            <span className="main-info__control control control--first" onClick={handleAccept} title="Usuń">
                <FontAwesomeIcon icon={faCheck} className="control__icon" />
                <span className="control__label">Zaakceptuj</span>
            </span>
            <span className="main-info__control control" onClick={handleRemoveClick} title="Usuń">
                <FontAwesomeIcon icon={faTrash} className="control__icon" />
                <span className="control__label">Usuń</span>
            </span>
        </div>
        { isDescriptionVisible ? <div className="event-to-accept__description description">
            { props.sportEvent.author ? <span className="description__author"><b>Autor:</b> { props.sportEvent.author }</span> : null }
            <span className="description__text"><b>Opis:</b> { props.sportEvent.description }</span>
        </div> : null }
    </div>
}