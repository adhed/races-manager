import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { UserInfo } from 'firebase';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../state/ducks';
import { signIn, signOut } from '../../../state/ducks/account/actions';
import { FirebaseProvider } from '../../services/FirebaseProvider';
import './AccountManager.scss';

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
                <span className="account-box__info info">Dzięki logowaniu będziesz mógł <span className="info__highlight">dodawać wydarzenia</span> sportowe oraz <span className="info__highlight">tworzyć listę ulubionych</span> wydarzeń.</span>
                
                <div className="account-box__sign-in-wrapper sign-in-wrapper">
                    <span className="sign-in-wrapper__info">Użyj jednej z poniższych opcji logowania:</span>
                    <StyledFirebaseAuth className="firebase-auth-wrapper" uiConfig={firebaseProvider.uiConfig} firebaseAuth={firebaseProvider.auth}/>
                </div>
            </div> : null }
      </div>;
  }

const mapStateToProps = (state: ApplicationState) => {
    return {
        isLoggedIn: state.account.isLoggedIn,
    };
}

  
export default connect(mapStateToProps, { signIn, signOut })(AccountManager);