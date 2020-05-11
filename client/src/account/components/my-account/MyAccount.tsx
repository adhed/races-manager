import React from 'react';
import { UserInfo } from 'firebase';
import { connect } from 'react-redux';
import { faUser, faUserShield } from '@fortawesome/free-solid-svg-icons';

import { ApplicationState } from '../../../state/ducks';
import FavouriteEvents from '../favourite-events/FavouriteEvents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MyAccount.scss';

type MyAccountProps = {
    isLoggedIn: boolean;
    user: UserInfo | null;
    isAdmin: boolean;
}

function MyAccount(props: MyAccountProps) {
    const icon = props.isAdmin ? faUserShield : faUser;

    return <div className="my-account-wrapper">
        <h2>
            <FontAwesomeIcon className="my-account-wrapper__icon" icon={icon} />
            Witaj { props.user ? props.user.displayName || 'Unknown' : 'Unknown' }
        </h2>
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
