import React from 'react';
import { SportEvent } from "../../../shared/models/sport-event"

type SportEventTileProps = {
    sportEvent: SportEvent;
    closeClick: () => void;
}

export default function SportEventTile(props: SportEventTileProps) {
    return <div className="event-tile">
        <h3 className="event-tile__title">{ props.sportEvent.name }</h3>
    </div>
}