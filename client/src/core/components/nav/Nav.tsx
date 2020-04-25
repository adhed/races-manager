import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapSigns, faCalendar, faPlusCircle, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import './Nav.scss';
import { ApplicationState } from '../../../state/ducks';
import { connect } from 'react-redux';

type NavProps = {
    isLoggedIn: boolean;
}

class Nav extends React.Component<NavProps> {

    get accountLabel(): string {
        return this.props.isLoggedIn ? 'Wyloguj się' : 'Zaloguj się';
    }

    get accountLink(): string {
        return this.props.isLoggedIn ? '/sign-out' : '/sign-in';
    }

    render() {
        return <nav className="nav-header">
            <div className="nav-header__wrapper">
                <h2>RACES</h2>
                <ul className="nav-header__links">
                    <li className="nav-header__link link">
                        <FontAwesomeIcon icon={faMapSigns} className="link__icon" />
                        <Link to="/">Mapa</Link>
                    </li>
                    <li className="nav-header__link link">
                        <FontAwesomeIcon icon={faCalendar} className="link__icon" />
                        <Link to="/calendar">Kalendarz</Link>
                    </li>
                    <li className="nav-header__link nav-header__link--side  nav-header__link--first link">
                        <FontAwesomeIcon icon={faPlusCircle} className="link__icon" />
                        <Link to="/add-event">Dodaj zawody</Link>
                    </li>
                    { this.props.isLoggedIn ? <li className="nav-header__link nav-header__link--side link">
                        <FontAwesomeIcon icon={faSignInAlt} className="link__icon" />
                        <Link to="/my-account">Moje konto</Link>
                    </li> : null }
                    <li className="nav-header__link nav-header__link--side link">
                        <FontAwesomeIcon icon={faSignInAlt} className="link__icon" />
                        <Link to={this.accountLink} >{ this.accountLabel }</Link>
                    </li>
                </ul>
            </div>
         </nav>
    }
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        isLoggedIn: state.account.isLoggedIn,
    };
}

export default connect(mapStateToProps)(Nav);