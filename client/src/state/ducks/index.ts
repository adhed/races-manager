import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import { sportEventReducer } from "./sport-event/reducer";
import { SportEventState } from "./sport-event/types";
import sportEventSaga from "./sport-event/sagas";

export interface ApplicationState {
	sportEvent: SportEventState;
}

export const rootReducer = combineReducers<ApplicationState>({
	sportEvent: sportEventReducer
});

export function* rootSaga() {
    yield all([fork(sportEventSaga)]);
}