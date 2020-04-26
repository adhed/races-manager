import { firebaseConfig } from "../../config/firebase-config";
import firebase from "firebase";

let instance: FirebaseProvider;

export class FirebaseProvider {

    constructor() {
        if (instance) {
            return instance;
        }

        firebase.initializeApp(firebaseConfig);
        instance = this;
    }

    private static readonly uiConfig: firebaseui.auth.Config = {
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

    get uiConfig(): firebaseui.auth.Config {
        return FirebaseProvider.uiConfig;
    }

    get auth(): firebase.auth.Auth {
        return firebase.auth();
    }
}