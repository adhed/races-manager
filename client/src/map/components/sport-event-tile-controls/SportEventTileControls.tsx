import React from 'react';
import { SportEvent } from '../../../shared/models/sport-event';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SportEventTileControls.scss';

type SportEventTileControlsProps = {
    sportEvent: SportEvent;
    editClick: () => void;
    removeClick: () => void;
}

export default function SportEventTileControls(props: SportEventTileControlsProps) {
    const handleRemoveClick = (): void => {
        props.removeClick();
    }

    const handleEditClick = (): void => {
        props.editClick();
    }

    return <div className="event-controls">
        <span className="event-controls__control control" onClick={handleEditClick}>
            <FontAwesomeIcon icon={faEdit} className="control__icon" />
            <span className="control__label">Edytuj</span>
        </span>
        <span className="event-controls__control control" onClick={handleRemoveClick}>
            <FontAwesomeIcon icon={faTrash} className="control__icon" />
            <span className="control__label">Usuń</span>
        </span>
    </div>
}