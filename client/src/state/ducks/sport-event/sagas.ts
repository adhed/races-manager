import { all, fork, call, put, takeEvery } from 'redux-saga/effects'
import { fetchSportEventsSuccess, fetchSportEventsError, fetchSportEvents, removeSportEventSuccess, removeSportEventError } from './actions';
import { SportEventActionsTypes } from './types';
import { eventApis } from '../../../core/services';

function* handleFetch(): Generator {
	try {
		const res: any = yield call(eventApis.getAllEvents);
		yield put(fetchSportEventsSuccess(res.data.data));
	} catch (err) {
		if (err instanceof Error) {
			yield put(fetchSportEventsError(err.stack!));
		} else {
			yield put(fetchSportEventsError("An unknown error occured."));
		}
	}
}

function* handleRemove(action: any): Generator {
    try {
        yield call(() => eventApis.deleteEventById(action.payload));
        yield put(removeSportEventSuccess())
        yield put(fetchSportEvents());
    } catch (error) {
        if (error instanceof Error) {
			yield put(removeSportEventError(error.stack!));
		} else {
			yield put(removeSportEventError("An unknown error occured."));
		}
    }
}

function* watchFetchRequest(): Generator {
	yield takeEvery(SportEventActionsTypes.FETCH_EVENTS, handleFetch);
}

function* watchRemoveRequest(): Generator {
	yield takeEvery(SportEventActionsTypes.REMOVE_EVENT, handleRemove);
}

export default function* sportEventSaga() {
	yield all([
        fork(watchFetchRequest),
        fork(watchRemoveRequest)
    ]);
}