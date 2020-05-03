import { all, fork, put, takeEvery, select, call } from "redux-saga/effects";
import { AccountActionTypes } from "./types";
import { push } from "connected-react-router";
import { addEventToFavourites, removeEventFromFavourites, fetchFavouriteEvents } from "../../../core/services";
import { getUid } from "./selectors";
import { addEventToFavouritesSuccess, addEventToFavouritesError, removeEventFromFavouritesSuccess, removeEventFromFavouritesError, getFavouriteEvents, getFavouriteEventsSuccess, getFavouriteEventsError } from "./actions";

function* handleSignIn(_action: any): Generator {
    try {
        yield put(push('/my-account'));
    } catch (error) {
       console.log('Sign in error:', error);
    }
}

function* handleSetUser(_action: any): Generator {
    try {
        const userId = yield select(getUid);
        yield put(getFavouriteEvents(userId as string));
    } catch (error) {
       console.log('Sign in error:', error);
    }
}

function* handleAddEventToFavourites(action: any): Generator {
    try {
        const userId = yield select(getUid);
        yield call(() => addEventToFavourites(action.payload, userId as string));
        yield put(addEventToFavouritesSuccess());
        yield put(getFavouriteEvents(userId as string));
    } catch (error) {
        if (error instanceof Error) {
			yield put(addEventToFavouritesError(error.stack!));
		} else {
			yield put(addEventToFavouritesError("An unknown error occured."));
		}
    }
}


function* handleGetFavouriteEvents(action: any): Generator {
    try {
        const response: any = yield call(() => fetchFavouriteEvents(action.payload));
        yield put(getFavouriteEventsSuccess(response.data.data))
    } catch (error) {
        if (error instanceof Error) {
			yield put(getFavouriteEventsError(error.stack!));
		} else {
			yield put(getFavouriteEventsError("An unknown error occured."));
		}
    }
}

function* handleRemoveEventFromFavourites(action: any): Generator {
    try {
        const userId = yield select(getUid);
        yield call(() => removeEventFromFavourites(action.payload, userId as string));
        yield put(removeEventFromFavouritesSuccess());
        yield put(getFavouriteEvents(userId as string));
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

function* watchSetUser(): Generator {
	yield takeEvery(AccountActionTypes.SET_USER, handleSetUser);
}

function* watchAddEventToFavourites(): Generator {
	yield takeEvery(AccountActionTypes.ADD_EVENT_TO_FAVOURITES, handleAddEventToFavourites);
}

function* watchRemoveEventFromFavourites(): Generator {
	yield takeEvery(AccountActionTypes.REMOVE_EVENT_FROM_FAVOURITES, handleRemoveEventFromFavourites);
}

function* watchGetFavouriteEvents(): Generator {
	yield takeEvery(AccountActionTypes.GET_FAVOURITE_EVENTS, handleGetFavouriteEvents);
}

export default function* accountSaga() {
	yield all([
        fork(watchSignIn),
        fork(watchSetUser),
        fork(watchAddEventToFavourites),
        fork(watchRemoveEventFromFavourites),
        fork(watchGetFavouriteEvents),
    ]);
}