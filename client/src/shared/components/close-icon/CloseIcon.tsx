import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './CloseIcon.scss';

type CloseIconProps = {
    onCloseClick: () => void,
    class?: string,
    title: string,
}

export default function CloseIcon(props: CloseIconProps) {
    const classes = props.class ? `${props.class} close-icon` : 'close-icon';
    const handleCloseClick = (): void => {
        props.onCloseClick();
    }

    return <FontAwesomeIcon title={props.title} icon={faTimes} onClick={handleCloseClick} className={classes} />
}