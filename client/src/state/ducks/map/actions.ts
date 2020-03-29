import { action } from 'typesafe-actions';
import { MapActionTypes } from "./types";
import { SportEvent } from "../../../shared/models/sport-event";
import { MarkerCoordinates } from '../../../shared/models/map';

export const selectEvent = (selectedEvent: SportEvent | null) => action(MapActionTypes.SELECT_EVENT, selectedEvent);

export const editEvent = () => action(MapActionTypes.EDIT_EVENT);

export const saveEditedEvent = (selectedEvent: SportEvent | null) => action(MapActionTypes.SAVE_EDITED_EVENT, selectedEvent);
export const saveEditedEventSuccess = () => action(MapActionTypes.SAVE_EDITED_EVENT_SUCCESS);
export const saveEditedEventFailure = (error: string) => action(MapActionTypes.SAVE_EDITED_EVENT_ERROR, error);

export const setZoom = (zoom: number) => action(MapActionTypes.SET_ZOOM, zoom);

export const setMapPosition = (mapPosition: MarkerCoordinates) => action(MapActionTypes.SET_MAP_POSITIOM, mapPosition);

export const backToMap = () => action(MapActionTypes.BACK_TO_MAP);
export const backToAddEvent = () => action(MapActionTypes.BACK_TO_ADD_EVENT);

export const suggestionChange = (coords: MarkerCoordinates) => action(MapActionTypes.SUGGESTION_CHANGE, coords);