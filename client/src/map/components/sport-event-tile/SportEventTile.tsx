import React from 'react';
import { SportEvent } from "../../../shared/models/sport-event"

import './SportEventTile.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { getParsedDate } from '../../../shared/utils';
import { DISCIPLINES_TYPES, DISCPLINES_NAMES, DISCIPLINES_TYPES_NAMES } from '../../../shared/models/disciplines';

type SportEventTileProps = {
    sportEvent: SportEvent;
    closeClick: () => void;
}

export default function SportEventTile(props: SportEventTileProps) {
    const handleCloseClick = (): void => {
        props.closeClick();
    }
    
    return <div className="event-tile">
        <span className="event-tile__title">{ props.sportEvent.name }</span>
        <FontAwesomeIcon icon={faTimes} onClick={handleCloseClick} className="event-tile__close-icon" />
        <div className="event-tile__info info">
            <span className="info__wrapper wrapper">
                <span className="wrapper__label">Data:</span>
                <span className="wrapper__value">{ getParsedDate(props.sportEvent.date) }</span>
            </span>
            <span className="info__wrapper wrapper">
                <span className="wrapper__label">Miejsce startu:</span>
                <span className="wrapper__value">{ props.sportEvent.place }</span>
            </span>
            <span className="info__wrapper wrapper">
                <span className="wrapper__label">Dyscyplina:</span>
                <span className="wrapper__value">{ DISCPLINES_NAMES[props.sportEvent.discipline] }</span>
            </span>
            <span className="info__wrapper wrapper">
                <span className="wrapper__label">Typ:</span>
                <span className="wrapper__value">{ DISCIPLINES_TYPES_NAMES[props.sportEvent.type] }</span>
            </span>
            <p className="info__description">
                { props.sportEvent.description }
            </p>
        </div>
    </div>
}