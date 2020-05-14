import { SportEvent } from "shared/models/sport-event";

export interface AdminState {
    readonly inactiveEvents: SportEvent[];
}

export const AdminActionTypes = {
    FETCH_INACTIVE_EVENTS: '@@account/FETCH_INACTIVE_EVENTS',
    FETCH_INACTIVE_EVENTS_SUCCESS: '@@account/FETCH_INACTIVE_EVENTS_SUCCESS',
    FETCH_INACTIVE_EVENTS_FAILURE: '@@account/FETCH_INACTIVE_EVENTS_FAILURE',

    SET_EVENT_ACTIVE: '@@account/SET_EVENT_ACTIVE',
    SET_EVENT_ACTIVE_SUCCESS: '@@account/SET_EVENT_ACTIVE_SUCCESS',
    SET_EVENT_ACTIVE_ERROR: '@@account/SET_EVENT_ACTIVE_ERROR',
};
