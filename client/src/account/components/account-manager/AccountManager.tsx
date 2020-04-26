import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase, { UserInfo } from 'firebase';
import { connect } from 'react-redux';

import { ApplicationState } from '../../../state/ducks';
import { signIn, signOut } from '../../../state/ducks/account/actions';
import { firebaseConfig } from '../../../config/firebase-config';
import './AccountManager.css';

export enum AccountManagerMode {
    SignIn,
    SignOut,
}

firebase.initializeApp(firebaseConfig);
  
const uiConfig: firebaseui.auth.Config = {
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        signInSuccessWithAuthResult: () => false
    }
};

type AccountManagerProps = {
    mode: AccountManagerMode;
    isLoggedIn: boolean;
    signIn: (user: UserInfo | null) => void;
    signOut: () => void;
}

function AccountManager(props: AccountManagerProps) {
    const defaultLabel = 'Zaloguj się';
    const signOutLabel = 'Zostałeś wylogowany.';
    const [label, setLabel] = useState(defaultLabel);

    useEffect(() => {
        if (props.mode === AccountManagerMode.SignIn) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    props.signIn(user);
                }
            });
        } else {
            firebase.auth().signOut().then(() => {
                props.signOut();
                setLabel(signOutLabel);
            });
        }
    }, []);

    useEffect(() => {
        if (props.mode === AccountManagerMode.SignIn) {
            setLabel(defaultLabel);
        };
    })

    return <div>
        <h2>{ label }</h2>
        { props.mode === AccountManagerMode.SignIn ? 
            <div className="account-box">
                <p>Użyj jednej z poniższych opcji logowania:</p>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
            </div> : null }
      </div>;
  }

const mapStateToProps = (state: ApplicationState) => {
    return {
        isLoggedIn: state.account.isLoggedIn,
    };
}

  
export default connect(mapStateToProps, { signIn, signOut })(AccountManager);