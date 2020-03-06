import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapSigns, faCalendar, faPlusCircle, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import './Nav.scss';

export default class Nav extends React.Component {
    render() {
        return <nav className="nav-header">
            <div className="nav-header__wrapper">
                <h2>Races manager</h2>
                <ul className="nav-header__links">
                    <li className="nav-header__link link">
                        <FontAwesomeIcon icon={faMapSigns} className="link__icon" />
                        <Link to="/">Mapa</Link>
                    </li>
                    <li className="nav-header__link link">
                        <FontAwesomeIcon icon={faCalendar} className="link__icon" />
                        <Link to="/calendar">Kalendarz</Link>
                    </li>
                    <li className="nav-header__link nav-header__link--side link">
                        <FontAwesomeIcon icon={faPlusCircle} className="link__icon" />
                        <Link to="/add-event">Dodaj zawody</Link>
                    </li>
                    <li className="nav-header__link nav-header__link--side link">
                        <FontAwesomeIcon icon={faSignInAlt} className="link__icon" />
                        <Link to="/account">Moje konto</Link>
                    </li>
                </ul>
            </div>
         </nav>
    }
    
}
