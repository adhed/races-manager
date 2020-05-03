import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../state/ducks';
import { FirebaseProvider } from '../../../account/services/FirebaseProvider';
import { setUser } from '../../../state/ducks/account/actions';
import { fetchSportEvents } from '../../../state/ducks/sport-event/actions';
import { UserInfo } from 'firebase';

type AuthHandlerProps = {
    setUser: (user: UserInfo) => void;
    fetchSportEvents: () => void;
    sportEventsAvailable: boolean;
}

function AuthHandler(props: AuthHandlerProps) {
    const firebaseProvider = new FirebaseProvider();

    useEffect(() => {
        firebaseProvider.auth.onAuthStateChanged((user: UserInfo | null) => {
            if (user) {
                props.setUser(user);
            }
        });

        if (!props.sportEventsAvailable) {
            props.fetchSportEvents();
        }
    }, []);

    return <React.Fragment />;
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        isLoggedIn: state.account.isLoggedIn,
        user: state.account.user,
        sportEventsAvailable: !!state.sportEvent.data.length
    };
}

export default connect(mapStateToProps, { setUser, fetchSportEvents })(AuthHandler)