import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../state/ducks';
import { FirebaseProvider } from '../../../account/services/FirebaseProvider';
import { setUser } from '../../../state/ducks/account/actions';
import { UserInfo } from 'firebase';

type AuthHandlerProps = {
    setUser: (user: UserInfo) => void;
}

function AuthHandler(props: AuthHandlerProps) {
    const firebaseProvider = new FirebaseProvider();

    useEffect(() => {
        firebaseProvider.auth.onAuthStateChanged((user: UserInfo | null) => {
            if (user) {
                props.setUser(user);
            }
        });
    }, []);

    return <React.Fragment />;
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        isLoggedIn: state.account.isLoggedIn,
        user: state.account.user,
    };
}

export default connect(mapStateToProps, { setUser })(AuthHandler)