import React from 'react';
import { SportEvent } from '../../../shared/models/sport-event';
import { getParsedDate } from '../../../shared/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDisciplineIcon } from '../../../shared/utils/sport-event.utils';
import './FavouriteSportEvent.scss';

type FavouriteSportEventProps = {
    sportEvent: SportEvent;
    eventSelected: (event: SportEvent) => void;
}

export function FavouriteSportEvent(props: FavouriteSportEventProps) {
    const handleClick = (): void => {
        props.eventSelected(props.sportEvent);
    }

    return <div className="favourite-event" onClick={handleClick}>
        <FontAwesomeIcon className="favourite-event__icon" icon={getDisciplineIcon(props.sportEvent.discipline)} />
        <span className="favourite-event__date">{ getParsedDate(props.sportEvent.date) }</span>
        <span className="favourite-event__title">{ props.sportEvent.name }</span>
        <span className="favourite-event__place">({ props.sportEvent.place })</span>
    </div>
}