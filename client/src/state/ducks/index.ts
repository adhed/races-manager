import { combineReducers, Reducer } from "redux";
import { all, fork } from "redux-saga/effects";
import { connectRouter, RouterState } from 'connected-react-router'


import { sportEventReducer } from "./sport-event/reducer";
import { SportEventState } from "./sport-event/types";
import sportEventSaga from "./sport-event/sagas";

export interface ApplicationState {
    sportEvent: SportEventState;
    router: RouterState;
};

export const createRootReducer = (history: any): Reducer<ApplicationState> => combineReducers<ApplicationState>({
    sportEvent: sportEventReducer,
    router: connectRouter(history),
});

export function* rootSaga() {
    yield all([fork(sportEventSaga)]);
}