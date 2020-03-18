import React from 'react';

import './EventAddedInfo.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapSigns, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

type EventAddedInfoProps = {
    onBackToMapClick: () => void;
    onAddSportEventClick: () => void;
}

export default function EventAddedInfo(props: EventAddedInfoProps) {
    const onBackToMapClick = (): void => props.onBackToMapClick();
    const onAddSportEventClick = (): void => props.onAddSportEventClick();

    return <div className="wrapper__info info">
        <strong className="info__label">Zawody zostały dodane do bazy.</strong>
        <span className="info__link" onClick={onAddSportEventClick}>
            <FontAwesomeIcon icon={faPlusCircle} className="link__icon" />
            Dodaj kolejne zawody
        </span>
        <span className="info__link" onClick={onBackToMapClick}>
            <FontAwesomeIcon icon={faMapSigns} className="link__icon" />
            Wróć do mapy wszystkich zawodów
        </span>
    </div>
}
