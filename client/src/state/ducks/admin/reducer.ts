import { Action } from "redux";
import { TypeConstant, PayloadAction } from 'typesafe-actions';
import { AdminActionTypes, AdminState } from "./types";

export const initialState: AdminState = {
    inactiveEvents: [],
    message: '',
};

export const adminReducer = (
	state: AdminState = initialState,
	action: Action<TypeConstant> & PayloadAction<TypeConstant, boolean> & PayloadAction<TypeConstant, string[]> & PayloadAction<TypeConstant, string>
): AdminState => {
	switch (action.type) {
        case AdminActionTypes.FETCH_INACTIVE_EVENTS_SUCCESS: 
            return {
                ...state,
                inactiveEvents: action.payload,
            }
            case AdminActionTypes.SET_EVENT_ACTIVE_SUCCESS: 
            return {
                ...state,
                message: 'Wydarzenie zaakceptowane',
            }
        case AdminActionTypes.SET_EVENT_ACTIVE_ERROR: 
            return {
                ...state,
                message: 'Wystąpił błąd',
            }
        case AdminActionTypes.HIDE_ADMIN_MESSAGE:
            return {
                ...state,
                message: '',
            }
		default:
			return state;
	}
};
