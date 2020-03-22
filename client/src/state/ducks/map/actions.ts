import { action } from 'typesafe-actions';
import { MapActionTypes } from "./types";
import { SportEvent } from "../../../shared/models/sport-event";
import { MarkerCoordinates } from '../../../shared/models/map';

export const selectEvent = (selectedEvent: SportEvent | null) => action(MapActionTypes.SELECT_EVENT, selectedEvent);

export const setZoom = (zoom: number) => action(MapActionTypes.SET_ZOOM, zoom);

export const setMapPosition = (mapPosition: MarkerCoordinates) => action(MapActionTypes.SET_MAP_POSITIOM, mapPosition);