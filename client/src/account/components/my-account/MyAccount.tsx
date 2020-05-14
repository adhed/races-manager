import React from 'react';
import { UserInfo } from 'firebase';
import { connect } from 'react-redux';
import { faUser, faUserShield, faTools } from '@fortawesome/free-solid-svg-icons';

import { ApplicationState } from '../../../state/ducks';
import FavouriteEvents from '../favourite-events/FavouriteEvents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MyAccount.scss';
import { useHistory } from 'react-router-dom';

type MyAccountProps = {
    isLoggedIn: boolean;
    user: UserInfo | null;
    isAdmin: boolean;
}

function MyAccount(props: MyAccountProps) {
    const history = useHistory();

    const icon = props.isAdmin ? faUserShield : faUser;

    const handleAdminLabelClick = () => {
        history.push('/admin-panel');
    }

    return <div className="my-account-wrapper">
        <h2 className="my-account-wrapper__title title">
            <FontAwesomeIcon className="title__icon" icon={icon} />
            Witaj { props.user ? props.user.displayName || 'Unknown' : 'Unknown' }
        </h2>
        { props.isAdmin ? <span className="my-account-wrapper__admin-label admin-label" onClick={handleAdminLabelClick}>
            <FontAwesomeIcon className="admin-label__icon" icon={faTools} /> 
            Panel admina
        </span> : null }
        <FavouriteEvents />
    </div>;
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        isLoggedIn: state.account.isLoggedIn,
        user: state.account.user,
        isAdmin: state.account.details.isAdmin,
    };
}
  
export default connect(mapStateToProps)(MyAccount);
