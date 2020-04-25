import { Action } from "redux";
import { TypeConstant, PayloadAction } from 'typesafe-actions';
import { AccountState, AccountActionTypes } from "./types";
import { UserInfo } from "firebase";

export const initialState: AccountState = {
    isLoggedIn: false,
    user: null,
};

export const accountReducer = (
	state: AccountState = initialState,
	action: Action<TypeConstant> & PayloadAction<TypeConstant, UserInfo> & PayloadAction<TypeConstant, boolean>
): AccountState => {
	switch (action.type) {
        case AccountActionTypes.SIGN_IN:
            return {
                ...state,
                isLoggedIn: !!action.payload,
                user: action.payload
            }
        case AccountActionTypes.SIGN_OUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            }
		default:
			return state;
	}
};
