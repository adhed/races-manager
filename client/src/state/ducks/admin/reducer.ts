import { Action } from "redux";
import { TypeConstant, PayloadAction } from 'typesafe-actions';
import { AdminActionTypes, AdminState } from "./types";

export const initialState: AdminState = {
    inactiveEvents: [],
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
		default:
			return state;
	}
};
