import { combineReducers, Reducer } from "redux";
import { all, fork } from "redux-saga/effects";
import { connectRouter, RouterState } from 'connected-react-router'


import { sportEventReducer } from "./sport-event/reducer";
import { SportEventState } from "./sport-event/types";
import sportEventSaga from "./sport-event/sagas";
import { mapReducer } from "./map/reducer";
import { MapState } from "./map/types";
import mapSaga from "./map/sagas";
import { accountReducer } from "./account/reducer";
import { AccountState } from "./account/types";
import accountSaga from "./account/sagas";
import adminSaga from "./admin/sagas";
import { adminReducer } from "./admin/reducer";
import { AdminState } from "./admin/types";

export interface ApplicationState {
    admin: AdminState;
    account: AccountState;
    map: MapState;
    sportEvent: SportEventState;
    router: RouterState;
};

export const createRootReducer = (history: any): Reducer<ApplicationState> => combineReducers<ApplicationState>({
    admin: adminReducer,
    account: accountReducer,
    map: mapReducer,
    sportEvent: sportEventReducer,
    router: connectRouter(history),
});

export function* rootSaga() {
    yield all([
        fork(accountSaga),
        fork(mapSaga),
        fork(sportEventSaga),
        fork(adminSaga),
    ]);
}