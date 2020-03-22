import { MapState, MapActionTypes } from "./types";
import { SportEvent } from "../../../shared/models/sport-event";
import { Action } from "redux";
import { TypeConstant, PayloadAction } from 'typesafe-actions';

export const initialState: MapState = {
	selectedEvent: null,
};

export const mapReducer = (
	state: MapState = initialState,
	action: Action<TypeConstant> & PayloadAction<TypeConstant, SportEvent>
): MapState => {
	switch (action.type) {
		case MapActionTypes.SELECT_EVENT: {
			return { ...state, selectedEvent: action.payload };
		}
		default:
			return state;
	}
};
