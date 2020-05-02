import { Action } from "redux";
import { TypeConstant, PayloadAction } from 'typesafe-actions';
import { AccountState, AccountActionTypes } from "./types";
import { UserInfo } from "firebase";

export const initialState: AccountState = {
    isLoggedIn: false,
    user: null,
    favouriteEvents: [],
};

export const accountReducer = (
	state: AccountState = initialState,
	action: Action<TypeConstant> & PayloadAction<TypeConstant, UserInfo> & PayloadAction<TypeConstant, boolean> & PayloadAction<TypeConstant, string[]>
): AccountState => {
	switch (action.type) {
        case AccountActionTypes.SET_USER:
        case AccountActionTypes.SIGN_IN:
            return {
                ...state,
                isLoggedIn: !!action.payload,
                user: action.payload
            };
        case AccountActionTypes.SIGN_OUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case AccountActionTypes.GET_FAVOURITE_EVENTS_FAILURE:
            return {
                ...state,
                favouriteEvents: []
            }
        case AccountActionTypes.GET_FAVOURITE_EVENTS_SUCCESS:
            return {
                ...state,
                favouriteEvents: action.payload
            }
		default:
			return state;
	}
};
