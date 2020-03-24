import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { MapActionTypes } from './types';
import { saveEditedEventSuccess, saveEditedEventFailure, selectEvent } from './actions';
import { eventApis } from '../../../core/services';
import { selectEventById } from '../sport-event/actions';


function* handleEditEvent(_action: any): Generator {
    try {
		yield put(push('/edit-event'));
    } catch (error) {
       console.log('Edit event errror:', error);
    }
}

function* handleSaveEditedEvent(action: any): Generator {
    try {
        yield call(() => eventApis.updateEventById(action.payload._id, action.payload));
        yield put(saveEditedEventSuccess());
        yield put(selectEventById(action.payload._id));
		yield put(push('/'));
    } catch (error) {
        if (error instanceof Error) {
			yield put(saveEditedEventFailure(error.stack!));
		} else {
			yield put(saveEditedEventFailure("An unknown error occured."));
		}
    }
}

function* watchEditEvent(): Generator {
	yield takeEvery(MapActionTypes.EDIT_EVENT, handleEditEvent);
}

function* watchSaveEditedEvent(): Generator {
	yield takeEvery(MapActionTypes.SAVE_EDITED_EVENT, handleSaveEditedEvent);
}

export default function* mapSaga() {
	yield all([
        fork(watchEditEvent),
        fork(watchSaveEditedEvent),
    ]);
}