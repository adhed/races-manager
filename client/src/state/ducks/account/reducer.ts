import { Action } from "redux";
import { TypeConstant, PayloadAction } from 'typesafe-actions';
import { AccountState, AccountActionTypes, AccountDetails } from "./types";
import { UserInfo } from "firebase";

export const initialState: AccountState = {
    isLoggedIn: false,
    user: null,
    favouriteEvents: [],
    details: {
        isAdmin: false,
    },
};

export const accountReducer = (
	state: AccountState = initialState,
	action: Action<TypeConstant> & PayloadAction<TypeConstant, UserInfo> & PayloadAction<TypeConstant, boolean> & PayloadAction<TypeConstant, string[]> & PayloadAction<TypeConstant, AccountDetails>
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
        case AccountActionTypes.GET_ACCOUNT_DETAILS_SUCCESS: 
            return {
                ...state,
                details: action.payload,
            }
		default:
			return state;
	}
};
