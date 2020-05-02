import React from 'react';
import { SportEvent } from "../../../shared/models/sport-event"

import './SportEventTile.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMapMarker, faInfoCircle, faLink } from '@fortawesome/free-solid-svg-icons';
import { getParsedDate } from '../../../shared/utils';
import { DISCPLINES_NAMES, DISCIPLINES_TYPES_NAMES } from '../../../shared/models/disciplines';
import { getDisciplineIcon } from '../../../shared/utils/sport-event.utils';
import CloseIcon from '../../../shared/components/close-icon/CloseIcon';
import SportEventTileControls from '../sport-event-tile-controls/SportEventTileControls';

type SportEventTileProps = {
    sportEvent: SportEvent;
    isLogggedIn: boolean;
    closeClick: () => void;
    removeClick: () => void;
    editClick: () => void;
    addToFavouritesClick: () => void;
}

export default function SportEventTile(props: SportEventTileProps) {
    const disciplineIcon = getDisciplineIcon(props.sportEvent.discipline);

    const handleCloseClick = (): void => {
        props.closeClick();
    };

    const handleRemoveClick = (): void => {
        props.removeClick();
    }

    const handleEditClick = (): void => {
        props.editClick();
    }

    const handleAddToFavouritesClick = (): void => {
        props.addToFavouritesClick();
    }
    
    return <div className="event-tile">
        <span className="event-tile__title">{ props.sportEvent.name }</span>
        <CloseIcon onCloseClick={handleCloseClick} title="Zamknij podgląd" />
        <div className="event-tile__info info">
            <span className="info__wrapper wrapper">
                <FontAwesomeIcon icon={faClock} className="wrapper__icon" />
                <span className="wrapper__label">Data:</span>
                <span className="wrapper__value">{ getParsedDate(props.sportEvent.date) }</span>
            </span>
            <span className="info__wrapper wrapper">
                <FontAwesomeIcon icon={faMapMarker} className="wrapper__icon" />
                <span className="wrapper__label">Miejsce startu:</span>
                <span className="wrapper__value">{ props.sportEvent.place }</span>
            </span>
            <span className="info__wrapper wrapper">
                <FontAwesomeIcon icon={disciplineIcon} className="wrapper__icon" />
                <span className="wrapper__label">Dyscyplina:</span>
                <span className="wrapper__value">{ DISCPLINES_NAMES[props.sportEvent.discipline] } ({ DISCIPLINES_TYPES_NAMES[props.sportEvent.type] })</span>
            </span>
            { props.sportEvent.serie ? <span className="info__wrapper wrapper">
                <FontAwesomeIcon icon={disciplineIcon} className="wrapper__icon" />
                <span className="wrapper__label">Seria:</span>
                <span className="wrapper__value">{ props.sportEvent.serie }</span>
            </span> : null }
            { props.sportEvent.link ? <span className="info__wrapper wrapper">
                <FontAwesomeIcon icon={faLink} className="wrapper__icon" />
                <span className="wrapper__label">Link:</span>
                <span className="wrapper__value value">
                    <a className="value__link" href={props.sportEvent.link} target="_blank" rel="noopener noreferrer">{ props.sportEvent.link }</a>
                </span>
            </span> : null }
            <span className="info__wrapper wrapper">
                <FontAwesomeIcon icon={faInfoCircle} className="wrapper__icon" />
                <span className="wrapper__label">Szczegóły:</span>
                <span className="wrapper__value wrapper__value--block">{ props.sportEvent.description }</span>
            </span>
        </div>
        { props.isLogggedIn ? <SportEventTileControls addtoFavouritesClick={handleAddToFavouritesClick} editClick={handleEditClick} removeClick={handleRemoveClick} sportEvent={props.sportEvent} /> : null }
    </div>
}