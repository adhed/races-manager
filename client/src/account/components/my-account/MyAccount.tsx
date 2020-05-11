import React from 'react';
import { UserInfo } from 'firebase';
import { connect } from 'react-redux';

import './MyAccount.css';
import { ApplicationState } from '../../../state/ducks';
import FavouriteEvents from '../favourite-events/FavouriteEvents';

type MyAccountProps = {
    isLoggedIn: boolean;
    user: UserInfo | null;
}

function MyAccount(props: MyAccountProps) {
    return <div>
        <h2>Witaj { props.user ? props.user.displayName || 'Unknown' : 'Unknown' }</h2>
        <FavouriteEvents />
    </div>;
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        isLoggedIn: state.account.isLoggedIn,
        user: state.account.user,
    };
}
  
export default connect(mapStateToProps)(MyAccount);
