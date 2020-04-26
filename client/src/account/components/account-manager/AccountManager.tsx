import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { UserInfo } from 'firebase';
import { connect } from 'react-redux';

import { ApplicationState } from '../../../state/ducks';
import { signIn, signOut } from '../../../state/ducks/account/actions';
import './AccountManager.css';
import { FirebaseProvider } from '../../services/FirebaseProvider';

export enum AccountManagerMode {
    SignIn,
    SignOut,
}

type AccountManagerProps = {
    mode: AccountManagerMode;
    isLoggedIn: boolean;
    signIn: (user: UserInfo | null) => void;
    signOut: () => void;
}

function AccountManager(props: AccountManagerProps) {
    const firebaseProvider = new FirebaseProvider();
    const defaultLabel = 'Zaloguj się';
    const signOutLabel = 'Zostałeś wylogowany.';
    const [label, setLabel] = useState(defaultLabel);

    useEffect(() => {
        if (props.mode === AccountManagerMode.SignIn) {
            firebaseProvider.auth.onAuthStateChanged((user) => {
                if (user) {
                    props.signIn(user);
                }
            });
        } else {
            firebaseProvider.auth.signOut().then(() => {
                props.signOut();
                setLabel(signOutLabel);
            });
        }
    }, []);

    useEffect(() => {
        if (props.mode === AccountManagerMode.SignIn) {
            setLabel(defaultLabel);
        };
    });

    return <div>
        <h2>{ label }</h2>
        { props.mode === AccountManagerMode.SignIn ? 
            <div className="account-box">
                <p>Użyj jednej z poniższych opcji logowania:</p>
                <StyledFirebaseAuth uiConfig={firebaseProvider.uiConfig} firebaseAuth={firebaseProvider.auth}/>
            </div> : null }
      </div>;
  }

const mapStateToProps = (state: ApplicationState) => {
    return {
        isLoggedIn: state.account.isLoggedIn,
    };
}

  
export default connect(mapStateToProps, { signIn, signOut })(AccountManager);