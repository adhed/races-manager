import { all, fork, call, put, takeEvery } from 'redux-saga/effects'
import { fetchSportEventsSuccess, fetchSportEventsError } from './actions';
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

function* watchFetchRequest(): Generator {
	yield takeEvery(SportEventActionsTypes.FETCH_EVENTS, handleFetch);
}

export default function* sportEventSaga() {
	yield all([fork(watchFetchRequest)]);
}