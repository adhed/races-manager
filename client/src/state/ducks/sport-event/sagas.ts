import { all, fork, call, put, takeEvery, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { fetchSportEventsSuccess, fetchSportEventsError, removeSportEventSuccess, removeSportEventError, fetchSportEvents, selectEventByIdError, selectEventByIdSuccess, addEventSuccess, addEventError } from './actions';
import { SportEventActionsTypes } from './types';
import { eventApis } from '../../../core/services';
import { selectEvent } from '../map/actions';
import { getAccount } from '../account/selectors';
import { fetchInactiveEvents } from '../admin/actions';

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
		yield put(removeSportEventSuccess());
		yield put(selectEvent(null));
		yield put(fetchInactiveEvents());
		yield put(fetchSportEvents());

    } catch (error) {
        if (error instanceof Error) {
			yield put(removeSportEventError(error.stack!));
		} else {
			yield put(removeSportEventError("An unknown error occured."));
		}
    }
}

function* handleSelectEventById(action: any): Generator {
    try {
		const response: any = yield call(() => eventApis.getEventById(action.payload));
		const event = response.data.data;
		yield put(selectEvent(event));
		yield put(selectEventByIdSuccess(event));
		yield put(push('/'));
    } catch (error) {
        if (error instanceof Error) {
			yield put(selectEventByIdError(error.stack!));
		} else {
			yield put(selectEventByIdError("An unknown error occured."));
		}
    }
}

function *handleAddEvent(action: any): Generator {
	try {
		const account: any = yield select(getAccount);
		const response: any = yield call(() => eventApis.insertEvent({
			...action.payload,
			author: {
				name: account.user?.displayName,
				uid: account.user?.uid
			}
		}));
		const event = response.data.data;
		const isAdmin = account?.details?.isAdmin;

		if (isAdmin) {
			yield put(selectEvent(event));
		}

		yield put(addEventSuccess(event));
		yield put(push('/event-added'));
    } catch (error) {
        if (error instanceof Error) {
			yield put(addEventError(error.stack!));
		} else {
			yield put(addEventError("An unknown error occured."));
		}
    }
}

function* watchFetchRequest(): Generator {
	yield takeEvery(SportEventActionsTypes.FETCH_EVENTS, handleFetch);
}

function* watchRemoveRequest(): Generator {
	yield takeEvery(SportEventActionsTypes.REMOVE_EVENT, handleRemove);
}

function* watchSelectEventById(): Generator {
	yield takeEvery(SportEventActionsTypes.SELECT_EVENT_BY_ID, handleSelectEventById);
}

function* watchAddEvent(): Generator {
	yield takeEvery(SportEventActionsTypes.ADD_EVENT, handleAddEvent);
}

export default function* sportEventSaga() {
	yield all([
        fork(watchFetchRequest),
		fork(watchRemoveRequest),
		fork(watchSelectEventById),
		fork(watchAddEvent),
    ]);
}