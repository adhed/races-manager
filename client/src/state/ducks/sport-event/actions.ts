import { action } from 'typesafe-actions';
import { SportEventActionsTypes } from "./types";
import { SportEvent } from "../../../shared/models/sport-event";

export const fetchSportEvents = () => action(SportEventActionsTypes.FETCH_EVENTS);
export const fetchSportEventsSuccess = (data: SportEvent[]) => action(SportEventActionsTypes.FETCH_EVENTS_SUCCESS, data);
export const fetchSportEventsError = (message: string) => action(SportEventActionsTypes.FETCH_EVENTS_ERROR, message);

export const removeSportEvent = (id: string) => action(SportEventActionsTypes.REMOVE_EVENT, id);
export const removeSportEventSuccess = () => action(SportEventActionsTypes.REMOVE_EVENT_SUCCESS);
export const removeSportEventError = (message: string) => action(SportEventActionsTypes.REMOVE_EVENT_FAILURE, message);

export const selectEventById = (id: string) => action(SportEventActionsTypes.SELECT_EVENT_BY_ID, id);
export const selectEventByIdSuccess = (data: SportEvent) => action(SportEventActionsTypes.SELECT_EVENT_BY_ID_SUCCESS, data);
export const selectEventByIdError = (message: string) => action(SportEventActionsTypes.SELECT_EVENT_BY_ID_ERROR, message);

export const addEvent = (event: SportEvent) => action(SportEventActionsTypes.ADD_EVENT, event);
export const addEventSuccess = (data: SportEvent) => action(SportEventActionsTypes.ADD_EVENT_SUCCESS, data);
export const addEventError = (message: string) => action(SportEventActionsTypes.ADD_EVENT_ERROR, message);