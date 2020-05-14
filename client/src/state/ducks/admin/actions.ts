import { AdminActionTypes } from "./types";
import { action } from "typesafe-actions";
import { SportEvent } from "shared/models/sport-event";

export const fetchInactiveEvents = () => action(AdminActionTypes.FETCH_INACTIVE_EVENTS);
export const fetchInactiveEventsSuccess = (events: SportEvent[]) => action(AdminActionTypes.FETCH_INACTIVE_EVENTS_SUCCESS, events);
export const fetchInactiveEventsError = (message: string) => action(AdminActionTypes.FETCH_INACTIVE_EVENTS_FAILURE, message);

export const setEventActive = (eventId: string) => action(AdminActionTypes.SET_EVENT_ACTIVE, eventId);
export const setEventActiveSuccess = () => action(AdminActionTypes.SET_EVENT_ACTIVE_SUCCESS);
export const setEventActiveError = (message: string) => action(AdminActionTypes.SET_EVENT_ACTIVE_ERROR, message);
