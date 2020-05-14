import { SportEvent } from "shared/models/sport-event";

export interface AdminState {
    readonly inactiveEvents: SportEvent[];
    readonly message: string;
}

export const AdminActionTypes = {
    FETCH_INACTIVE_EVENTS: '@@admin/FETCH_INACTIVE_EVENTS',
    FETCH_INACTIVE_EVENTS_SUCCESS: '@@admin/FETCH_INACTIVE_EVENTS_SUCCESS',
    FETCH_INACTIVE_EVENTS_FAILURE: '@@admin/FETCH_INACTIVE_EVENTS_FAILURE',

    SET_EVENT_ACTIVE: '@@admin/SET_EVENT_ACTIVE',
    SET_EVENT_ACTIVE_SUCCESS: '@@admin/SET_EVENT_ACTIVE_SUCCESS',
    SET_EVENT_ACTIVE_ERROR: '@@admin/SET_EVENT_ACTIVE_ERROR',

    HIDE_ADMIN_MESSAGE: '@@admin/HIDE_ADMIN_MESSAGE',
};
