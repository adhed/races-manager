import { MapState, MapActionTypes } from "./types";
import { SportEvent } from "../../../shared/models/sport-event";
import { Action } from "redux";
import { TypeConstant, PayloadAction } from 'typesafe-actions';
import { JELENIA_COORDINATES, DEFAULT_ZOOM, SINGLE_MARKER_PREVIEW_ZOOM } from "../../../map/map-config";
import { MarkerCoordinates } from "../../../shared/models/map";

export const initialState: MapState = {
    selectedEvent: null,
    mapPosition: JELENIA_COORDINATES,
    zoom: DEFAULT_ZOOM
};

export const mapReducer = (
	state: MapState = initialState,
	action: Action<TypeConstant> & PayloadAction<TypeConstant, SportEvent> & PayloadAction<TypeConstant, MarkerCoordinates> & PayloadAction<TypeConstant, number>
): MapState => {
	switch (action.type) {
		case MapActionTypes.SELECT_EVENT: {
			return {
				...state,
				selectedEvent: action.payload,
				zoom: action.payload ? SINGLE_MARKER_PREVIEW_ZOOM : initialState.zoom,
				mapPosition: action.payload ? action.payload.coordinates : state.mapPosition,
			};
		}
        case MapActionTypes.SET_MAP_POSITIOM: {
			return { ...state, mapPosition: action.payload };
        }
        case MapActionTypes.SET_ZOOM: {
			return { ...state, zoom: action.payload };
		}
		default:
			return state;
	}
};
