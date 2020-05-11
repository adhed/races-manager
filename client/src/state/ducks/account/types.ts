import { UserInfo } from "firebase";

export interface AccountState {
    readonly isLoggedIn: boolean;
    readonly user: UserInfo | null;
    readonly favouriteEvents: string[];
    readonly details: AccountDetails;
}

export interface AccountDetails {
    readonly isAdmin: boolean;
}

export const AccountActionTypes = {
    ADD_EVENT_TO_FAVOURITES: '@@account/ADD_EVENT_TO_FAVOURITES',
    ADD_EVENT_TO_FAVOURITES_SUCCESS: '@@account/ADD_EVENT_TO_FAVOURITES_SUCCESS',
    ADD_EVENT_TO_FAVOURITES_FAILURE: '@@account/ADD_EVENT_TO_FAVOURITES_FAILURE',

    REMOVE_EVENT_FROM_FAVOURITES: '@@account/REMOVE_EVENT_FROM_FAVOURITES',
    REMOVE_EVENT_FROM_FAVOURITES_SUCCESS: '@@account/REMOVE_EVENT_FROM_FAVOURITES_SUCCESS',
    REMOVE_EVENT_FROM_FAVOURITES_FAILURE: '@@account/REMOVE_EVENT_FROM_FAVOURITES_FAILURE',

    GET_FAVOURITE_EVENTS: '@@account/GET_FAVOURITE_EVENTS',
    GET_FAVOURITE_EVENTS_SUCCESS: '@@account/GET_FAVOURITE_EVENTS_SUCCESS',
    GET_FAVOURITE_EVENTS_FAILURE: '@@account/GET_FAVOURITE_EVENTS_FAILURE',

    GET_ACCOUNT_DETAILS: '@@account/GET_ACCOUNT_DETAILS',
    GET_ACCOUNT_DETAILS_SUCCESS: '@@account/GET_ACCOUNT_DETAILS_SUCCESS',
    GET_ACCOUNT_DETAILS_FAILURE: '@@account/GET_ACCOUNT_DETAILS_FAILURE',

    SET_USER: '@@account/SET_USER',
    SIGN_IN: '@@account/SIGN_IN',
    SIGN_OUT: '@@account/SIGN_OUT',
};
