import { SportEventState, SportEventActionsTypes } from "./types";
import { SportEvent } from "../../../shared/models/sport-event";
import { Action } from "redux";
import { TypeConstant, PayloadAction } from 'typesafe-actions';

export const initialState: SportEventState = {
	data: [],
	errors: [],
	isLoading: false
};

export const sportEventReducer = (
	state: SportEventState = initialState,
	action: Action<TypeConstant> & PayloadAction<TypeConstant, SportEvent[]>
): SportEventState => {
	switch (action.type) {
		case SportEventActionsTypes.FETCH_EVENTS: {
			return { ...state, isLoading: true };
		}
		case SportEventActionsTypes.FETCH_EVENTS_SUCCESS: {
			return { ...initialState, data: action.payload };
		}
		case SportEventActionsTypes.FETCH_EVENTS_ERROR: {
			return {
				...state
			};
		}
		default:
			return state;
	}
};
