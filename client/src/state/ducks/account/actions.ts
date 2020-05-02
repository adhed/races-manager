import { AccountActionTypes } from "./types";
import { action } from "typesafe-actions";
import { UserInfo } from "firebase";

export const signIn = (user: UserInfo | null) => action(AccountActionTypes.SIGN_IN, user);

export const setUser = (user: UserInfo) => action(AccountActionTypes.SET_USER, user);

export const signOut = () => action(AccountActionTypes.SIGN_OUT);

export const addEventToFavourites = (eventId: string) => action(AccountActionTypes.ADD_EVENT_TO_FAVOURITES, eventId );
export const addEventToFavouritesSuccess = () => action(AccountActionTypes.ADD_EVENT_TO_FAVOURITES_SUCCESS);
export const addEventToFavouritesError = (message: string) => action(AccountActionTypes.ADD_EVENT_TO_FAVOURITES_FAILURE, message);

export const removeEventFromFavourites = (eventId: string) => action(AccountActionTypes.REMOVE_EVENT_FROM_FAVOURITES, eventId );
export const removeEventFromFavouritesSuccess = () => action(AccountActionTypes.REMOVE_EVENT_FROM_FAVOURITES_SUCCESS);
export const removeEventFromFavouritesError = (message: string) => action(AccountActionTypes.REMOVE_EVENT_FROM_FAVOURITES_FAILURE, message);

export const getFavouriteEvents = (userId: string) => action(AccountActionTypes.GET_FAVOURITE_EVENTS, userId );
export const getFavouriteEventsSuccess = (data: string[]) => action(AccountActionTypes.GET_FAVOURITE_EVENTS_SUCCESS, data);
export const getFavouriteEventsError = (message: string) => action(AccountActionTypes.GET_FAVOURITE_EVENTS_FAILURE, message);