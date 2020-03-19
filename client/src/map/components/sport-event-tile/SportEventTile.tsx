import React from 'react';
import { SportEvent } from "../../../shared/models/sport-event"

import './SportEventTile.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faClock, faMapMarker, faRunning, faSkiingNordic, faBiking, faInfoCircle, faLink } from '@fortawesome/free-solid-svg-icons';
import { getParsedDate } from '../../../shared/utils';
import { DISCPLINES_NAMES, DISCIPLINES_TYPES_NAMES, Discipline } from '../../../shared/models/disciplines';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type SportEventTileProps = {
    sportEvent: SportEvent;
    closeClick: () => void;
}

export default function SportEventTile(props: SportEventTileProps) {
    const getDisciplineIcon = (discipline: string): IconDefinition => {
        if (discipline === Discipline.Running) {
            return faRunning;
        }
        if (discipline === Discipline.MountainBiking) {
            return faBiking;

        }
        if (discipline === Discipline.RoadCycling) {
            return faBiking;

        }
        if (discipline === Discipline.XcSkiing) {
            return faSkiingNordic;
        }

        return faRunning;
    };

    const handleCloseClick = (): void => {
        props.closeClick();
    };
    
    return <div className="event-tile">
        <span className="event-tile__title">{ props.sportEvent.name }</span>
        <FontAwesomeIcon title="Zamknij podgląd" icon={faTimes} onClick={handleCloseClick} className="event-tile__close-icon" />
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
                <FontAwesomeIcon icon={getDisciplineIcon(props.sportEvent.discipline)} className="wrapper__icon" />
                <span className="wrapper__label">Dyscyplina:</span>
                <span className="wrapper__value">{ DISCPLINES_NAMES[props.sportEvent.discipline] } ({ DISCIPLINES_TYPES_NAMES[props.sportEvent.type] })</span>
            </span>
            { props.sportEvent.link ? <span className="info__wrapper wrapper">
                <FontAwesomeIcon icon={faLink} className="wrapper__icon" />
                <span className="wrapper__label">Link:</span>
                <span className="wrapper__value value">
                    <a className="value__link" href={props.sportEvent.link} target="_blank" rel="nofollow">{ props.sportEvent.link }</a>
                </span>
            </span> : null }
            <span className="info__wrapper wrapper">
                <FontAwesomeIcon icon={faInfoCircle} className="wrapper__icon" />
                <span className="wrapper__label">Szczegóły:</span>
                <span className="wrapper__value wrapper__value--block">{ props.sportEvent.description }</span>
            </span>
        </div>
    </div>
}