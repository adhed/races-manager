import { SportEvent } from "../../../shared/models/sport-event";

export interface SportEventState {
    readonly data: SportEvent[];
    readonly isLoading: boolean;
    readonly errors: [];
}

export const SportEventActionsTypes = {
	FETCH_EVENTS: "@@sport-event/FETCH_EVENTS",
	FETCH_EVENTS_SUCCESS: "@@sport-event/FETCH_EVENTS_SUCCESS",
    FETCH_EVENTS_ERROR: "@@sport-event/FETCH_EVENTS_ERROR",
    REMOVE_EVENT: "@@sport-event/REMOVE_EVENT",
    REMOVE_EVENT_SUCCESS: "@@sport-event/REMOVE_EVENT_SUCCESS",
    REMOVE_EVENT_FAILURE: "@@sport-event/REMOVE_EVENT_FAILURE",
};
