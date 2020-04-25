import { all, fork, put, takeEvery } from "redux-saga/effects";
import { AccountActionTypes } from "./types";
import { push } from "connected-react-router";

function* handleSignIn(_action: any): Generator {
    try {
		yield put(push('/my-account'));
    } catch (error) {
       console.log('Sign in error:', error);
    }
}

function* handleSignOut(_action: any): Generator {
    try {
		  // yield put(push('/'));
    } catch (error) {
       console.log('Sign out error:', error);
    }
}

function* watchSignIn(): Generator {
	yield takeEvery(AccountActionTypes.SIGN_IN, handleSignIn);
}

function* watchSignOut(): Generator {
	yield takeEvery(AccountActionTypes.SIGN_OUT, handleSignOut);
}

export default function* accountSaga() {
	yield all([
        fork(watchSignIn),
        fork(watchSignOut),
    ]);
}