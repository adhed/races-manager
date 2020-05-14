import { all, fork, put, takeEvery, select, call } from "redux-saga/effects";
import { AdminActionTypes } from "./types";
import { fetchInactiveEvents, fetchInactiveEventsSuccess, fetchInactiveEventsError, setEventActiveSuccess, setEventActiveError } from "./actions";
import { setEventActive, getInactiveEvents } from "core/services";
import { getUid } from "../account/selectors";

function* handleSetEventActive(action: any): Generator {
    try {
        const userId = yield select(getUid);
        yield call(() => setEventActive(action.payload, userId as string));
        yield put(setEventActiveSuccess());
        yield put(fetchInactiveEvents());
    } catch (error) {
        if (error instanceof Error) {
			yield put(setEventActiveError(error.stack!));
		} else {
			yield put(setEventActiveError("An unknown error occured."));
		}
    }
}

function* handleFetchInactiveEvents(action: any): Generator {
    try {
        const response: any = yield call(() => getInactiveEvents());
        yield put(fetchInactiveEventsSuccess(response.data.data));
    } catch (error) {
        if (error instanceof Error) {
			yield put(fetchInactiveEventsError(error.stack!));
		} else {
			yield put(fetchInactiveEventsError("An unknown error occured."));
		}
    }
}
function* watchFetchInactiveEvents(): Generator {
	yield takeEvery(AdminActionTypes.FETCH_INACTIVE_EVENTS, handleFetchInactiveEvents);
}

function* watchSetEventActive(): Generator {
	yield takeEvery(AdminActionTypes.SET_EVENT_ACTIVE, handleSetEventActive);
}

export default function* adminSaga() {
	yield all([
        fork(watchFetchInactiveEvents),
        fork(watchSetEventActive),
    ]);
}