import { all, fork, put, takeEvery, select, call } from "redux-saga/effects";
import { AccountActionTypes } from "./types";
import { push } from "connected-react-router";
import { addEventToFavourites, removeEventFromFavourites } from "../../../core/services";
import { getUid } from "./selectors";
import { addEventToFavouritesSuccess, addEventToFavouritesError, removeEventFromFavouritesSuccess, removeEventFromFavouritesError } from "./actions";

function* handleSignIn(action: any): Generator {
    try {
        yield put(push('/my-account'));
    } catch (error) {
       console.log('Sign in error:', error);
    }
}

function* handleSignOut(_action: any): Generator {
    try {
        // TODO: consider special action
    } catch (error) {
       console.log('Sign out error:', error);
    }
}

function* handleAddEventToFavourites(action: any): Generator {
    try {
        const userId = yield select(getUid);
        yield call(() => addEventToFavourites(action.payload, userId as string));
        yield put(addEventToFavouritesSuccess());
    } catch (error) {
        if (error instanceof Error) {
			yield put(addEventToFavouritesError(error.stack!));
		} else {
			yield put(addEventToFavouritesError("An unknown error occured."));
		}
    }
}

function* handleRemoveEventFromFavourites(action: any): Generator {
    try {
        const userId = yield select(getUid);
        yield call(() => removeEventFromFavourites(action.payload, userId as string));
        yield put(removeEventFromFavouritesSuccess());
    } catch (error) {
        if (error instanceof Error) {
			yield put(removeEventFromFavouritesError(error.stack!));
		} else {
			yield put(removeEventFromFavouritesError("An unknown error occured."));
		}
    }
}

function* watchSignIn(): Generator {
	yield takeEvery(AccountActionTypes.SIGN_IN, handleSignIn);
}

function* watchSignOut(): Generator {
	yield takeEvery(AccountActionTypes.SIGN_OUT, handleSignOut);
}

function* watchAddEventToFavourites(): Generator {
	yield takeEvery(AccountActionTypes.ADD_EVENT_TO_FAVOURITES, handleAddEventToFavourites);
}

function* watchRemoveEventFromFavourites(): Generator {
	yield takeEvery(AccountActionTypes.REMOVE_EVENT_FROM_FAVOURITES, handleRemoveEventFromFavourites);
}

export default function* accountSaga() {
	yield all([
        fork(watchSignIn),
        fork(watchSignOut),
        fork(watchAddEventToFavourites),
        fork(watchRemoveEventFromFavourites)
    ]);
}