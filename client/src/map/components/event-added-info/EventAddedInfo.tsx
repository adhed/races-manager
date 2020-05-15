import React from 'react';

import './EventAddedInfo.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapSigns, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

type EventAddedInfoProps = {
    onBackToMapClick: () => void;
    onAddSportEventClick: () => void;
    isAdmin: boolean;
}

export default function EventAddedInfo(props: EventAddedInfoProps) {
    const onBackToMapClick = (): void => props.onBackToMapClick();
    const onAddSportEventClick = (): void => props.onAddSportEventClick();

    const label = props.isAdmin ? 'Zawody zostały dodane do bazy.' : 'Dziękujemy, zawody czekają na zaakceptowanie przez administratora.'

    return <div className="wrapper__info info">
        <strong className="info__label">{ label }</strong>
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
